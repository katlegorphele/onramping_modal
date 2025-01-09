import React from 'react';
import { Copy } from 'lucide-react';


const WalletCard = ({ 
  address = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  balance = '0.00',
  currency = 'UZAR',
  network = 'Ethereum',
}) => {
  
  const shortenAddress = (addr:string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
  };
  

  return (
    <div className="w-full max-w-md p-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg text-white">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-sm font-medium opacity-80">Connected Wallet</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-mono">{shortenAddress(address)}</span>
            <button 
              onClick={copyToClipboard}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm opacity-80">Balance</span>
          <span className="text-xl font-bold mt-1">{balance} {currency}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs opacity-80">Network</span>
          <span className="text-sm font-medium">{network}</span>
        </div>
        {/* <div className="h-6 w-6 rounded-full bg-green-400 flex items-center justify-center">
          <div onClick={disconnect} className="h-2 w-2 rounded-full bg-white"></div>
        </div> */}
        <button className="text-sm rounded-xl border border-spacing-2 p-2 hover:bg-red-500">Disconnect</button>
      </div>
    </div>
  );
};

export default WalletCard;