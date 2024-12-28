import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, currency, mpesaNumber } = await req.json();

    if (currency === "KES" && !mpesaNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "M-Pesa number is required for KES transactions.",
        },
        { status: 400 }
      );
    }

    // Simulated token purchase response
    const simulatedResponse = {
      success: true,
      message: `Successfully purchased ${amount} uZar using ${
        currency === "KES" ? `M-Pesa (${mpesaNumber})` : currency
      }.`,
      transactionId: "txn_123456",
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
