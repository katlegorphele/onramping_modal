"use client";

import { useEffect, useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/ui/tabs";
import { CurrencyInput } from "./currency-input";
import { Button } from "@/app/components/ui/button";
import { useActiveAccount, useConnectModal } from "thirdweb/react";
import { defineChain } from "thirdweb";
import { networkConfig } from "../config/networkConfig";
import axios from "axios";
import { thirdwebClient } from "../config/client";

const { chainId, rpc } = networkConfig;

const EXCHANGE_RATE_URL =
  "https://v6.exchangerate-api.com/v6/6c2c521a02e3eb57efa066fa/latest/ZAR";

const chain = defineChain({ id: chainId, rpc });

interface ExchangeRates {
  KES: number;
  ZAR: number;
}

const tabsTriggerData = [
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
];

export function CryptoExchangeCard() {
  const [activeTab, setActiveTab] = useState<string>("buy");
  const [payAmount, setPayAmount] = useState<string>("");
  const [receiveAmount, setReceiveAmount] = useState<string>("");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({
    KES: 0,
    ZAR: 0,
  });
  const [currency, setCurrency] = useState<string>("ZAR");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Reset amounts when switching tabs
    setPayAmount("");
    setReceiveAmount("");
    setCurrency("ZAR");
  };

  const handleCurrencyChanged = (value: string) => {
    console.log("Received Currency : ", value);
    setCurrency(value);
    console.log("Set current : ", currency);
    const calculatedReceiveAmount = calculateExchangeAmount(payAmount, {
      selectedCurrency: value,
    });
    setReceiveAmount(calculatedReceiveAmount);
  };

  const calculateExchangeAmount = (
    amount: string,
    { selectedCurrency }: { selectedCurrency: string }
  ) => {
    const numAmount = parseFloat(amount);

    if (
      isNaN(numAmount) ||
      exchangeRates.KES === 0 ||
      exchangeRates.ZAR === 0
    ) {
      return "0";
    }

    let convertedAmount: number;

    if (activeTab === "buy") {
      // ZAR to uZar (or KES)

      console.log("KES : ", exchangeRates.KES);
      console.log("ZAR : ", exchangeRates.ZAR);

      convertedAmount =
        selectedCurrency == "KES"
          ? numAmount / exchangeRates.KES
          : numAmount / exchangeRates.ZAR;
    } else {
      // uZar to ZAR
      convertedAmount =
        selectedCurrency == "KES"
          ? numAmount * exchangeRates.KES
          : numAmount * exchangeRates.ZAR;
    }

    console.log("Converted : ", convertedAmount.toFixed(2));

    return convertedAmount.toFixed(2);
  };

  const handlePayAmountChange = (value: string) => {
    setPayAmount(value);

    try {
      const calculatedReceiveAmount = calculateExchangeAmount(value, {
        selectedCurrency: currency,
      });
      setReceiveAmount(calculatedReceiveAmount);
    } catch (error) {
      console.error("Error calculating exchange amount:", error);
      setReceiveAmount("0");
    }
  };

  useEffect(() => {
    const getExchangeRates = async () => {
      try {
        const response = await axios.get(EXCHANGE_RATE_URL);
        const rates = response.data["conversion_rates"];
        setExchangeRates({ KES: rates["KES"], ZAR: rates["ZAR"] });
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
        // Set a default or previous rate in case of failure
        setExchangeRates({ KES: 0, ZAR: 0 });
      }
    };

    getExchangeRates();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 mb-6 h-min">
          {tabsTriggerData.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="py-4 text-lg font-semibold"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* buy tab */}
        <TabsContent value="buy">
          <div className="space-y-4">
            <CurrencyInput
              label="You'll pay"
              value={payAmount}
              onChange={handlePayAmountChange}
              currency="ZAR"
              onCurrencyChange={handleCurrencyChanged}
            />
            <p className="text-sm text-gray-500">460-379,260 ZAR</p>
            <CurrencyInput
              label="You'll receive"
              value={receiveAmount}
              onChange={setReceiveAmount}
              currency="uZar"
              onCurrencyChange={handleCurrencyChanged}
            />
            <p className="text-sm text-gray-500">1 uZar = 18.3932 ZAR</p>

            <LoginButton />
          </div>
        </TabsContent>

        {/* sell tab */}
        <TabsContent value="sell">
          <div className="space-y-4">
            <CurrencyInput
              label="You'll sell"
              value={payAmount}
              onChange={handlePayAmountChange}
              currency="uZar"
              onCurrencyChange={handleCurrencyChanged}
            />
            <p className="text-sm text-gray-500">1-10,000 uZar</p>
            <CurrencyInput
              label="You'll receive"
              value={receiveAmount}
              onChange={setReceiveAmount}
              currency="ZAR"
              onCurrencyChange={handleCurrencyChanged}
            />
            <p className="text-sm text-gray-500">1 uZar = 18.3932 ZAR</p>

            <LoginButton />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const LoginButton = () => {
  const { connect } = useConnectModal();
  const account = useActiveAccount();

  const onConnect = async () => {
    try {
      const wallet = await connect({
        client: thirdwebClient,
        accountAbstraction: {
          chain,
          sponsorGas: true,
        },
      });
      console.log("connected to : ", wallet);
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  return (
    <Button
      onClick={account ? onConnect : () => {}}
      className="w-full text-xl p-8 font-semibold"
    >
      {account ? "Log in" : "Buy"}
    </Button>
  );
};

export default CryptoExchangeCard;
