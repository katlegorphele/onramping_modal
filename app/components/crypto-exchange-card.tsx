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
import { defineChain, getContract, readContract, toWei, } from "thirdweb";
import { networkConfig } from "../config/networkConfig";
import axios from "axios";
import { BankInput } from "./bank-input";
import { useActiveAccount } from "thirdweb/react";
import { thirdwebClient } from "../config/client";
import { prepareContractCall, sendTransaction, } from "thirdweb";


const { uZarContractAddress, rampContractAddress, chainId } = networkConfig;

const EXCHANGE_RATE_URL =
  "https://v6.exchangerate-api.com/v6/6c2c521a02e3eb57efa066fa/latest/ZAR";


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

interface ExchangeRates {
  KES: number;
  ZAR: number;
}

interface CryptoExchangeCardProps {
  onTabChange: (tab: string) => void;
}

const tabsTriggerData = [
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
  { value: "Transfer", label: "Transfer" },
];

export function CryptoExchangeCard( { onTabChange }: CryptoExchangeCardProps) {
  const [activeTab, setActiveTab] = useState<string>("buy");
  const [payAmount, setPayAmount] = useState<string>("");
  const [receiveAmount, setReceiveAmount] = useState<string>("");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({
    KES: 0,
    ZAR: 0,
  });
  const [currency, setCurrency] = useState<string>("ZAR");
  const [mpesaNumber, setMpesaNumber] = useState<string>("");
  const [bankAccount, setBankAccount] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [addressTo, setAddressTo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bankDetails, setBankDetails] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    bankCode: 2500,
    accountNumber: '',
    country: 'South Africa'
  });

  const account = useActiveAccount();

  const validateTransferInput = () => {
    if (!addressTo) {
      alert("Please provide a valid address.");
      return false;
    }

    if (!payAmount || Number(payAmount) <= 0) {
      alert("Please enter a valid amount.");
      return false;
    }

    if (!email) {
      alert("Please provide an email address for transaction updates.");
      return false;
    }

    return true;
  }

  const validateInput = () => {
    if (!payAmount || Number(payAmount) <= 0) {
      alert("Please enter a valid amount.");
      return false;
    }

    if (!email) {
      alert("Please provide an email address for transaction updates.");
      return false;
    }

    if (currency === "KES" && !mpesaNumber) {
      alert("Please provide an M-Pesa number.");
      return false;
    }

    if (currency === "ZAR" && !bankAccount) {
      alert("Please provide bank account details.");
      return false;
    }

    return true;
  };

  const resetTabs = () => {
    setPayAmount("");
    setReceiveAmount("");
    setCurrency("ZAR");
    setMpesaNumber("");
    setBankAccount("");
    setEmail("");
  }

  const handleTransfer = async () => {

    if (account) {
      console.log(account);
    }

    if (!validateTransferInput()) {
      return;
    }

    setIsLoading(true);

    try {
      // get token allowance
      const allowance = await readContract({
        contract: uzarContract,
        method:
          "function allowance(address owner, address spender) view returns (uint256)",
        params: [account?.address || "", rampContractAddress],
      });
      console.log(allowance);
      
     if (allowance < toWei(payAmount)) {
          console.log('Approving', payAmount)
          //approve uZAR
            const transaction = prepareContractCall({
              contract: uzarContract,
              method: "function approve(address,uint256)",
              params: [rampContractAddress, toWei(payAmount)],
            });
            if (account) {
              const { transactionHash } = await sendTransaction({
                transaction,
                account,
              });
              console.log('Approval confirmation', transactionHash)
            } else {
              throw new Error("Account is undefined");
            }
        
        }

        // random ref id
        const transactionId = "txn_" + Math.random().toString(36).substr(2, 9);

        console.log('Transferring', toWei(payAmount), 'to', addressTo, 'with ref', transactionId);


      // transfer token
        const transferTransaction = prepareContractCall({
        contract: transactionContract,
        method: "function OnOffRamp(address,uint256,string,string)",
        params: [addressTo, toWei(payAmount), transactionId, email],
      });

      if (account) {
        const {transactionHash} = await sendTransaction({
          transaction: transferTransaction,
          account,
        });
        console.log('Transfer Confirmation:', transactionHash);
        
        const response = await axios.post("/api/transfer-token", {
          amount: Number(payAmount),
          to: addressTo,
          email: email,
          txHash: transactionHash,
        });
  
        if (response.data.success) {
          alert(response.data.message);
        }
      } else {
        throw new Error("Account is undefined");
      }

      // const response = await axios.post("/api/transfer-token", {
      //   amount: Number(payAmount),
      //   to: addressTo,
      //   email: email,
      // });
      resetTabs();


    } catch (error: unknown) {
      console.error("Error transferring token:", error);
      const errorMessage = (error as { response?: { message?: string } })?.response?.message ||
        "Failed to process transaction. Please try again later.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  const handleBuy = async () => {

    if (!validateInput()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/buy-token", {
        amount: Number(payAmount),
        currency,
        mpesaNumber: currency === "KES" ? mpesaNumber : undefined,
        bankAccount: currency === "ZAR" ? bankAccount : undefined,
        email: email,
        receiverAddress: account?.address,
      });

      if (response.data?.success && response.data?.redirectUrl) {
        window.location.href = response.data?.redirectUrl; // Redirect user to the payment URL
      } else {
        console.error('Payment initiation failed:', response.data?.message);
      }
    } catch (error) {
      console.error("Error buying token:", error);
      alert(
        "Failed to process transaction. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSell = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/sell-token", {
        amount: Number(payAmount),
        email: email || undefined,
        bankDetails: {
          ...bankDetails,
          bankCode: parseInt(bankDetails.bankCode.toString()),
        },
        currency: 'ZAR',
        referenceId: 'txn_' + Math.random().toString(36).substr(2, 9)
      });
  
      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error selling token:", error);
      alert("Failed to sell token. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange(value);
    // Reset amounts when switching tabs
    setPayAmount("");
    setReceiveAmount("");
    setCurrency("ZAR");
    setMpesaNumber("");
  };

  const handleCurrencyChanged = (value: string) => {
    setCurrency(value);
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
    setReceiveAmount(calculateExchangeAmount(value, { selectedCurrency: currency }));

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
        <TabsContent value="Transfer">
          <div className="space-y-4">

            <div>
              <label
                htmlFor="addressTo"
                className="text-sm text-gray-500 mx-3 font-semibold"
              >
                Address To
              </label>
              <input
                id="addressTo"
                type="text"
                onChange={(e) => setAddressTo(e.target.value)}
                className="ring-1 ring-gray-100 w-full flex justify-between items-center p-2 px-3 rounded-lg"
                placeholder="Enter address to transfer to"
              />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="text-sm text-gray-500 mx-3 font-semibold"
              >
                Amount to transfer
              </label>
              <input
                id="amount"
                type="text"
                onChange={(e) => setPayAmount(e.target.value)}
                className="ring-1 ring-gray-100 w-full flex justify-between items-center p-2 px-3 rounded-lg"
                placeholder="0.00"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-sm text-gray-500 mx-3 font-semibold"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ring-1 ring-gray-100 w-full flex justify-between items-center p-2 px-3 rounded-lg"
                placeholder="Enter your email for transaction updates"
              />
            </div>
            <Button onClick={handleTransfer} className="w-full text-xl p-8 font-semibold">
              {isLoading ? "Processing..." : "Transfer"}
            </Button>
          </div>

        </TabsContent>

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

            <div>
              <label
                htmlFor="email"
                className="text-sm text-gray-500 mx-3 font-semibold"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ring-1 ring-gray-100 w-full flex justify-between items-center p-2 px-3 rounded-lg"
                placeholder="Enter your email for transaction updates"
              />
            </div>
            {currency === "KES" && (
              <div>
                <label htmlFor="mpesa-number" className="text-sm text-gray-500 mx-3 font-semibold">
                  M-Pesa Number
                </label>
                <input
                  id="mpesa-number"
                  type="text"
                  value={mpesaNumber}
                  onChange={(e) => setMpesaNumber(e.target.value)}
                  className="ring-1 ring-gray-100 flex justify-between items-center p-2 px-3 rounded-lg"
                  placeholder="Enter your M-Pesa number"
                />
              </div>
            )}
            {currency === "ZAR" && (
              <div>
                <BankInput
                  label="Enter Bank Details"
                  value={bankAccount}
                  onChange={setBankAccount}
                  onBankChange={(bank) => console.log(bank)}
                  selectedBank={bankAccount} />
              </div>
            )}
            {/* <p className="text-sm text-gray-500">1-5000 ZAR</p> */}
            <CurrencyInput
              label="You'll receive"
              value={receiveAmount}
              onChange={setReceiveAmount}
              currency="uZar"
              onCurrencyChange={handleCurrencyChanged}
            />
            <p className="text-sm text-gray-500 mx-3">1 uZar = 1 ZAR</p>

            {/* <LoginButton /> */}
            <Button onClick={handleBuy} className="w-full text-xl p-8 font-semibold">
            {isLoading ? "Processing..." : "Buy"}
            </Button>
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

    <div>
      <label htmlFor="name" className="text-sm text-gray-500 mx-3 font-semibold">
        Full Name
      </label>
      <input
        id="name"
        type="text"
        onChange={(e) => setBankDetails(prev => ({ ...prev, name: e.target.value }))}
        className="ring-1 ring-gray-100 w-full flex justify-between items-center p-2 px-3 rounded-lg"
        placeholder="Enter your full name"
      />
    </div>

    <div>
      <label htmlFor="address" className="text-sm text-gray-500 mx-3 font-semibold">
        Address
      </label>
      <input
        id="address"
        type="text"
        onChange={(e) => setBankDetails(prev => ({ ...prev, address: e.target.value }))}
        className="ring-1 ring-gray-100 w-full flex justify-between items-center p-2 px-3 rounded-lg"
        placeholder="Enter your address"
      />
    </div>

    <div>
      <label htmlFor="phone" className="text-sm text-gray-500 mx-3 font-semibold">
        Phone Number
      </label>
      <input
        id="phone"
        type="tel"
        onChange={(e) => setBankDetails(prev => ({ ...prev, phoneNumber: e.target.value }))}
        className="ring-1 ring-gray-100 w-full flex justify-between items-center p-2 px-3 rounded-lg"
        placeholder="+27 Phone Number"
      />
    </div>

    <div>
      <label htmlFor="bankCode" className="text-sm text-gray-500 mx-3 font-semibold">
        Bank Code
      </label>
      <input
        id="bankCode"
        type="text"
        onChange={(e) => setBankDetails(prev => ({ ...prev, bankCode: parseInt(e.target.value) || 0 }))}
        className="ring-1 ring-gray-100 w-full flex justify-between items-center p-2 px-3 rounded-lg"
        placeholder="Enter bank code"
      />
    </div>

    <div>
      <label htmlFor="accountNumber" className="text-sm text-gray-500 mx-3 font-semibold">
        Account Number
      </label>
      <input
        id="accountNumber"
        type="text"
        onChange={(e) => setBankDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
        className="ring-1 ring-gray-100 w-full flex justify-between items-center p-2 px-3 rounded-lg"
        placeholder="Enter account number"
      />
    </div>

    <Button onClick={handleSell} className="w-full text-xl p-8 font-semibold">
      {isLoading ? "Processing..." : "Sell"}
    </Button>
  </div>
</TabsContent>
      </Tabs>
    </div>
  );
}



export default CryptoExchangeCard;
