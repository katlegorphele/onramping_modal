import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

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
    const simulatedResponse = {
      success: true,
      message: `Successfully sold ${amount} uZar.`,
      transactionId: "txn_789012",
      payoutAmount: amount, // Assume 1 uZar = 1 unit of the local currency (ZAR/USD/KES)
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
