export type Step = 'wallet' | 'amount' | 'verify' | 'otp' | 'transfer'
export type Mode = 'buy' | 'sell'

export interface FormData {
  mode: Mode
  walletAddress: string
  amount: string
  tokenAmount: string
  email: string
  otp: string
}


