'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormContext } from 'react-hook-form'

type Step2Props = {
  mode: 'buy' | 'sell'
}

export function Step2({ mode }: Step2Props) {
  const { register, setValue, getValues } = useFormContext()
  const [selectedCountry, setSelectedCountry] = useState('South Africa') // Default country
  const [currency, setCurrency] = useState('USD') // Default currency
  const [exchangeRate, setExchangeRate] = useState(1) // Default rate (1:1)

  const countries = [
    { name: 'Kenya', currency: 'KES' },
    { name: 'South Africa', currency: 'ZAR' },
    // Add more countries as needed
  ]

  const fetchExchangeRate = async (currency: string) => {
    try {
      // Mock API call - replace with real API integration
      const response = await fetch(`/api/exchange-rate?currency=${currency}`)
      const data = await response.json()
      setExchangeRate(data.rate) // Assume API returns { rate: number }
    } catch (error) {
      console.error('Error fetching exchange rate:', error)
      setExchangeRate(1) // Fallback to 1:1
    }
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = countries.find((c) => c.name === e.target.value)
    if (selected) {
      setSelectedCountry(selected.name)
      setCurrency(selected.currency)
      fetchExchangeRate(selected.currency)
    }
  }

  const calculateTokenAmount = (amount: string) => {
    const numericAmount = parseFloat(amount)
    return isNaN(numericAmount) ? '' : (numericAmount * exchangeRate).toFixed(2)
  }

  useEffect(() => {
    setValue('tokenAmount', calculateTokenAmount(getValues('amount')))
  }, [exchangeRate, getValues('amount')])

  return (
    <div className="space-y-4">
      {/* Country Selection */}
      <div className="space-y-2">
        <Label htmlFor="country">Select Country</Label>
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          className="w-full p-2 border rounded"
        >
          {countries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <Label htmlFor="amount">Amount ({currency})</Label>
        <Input
          id="amount"
          placeholder="0.00"
          {...register('amount')}
          onChange={(e) => {
            setValue('amount', e.target.value)
            setValue('tokenAmount', calculateTokenAmount(e.target.value))
          }}
        />
      </div>

      {/* Token Amount Display */}
      <div className="space-y-2">
        <Label htmlFor="tokenAmount">You'll receive ({mode === 'buy' ? 'TOKEN' : currency})</Label>
        <Input
          id="tokenAmount"
          placeholder="0.00"
          value={calculateTokenAmount(getValues('amount'))}
          readOnly
        />
      </div>
    </div>
  )
}

