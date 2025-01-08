import { NextResponse } from "next/server";
import { sendTransferEmail } from "@/app/utils/sendMail";



export async function POST(req: Request) {



    try {
        // get Address to, Amount
        const { to, amount, email, txHash } = await req.json();

        // Validate required fields
        if (!to) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please provide a valid address.",
                },
                { status: 400 }
            );
        }

        if (!amount || amount <= 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please provide a valid amount.",
                },
                { status: 400 }
            );
        }

       
        // Send transaction email
         if (email) {
             sendTransferEmail(email, amount,to, txHash);
         }

        return NextResponse.json(
            {
                success: true,
                message: "Transaction initiated successfully.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Failed to initiate transaction:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to initiate transaction.",
            },
            { status: 500 }
        );
    }
}
