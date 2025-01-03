import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

async function sendTransactionEmail(
  recipientEmail: string | undefined, 
  amount: number,
  currency: string,
  mpesaNumber?: string,
  bankAccount?: string,
  transactionId?: string
) {
  if (!recipientEmail) return;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: 'uZar Purchase Confirmation',
      text: `
Dear valued customer,

Your purchase of ${amount} uZar has been successful.
${currency === "KES" 
  ? `Payment method: M-Pesa (${mpesaNumber})`
  : `Payment method: Bank Transfer (${bankAccount})`
}

Transaction ID: ${transactionId}

Thank you for using our service!

Best regards,
The uZar Team
      `
    });
  } catch (error) {
    console.error('Failed to send email notification:', error);
  }
}

export async function POST(req: Request) {
  try {
    const { amount, currency, mpesaNumber, bankAccount, email } = await req.json();

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid amount.",
        },
        { status: 400 }
      );
    }

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

    // Generate transaction ID
    const transactionId = "txn_" + Math.random().toString(36).substr(2, 9);

    // Send email if provided
    if (email) {
      await sendTransactionEmail(
        email,
        amount,
        currency,
        mpesaNumber,
        bankAccount,
        transactionId
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: `Successfully purchased ${amount} uZar using ${
        currency === "KES" ? `M-Pesa (${mpesaNumber})` : `bank account (${bankAccount})`
      }.`,
      transactionId,
      amountReceived: amount,
    });

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
