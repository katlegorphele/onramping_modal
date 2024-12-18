'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface CurrencyInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  currency: string
}

export function CurrencyInput({ label, value, onChange, currency }: CurrencyInputProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-r-none"
        />
        <Select defaultValue={currency}>
          <SelectTrigger className="w-[80px] rounded-l-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={currency}>{currency}</SelectItem>
            {currency === 'ZAR' ? (
              <SelectItem value="USD">USD</SelectItem>
            ) : (
              <SelectItem value="BTC">BTC</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

