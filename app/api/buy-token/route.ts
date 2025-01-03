import { NextResponse } from "next/server"
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NEXT_PUBLIC_BURNER_USERNAME,
    pass: process.env.NEXT_PUBLIC_BURNER_PASSWORD
  }
});

// Helper function to send an email
async function sendTransactionEmail(
  recipientEmail: string | undefined, 
  transactionType: 'purchase' | 'sale',
  amount: number,
  currency?: string,
  mpesaNumber?: string,
  bankAccount?: string,
  transactionId?: string
) {
  // If no email provided, silently return
  if (!recipientEmail) return;

  const subject = `uZar ${transactionType} Confirmation`;
  
  let text = `Dear valued customer,\n\n`;
  if (transactionType === 'purchase') {
    text += `Your purchase of ${amount} uZar has been successful.\n`;
    if (currency === "KES") {
      text += `Payment method: M-Pesa (${mpesaNumber})\n`;
    } else {
      text += `Payment method: Bank Transfer (Account: ${bankAccount})\n`;
    }
  } else {
    text += `Your sale of ${amount} uZar has been successful.\n`;
  }
  
  text += `\nTransaction ID: ${transactionId}\n`;
  text += `\nThank you for using our service!\n`;
  text += `\nBest regards,\nThe uZar Team`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject,
      text
    });
  } catch (error) {
    // Log the error but don't fail the transaction
    console.error('Failed to send email notification:', error);
  }
}


export async function POST(req: Request) {
  try {
    const { amount, currency, mpesaNumber, bankAccount, email } = await req.json();

    if (currency === "KES" && !mpesaNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "M-Pesa number is required for KES transactions.",
        },
        { status: 400 }
      );
    }

    if (currency === "ZAR" && !bankAccount) {
      return NextResponse.json(
        {
          success: false,
          message: "Bank account number is required for ZAR transactions.",
        },
        { status: 400 }
      );
    }

    // Simulated token purchase response
    const transactionId = "txn_" + Math.random().toString(36).substr(2, 9);
    const simulatedResponse = {
      success: true,
      message: `Successfully purchased ${amount} uZar using ${
        currency === "KES" ? `M-Pesa (${mpesaNumber})` : `bank account (${bankAccount})`
      }.`,
      transactionId: transactionId,
      amountReceived: amount, // 1 ZAR = 1 uZar
    };

    return NextResponse.json(simulatedResponse);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}