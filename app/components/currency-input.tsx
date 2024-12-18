"use client";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currency: string;
}

export function CurrencyInput({
  label,
  value,
  onChange,
  currency,
}: CurrencyInputProps) {
  return (
    <div className=" ring-1 ring-gray-100 flex justify-between items-center p-2 px-3 rounded-lg">
      <div className="flex flex-col justify-center pt-2">
        <Label>{label}</Label>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-r-none font-bold"
        />
      </div>
      <Select defaultValue={currency}>
        <SelectTrigger className="w-[110px] rounded-lg p-6 text-md font-bold bg-gray-50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={currency}>{currency}</SelectItem>
          {currency === "ZAR" ? (
            <SelectItem value="KES">KES</SelectItem>
          ) : (
            <></>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
