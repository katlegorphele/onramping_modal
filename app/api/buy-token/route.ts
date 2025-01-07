import { NextResponse } from "next/server";
import kotaniPay from '@api/kotani-pay';
import {sendPaymentTransactionEmail} from "@/app/utils/sendMail";


export async function POST(req: Request) {
  try {
    const { amount, currency, mpesaNumber, bankAccount, email, receiverAddress } = await req.json();
    console.log('Vars:', amount, currency, mpesaNumber, bankAccount, email);  

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

    try {
      const transactionPayload =  {
        paymentMethod: "CARD" as "CARD" | "PAYBYBANK",
        currency: currency as "KES" |"ZAR" ,
        fullName: 'Katlego R Phele',
        phoneNumber: '+27681976458',
        referenceId: '5f9b2c7b9c9d6b0017b4e6b1',
        amount: amount,
        walletId: process.env.NEXT_PUBLIC_KOTANI_WALLET_ID,
      }


      const apiKey = process.env.NEXT_PUBLIC_KOTANI_API_KEY;
      if (!apiKey) {
        throw new Error("Kotani API key is not defined");
      }
      kotaniPay.auth(apiKey);
      // console.log('Payload:', transactionPayload);
      // generate random txn reference
      const ref_id = Math.random().toString(36).substr(2, 9);
      const kotaniPayResponse = await kotaniPay.onrampController_onramp({
        bankCheckout: {paymentMethod: 'CARD', fullName: 'KAT', phoneNumber: '+27681976458'},
        currency: 'ZAR',
        chain: 'LISK',
        token: 'CUSD',
        fiatAmount: 11,
        receiverAddress,
        referenceId: ref_id,
      })
      console.log('KotaniPay Response:', kotaniPayResponse);

      const redirectUrl = kotaniPayResponse.data?.data?.redirectUrl;

      // Send email notification
      if (email) {
        await sendPaymentTransactionEmail(
          email,
          amount,
          currency,
          mpesaNumber,
          bankAccount,
          transactionId,
          kotaniPayResponse.data?.reference as string | undefined
        );
      }

      return NextResponse.json({
        success: true,
        message: `Successfully initiated purchase of ${amount} UZAR using ${currency === "KES" ? `M-Pesa (${mpesaNumber})` : `bank account (${bankAccount})`
          }.`,
        transactionId,
        kotaniPayReference: kotaniPayResponse.data?.reference,
        amountReceived: amount,
        redirectUrl,
      });

    } catch (kotaniError) {
      console.error("KotaniPay API error:", kotaniError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to process payment. Please try again.",
          error: (kotaniError as any).message
        },
        { status: 500 }
      );
    }

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