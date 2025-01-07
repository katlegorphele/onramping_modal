import { NextResponse } from "next/server";
import { sendTransferEmail } from "@/app/utils/sendMail";
import { networkConfig } from "@/app/config/networkConfig";
import rampABI from "@/blockchain/abis/uzarRamp.json";
import uzarABI from "@/blockchain/abis/uzarToken.json";
import { defineChain, getContract, prepareContractCall, readContract, sendTransaction } from "thirdweb";
import { thirdwebClient } from "@/app/config/client";
import { uzarContractABI, rampContractABI } from "@/blockchain/blockchainConstants";
const { uZarContractAddress, rampContractAddress, chainId } = networkConfig;



const transactionContract = getContract({
    client: thirdwebClient,
    chain: defineChain(chainId),
    address: rampContractAddress,

});

const uzarContract = getContract({
    client: thirdwebClient,
    chain: defineChain(chainId),
    address: uZarContractAddress,

});



export async function POST(req: Request) {



    try {
        // get Address to, Amount
        const { to, amount, email, account } = await req.json();

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

        // Generate transaction ID
        const transactionId = "txn_" + Math.random().toString(36).substr(2, 9);

        // check user abince
        const allowance = await readContract({
            contract: uzarContract,
            method:
                "function allowance(address owner, address spender) view returns (uint256)",
            params: [account.address, rampContractAddress],
        });
        console.log(allowance);
        console.log(account)

        if (allowance < amount) {
            const transaction = prepareContractCall({
                contract: uzarContract,
                method: "function approve(address,uint256)",
                params: [rampContractAddress, amount],
            });

            await sendTransaction({
                transaction,
                account,
            });
        }

        console.log("Allowance approved");



        // Send transaction email
        // if (email) {
        //     sendTransferEmail(email, amount,to);
        // }

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