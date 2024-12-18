import { CryptoExchangeCard } from "@/app/components/crypto-exchange-card";
import { ThirdwebProvider } from "thirdweb/react";

export default function Home() {
  return (
    <ThirdwebProvider>
      <main className="flex flex-col p-2 justify-center gap-y-4   md:flex-row md:justify-between items-center min-h-screen max-w-7xl md:mx-auto bg-white">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-5xl font-bold mb-4">Buy uZar in a few steps</h1>
          <p className="text-xl text-gray-600">
            Exchange from USDT, USDC, Fiat, and more popular crypto
          </p>
        </div>
        <div className="md:w-1/2">
          <CryptoExchangeCard />
        </div>
      </main>
    </ThirdwebProvider>
  );
}
