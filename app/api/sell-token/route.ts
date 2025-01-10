import { NextResponse } from "next/server";
import { sendWithdrawalTransactionEmail } from "@/app/utils/sendMail";

export async function POST(req: Request) {
  try {
    const {
      amount,
      email,
      bankDetails
    } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid amount. Please provide a valid amount to sell.",
        },
        { status: 400 }
      );
    }

    const transactionId = "txn_" + Math.random().toString(36).substr(2, 9);
    
    try {
      const url = `${process.env.NEXT_PUBLIC_KOTANI_BASE_URL_PROD}withdraw/v2/bank`;
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization:
            `Bearer ${process.env.NEXT_PUBLIC_KOTANI_API_KEY}`,
        },
        body: JSON.stringify({
          bankDetails: {
            name: bankDetails.name,
            address: bankDetails.address,
            phoneNumber: bankDetails.phoneNumber,
            bankCode: bankDetails.bankCode,
            accountNumber: bankDetails.accountNumber,
            country: bankDetails.country,
          },
          currency: "ZAR",
          amount: amount,
          referenceId: transactionId,
        }),
      };
      
      const kotaniPayResponse = await fetch(url, options)
      .then((res) => res.json());

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
        // message: `Successfully sold  ${amount} UZAR using ${
        //   currency === "KES"
        //     ? `M-Pesa (${mpesaNumber})`
        //     : `bank account (${bankAccount})`
        // }.`,
        message: kotaniPayResponse.message,
        transactionId,
        kotaniPayReference: kotaniPayResponse.data?.reference,
        amountReceived: amount,
      });
    } catch (kotaniError) {
      console.error("KotaniPay API error:", kotaniError);
      return NextResponse.json(
        {
          success: false,
          message: "An error occurred. Please try again.",
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
