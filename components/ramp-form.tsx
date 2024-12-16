'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Step, Mode, FormData } from '../types/ramp'
import { Wallet, Mail, ArrowRight, ArrowLeft, DollarSign } from 'lucide-react'
import { WalletConnect } from './wallet-connect'
import { Step2 } from './step2'

const formSchema = z.object({
  mode: z.enum(['buy', 'sell']),
  walletAddress: z.string().min(1, 'Wallet address is required'),
  amount: z.string().min(1, 'Amount is required'),
  tokenAmount: z.string().min(1, 'Token amount is required'),
  email: z.string().email('Invalid email address'),
  otp: z.string().min(6, 'OTP must be 6 digits'),
})

const STEPS: Step[] = ['wallet', 'amount', 'verify', 'otp', 'transfer']

export function RampForm() {
  const [currentStep, setCurrentStep] = useState<Step>('wallet')
  const [mode, setMode] = useState<Mode>('buy')

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mode: 'buy',
      walletAddress: '',
      amount: '',
      tokenAmount: '',
      email: '',
      otp: '',
    },
  })

  const nextStep = () => {
    const currentIndex = STEPS.indexOf(currentStep)
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1])
    }
  }

  const prevStep = () => {
    const currentIndex = STEPS.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1])
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'wallet':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="walletAddress">Wallet Address</Label>
              <WalletConnect onAddressChange={(address) => form.setValue('walletAddress', address)} />
            </div>
          </div>
        )
      case 'amount':
        return <Step2 mode={mode} /> // Use Step2 here
      case 'verify':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...form.register('email')}
              />
            </div>
          </div>
        )
      case 'otp':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                placeholder="Enter 6-digit code"
                maxLength={6}
                {...form.register('otp')}
              />
            </div>
          </div>
        )
      case 'transfer':
        return (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-lg font-medium">Confirm Transfer</p>
              <p className="text-sm text-muted-foreground">
                You are about to {mode} {form.getValues('amount')} {mode === 'buy' ? 'USD' : 'TOKEN'}
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <FormProvider {...form}> {/* Wrap everything in FormProvider */}
      <Card className="w-full max-w-md mx-auto bg-white shadow-xl">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span className="text-gray-900">{mode === 'buy' ? 'Buy' : 'Sell'} Tokens</span>
            <div className="flex gap-2">
              <Button
                variant={mode === 'buy' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMode('buy')}
                className={mode === 'buy' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-blue-600 border-blue-600 hover:bg-blue-50'}
              >
                Buy
              </Button>
              <Button
                variant={mode === 'sell' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMode('sell')}
                className={mode === 'sell' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-blue-600 border-blue-600 hover:bg-blue-50'}
              >
                Sell
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-8">
            {STEPS.map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${
                  index < STEPS.indexOf(currentStep)
                    ? 'text-blue-600'
                    : index === STEPS.indexOf(currentStep)
                    ? 'text-blue-600'
                    : 'text-gray-400'
                }`}
              >
                <div className="flex flex-col items-center">
                  {step === 'wallet' && <Wallet className="h-4 w-4" />}
                  {step === 'amount' && <DollarSign className="h-4 w-4" />}
                  {step === 'verify' && <Mail className="h-4 w-4" />}
                  {step === 'otp' && <Mail className="h-4 w-4" />}
                  {step === 'transfer' && <ArrowRight className="h-4 w-4" />}
                  <span className="text-xs mt-1">{step}</span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-[2px] w-8 mx-2 ${
                      index < STEPS.indexOf(currentStep) ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <form className="text-gray-900">{renderStep()}</form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 'wallet'}
            className="text-blue-600 border-blue-600 hover:bg-blue-50 disabled:opacity-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button
            onClick={nextStep}
            disabled={currentStep === 'transfer'}
            className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {currentStep === 'transfer' ? 'Confirm' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </FormProvider> // Close FormProvider here
  )
}

