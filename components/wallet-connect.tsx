'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>
      on: (event: string, callback: (accounts: string[]) => void) => void
    }
  }
}

export function WalletConnect({ onAddressChange }: { onAddressChange: (address: string) => void }) {
  const [address, setAddress] = useState('')

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        if (accounts.length > 0) {
          setAddress(accounts[0])
          onAddressChange(accounts[0])
        } else {
          console.error('No accounts found')
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    } else {
      console.error('Ethereum object not found, do you have MetaMask installed?')
    }
  }

  // Check for an already-connected wallet on component mount
  useEffect(() => {
    const checkConnectedWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' })
          if (accounts.length > 0) {
            setAddress(accounts[0])
            onAddressChange(accounts[0])
          }
        } catch (error) {
          console.error('Error checking connected wallet:', error)
        }
      }
    }

    checkConnectedWallet()
  }, [onAddressChange])

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        setAddress(accounts[0] || '')
        onAddressChange(accounts[0] || '')
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)

      // Cleanup listener on unmount
      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [onAddressChange])

  if (address) {
    return (
      <Input
        value={address}
        readOnly
        className="font-mono text-sm"
      />
    )
  }

  return (
    <Button onClick={connectWallet} type="button" className="w-full">
      Connect Wallet
    </Button>
  )
}

