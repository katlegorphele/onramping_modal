"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/ui/tabs";
import { CurrencyInput } from "./currency-input";
import { Button } from "@/app/components/ui/button";
import { useConnectModal } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";
import { thirdwebClient } from "../config/client";

import { defineChain } from "thirdweb";
import { networkConfig } from "../config/networkConfig";
const {chainId, rpc} = networkConfig

const chain  = defineChain({id: chainId, rpc})

const tabsTriggerData = [
  {
    value: "buy",
    label: "Buy",
  },
  {
    value: "sell",
    label: "Sell",
  },
];

export function CryptoExchangeCard() {
  const [activeTab, setActiveTab] = useState("buy");
  const [payAmount, setPayAmount] = useState("100.80");
  const [receiveAmount, setReceiveAmount] = useState("100.80");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 mb-6 h-min">
          {tabsTriggerData.map((item) => {
            return (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="py-4 text-lg font-semibold"
              >
                {item.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* buy tab */}
        <TabsContent value="buy">
          <div className="space-y-4">
            <CurrencyInput
              label="You'll pay"
              value={payAmount}
              onChange={setPayAmount}
              currency="ZAR"
            />
            <p className="text-sm text-gray-500">460-379,260 ZAR</p>
            <CurrencyInput
              label="You'll receive"
              value={receiveAmount}
              onChange={setReceiveAmount}
              currency="uZar"
            />
            <p className="text-sm text-gray-500">1 uZar = 18.3932 ZAR</p>

            {/* login button */}
            <LoginButton />
          </div>
        </TabsContent>

        {/* sell tab */}
        <TabsContent value="sell">
          <div className="space-y-4">
            <CurrencyInput
              label="You'll sell"
              value={receiveAmount}
              onChange={setReceiveAmount}
              currency="uZar"
            />
            <p className="text-sm text-gray-500">1-10,000 uZar</p>
            <CurrencyInput
              label="You'll receive"
              value={payAmount}
              onChange={setPayAmount}
              currency="ZAR"
            />
            <p className="text-sm text-gray-500">1 uZar = 18.3932 ZAR</p>

            {/* login button */}
            <LoginButton />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const LoginButton = () => {

  const onConnect = async ()=> {
  const {connect} = useConnectModal();
    const wallet = await connect({ client: thirdwebClient, accountAbstraction: {
    chain,
    sponsorGas: true,
  }});
  console.log("connected to : ", wallet)}
  return <Button 
  onClick={onConnect}
  className="w-full text-xl p-8 font-semibold">Log in</Button>;
};
