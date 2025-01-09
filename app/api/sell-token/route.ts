import { NextResponse } from "next/server";
import kotaniPay from '@api/kotani-pay';
import { sendWithdrawalTransactionEmail } from "@/app/utils/sendMail";


export async function POST(req: Request) {
  try {
    const { amount, currency, mpesaNumber, bankAccount, email } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid amount. Please provide a valid amount to sell.",
        },
        { status: 400 }
      );
    }

    // Simulated token sale response
    const transactionId = "txn_" + Math.random().toString(36).substr(2, 9);
    const apiKey = process.env.NEXT_PUBLIC_KOTANI_API_KEY;
    if (!apiKey) {
      throw new Error("Kotani API key is not defined");
    }
    kotaniPay.auth(apiKey);
    // generate random reference id
    const refID = Math.random().toString(36).substr(2, 9);

    const kotaniPayResponse = await kotaniPay.withdrawTransactionController_mobileMoney({
      bankDetails: {
        name: 'Kat',
        address: 'adress',
        phoneNumber: '+2765555',
        bankCode: 2500,
        accountNumber: '123456789',
        country: 'South Africa'
      },
      currency: 'ZAR',
      amount: 10,
      referenceId: refID,
    })
    console.log('KotaniPay Response:', kotaniPayResponse);

    const redirectUrl = kotaniPayResponse.res.url;
    console.log('Redirect URL:', redirectUrl);
    
    if (email) {
      await sendWithdrawalTransactionEmail(
        email,
        amount,
        undefined,
        undefined,
        undefined,
        transactionId
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully sold  ${amount} UZAR using ${currency === "KES" ? `M-Pesa (${mpesaNumber})` : `bank account (${bankAccount})`
        }.`,
      transactionId,
      kotaniPayReference: kotaniPayResponse.data?.reference,
      amountReceived: amount,
      redirectUrl,
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
