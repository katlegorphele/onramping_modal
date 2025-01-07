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

const SOUTH_AFRICAN_BANKS = [
  { id: 'FNB', name: 'First National Bank' },
  { id: 'ABSA', name: 'ABSA Bank' },
  { id: 'STD', name: 'Standard Bank' },
  { id: 'NED', name: 'Nedbank' },
  { id: 'CAP', name: 'Capitec Bank' },
  { id: 'INV', name: 'Investec' },
  { id: 'TYM', name: 'TymeBank' },
  { id: 'DSC', name: 'Discovery Bank' }
];

interface BankInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBankChange: (value: string) => void;
  selectedBank: string;
}

export function BankInput({
  label,
  value,
  onChange,
  onBankChange,
  selectedBank,
}: BankInputProps) {
  return (
    <div className="ring-1 ring-gray-100 flex justify-between items-center p-2 px-3 rounded-lg">
      <div className="flex flex-col justify-center pt-2">
        <Label>{label}</Label>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter account number"
          className="rounded-r-none font-bold"
        />
      </div>
      <Select onValueChange={onBankChange} defaultValue={selectedBank}>
        <SelectTrigger className="w-[180px] rounded-lg p-6 text-sm font-bold bg-gray-50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SOUTH_AFRICAN_BANKS.map((bank) => (
            <SelectItem key={bank.id} value={bank.id}>
              {bank.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}