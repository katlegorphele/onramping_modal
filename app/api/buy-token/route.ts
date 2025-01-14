import { NextResponse } from "next/server";
import { sendPaymentTransactionEmail } from "@/app/utils/sendMail";

export async function POST(req: Request) {
  try {
    const {
      amount,
      currency,
      mpesaNumber,
      bankAccount,
      email,
      receiverAddress,
    } = await req.json();


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
      const url = `${process.env.NEXT_PUBLIC_KOTANI_BASE_URL_PROD}/onramp`;
      const options = {
        method: 'POST',
        headers: {accept: 'application/json', 'content-type': 'application/json'},
        body: JSON.stringify({
          bankCheckout: {paymentMethod: 'CARD', fullName: 'kl', phoneNumber: '+27681976458'},
          currency: 'ZAR',
          chain: 'LISK',
          token: 'USDT',
          fiatAmount: amount,
          receiverAddress: receiverAddress,
          referenceId: transactionId
        })
      };

      const KotaniPayResponse = await fetch(url, options)
      .then((res) => res.json())

      
      if (!KotaniPayResponse.success) {
        return NextResponse.json(
          {
            success: false,
            message: KotaniPayResponse.message,
          }
        );
      }
      
      const redirectUrl = KotaniPayResponse.data?.data?.redirectUrl;


      // Send email notification
      if (email) {
        await sendPaymentTransactionEmail(
          email,
          amount,
          currency,
          mpesaNumber,
          bankAccount,
          transactionId
        );
      }

      

      return NextResponse.json({
        success: true,
        message: `Successfully initiated purchase of ${amount} UZAR using ${
          currency === "KES"
            ? `M-Pesa (${mpesaNumber})`
            : `bank account (${bankAccount})`
        }.`,
        transactionId,
        // kotaniPayReference: kotaniPayResponse.data?.reference,
        amountReceived: amount,
        redirectUrl,
      });
    } catch (kotaniError) {
      console.error("KotaniPay API error:", kotaniError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to process payment. Please try again.",
          error:
            kotaniError instanceof Error
              ? kotaniError.message
              : "Unknown error",
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
