import { CryptoExchangeCard } from '@/app/components/crypto-exchange-card'
import { ThirdwebProvider } from 'thirdweb/react'

export default function Home() {
  return (
    <ThirdwebProvider>
    <main className="flex flex-col md:flex-row justify-between items-center min-h-screen bg-white p-8">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-5xl font-bold mb-4">Buy uZar in a few steps</h1>
        <p className="text-xl text-gray-600">
          Bitcoin, Ethereum, Tether, Solana, and more popular crypto
        </p>
      </div>
      <div className="md:w-1/2">
        <CryptoExchangeCard />
      </div>
    </main>
    </ThirdwebProvider>
  )
}

