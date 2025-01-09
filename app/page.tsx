'use client'

import { CryptoExchangeCard } from "@/app/components/crypto-exchange-card";
import { useEffect, useState } from 'react';

import Login from "./components/Login";
import { useActiveAccount } from "thirdweb/react";
import WalletCard from "./components/WalletInfo";
import { defineChain, getContract, readContract, toEther } from "thirdweb";
import { thirdwebClient } from "./config/client";
import { networkConfig } from "./config/networkConfig";

const { chainId, uZarContractAddress } = networkConfig;




export default function Home() {

  const account = useActiveAccount();
  const [selectedTab, setSelectedTab] = useState("buy");
  const [balance, setBalance] = useState(0);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };
  
  const uzarContract = getContract({
    client: thirdwebClient,
    chain: defineChain(chainId),
    address: uZarContractAddress,
  
  });

  const userBalance = async () => {
    if (!account) {
      throw new Error("Account is undefined");
    }
    const balance = await readContract({
      contract: uzarContract,
      method: "function balanceOf(address) returns (uint256)",
      params: [account.address],
    });
    return balance;
  }

  useEffect(() => {
    if (account) {
      userBalance().then((balance) => {

        setBalance(Number(toEther(balance)));
      });
    }

  } )


  

  function UpperCase(tabState: string) {
    if (tabState == 'buy') return 'Buy'
    if (tabState == 'sell') return 'Sell'
    if (tabState == 'Transfer') return 'Transfer'
    }
  
  return (
    
      <main className="flex flex-col p-2 justify-center gap-y-4   md:flex-row md:justify-between items-center min-h-screen max-w-7xl md:mx-auto bg-white">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-5xl font-bold mb-4">{UpperCase(selectedTab)} UZAR in a few steps</h1>
          <p className="text-xl text-gray-600 mb-14">
            Exchange from USDT, USDC, Fiat, and more popular crypto
          </p>
          
          {account && 
          <>
          <p className="text-xl text-gray-600">
            Connected Account
          </p>
          <WalletCard 
          address={account.address}
          balance={balance.toString()}
          />
          </>}
        </div>
        <div className="md:w-1/2">
        {account ? (
          <>
            <CryptoExchangeCard onTabChange={handleTabChange} />
          </>
        ) : (
          <Login />
        )}
        </div>
      </main>

  );
}
