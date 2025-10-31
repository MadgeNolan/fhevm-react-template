'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { FhevmProvider as SDKFhevmProvider } from '@fhevm/sdk/react';
import { BrowserProvider } from 'ethers';

interface FHEContextType {
  isConnected: boolean;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const FHEContext = createContext<FHEContextType | undefined>(undefined);

export const useFHEContext = () => {
  const context = useContext(FHEContext);
  if (!context) {
    throw new Error('useFHEContext must be used within FHEProvider');
  }
  return context;
};

interface FHEProviderProps {
  children: React.ReactNode;
  contractAddress: string;
  contractABI: any[];
  chainId?: number;
}

export const FHEProvider: React.FC<FHEProviderProps> = ({
  children,
  contractAddress,
  contractABI,
  chainId = 11155111
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<any>(null);

  const connect = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const ethersSigner = await provider.getSigner();
        const userAddress = await ethersSigner.getAddress();

        setSigner(ethersSigner);
        setAddress(userAddress);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        throw error;
      }
    } else {
      throw new Error('Please install MetaMask!');
    }
  };

  const disconnect = () => {
    setSigner(null);
    setAddress(null);
    setIsConnected(false);
  };

  const config = signer ? {
    contractAddress,
    contractABI,
    chainId,
    signer
  } : undefined;

  return (
    <FHEContext.Provider value={{ isConnected, address, connect, disconnect }}>
      {config ? (
        <SDKFhevmProvider config={config}>
          {children}
        </SDKFhevmProvider>
      ) : (
        children
      )}
    </FHEContext.Provider>
  );
};
