import React from 'react'
import { thirdwebClient } from '../config/client';
import { defineChain } from 'thirdweb';
import { ConnectButton } from 'thirdweb/react';
import { networkConfig } from '../config/networkConfig';

const Login = () => {
  const {chainId} = networkConfig;


  
    return (
      <ConnectButton
          supportedTokens={{
            [1135]: [
              {
                address: "0xE29E8434FF23c4ab128AEA088eE4f434129F1Bf1",
                name: "Universel Zar",
                symbol: "uZAR",
                icon: "...",
              },
            ],
          }}
          client={thirdwebClient}
          accountAbstraction={{
            chain: defineChain(chainId),
            sponsorGas: true,
          }}
          connectModal={{
            size: "wide",
            showThirdwebBranding: false,
          }}
        />
    )
  };

export default Login