/**
 * FHEVM Provider for React
 *
 * Context provider for FHEVM client, similar to wagmi's WagmiConfig.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { initFhevm } from '../core/client';
import type { FhevmClient } from '../core/types';
import type { FhevmProviderProps, FhevmContextValue } from './types';

const FhevmContext = createContext<FhevmContextValue | null>(null);

/**
 * FHEVM Provider component
 *
 * @example
 * ```tsx
 * <FhevmProvider config={{ contractAddress: '0x...', ... }}>
 *   <App />
 * </FhevmProvider>
 * ```
 */
export function FhevmProvider({ config, children }: FhevmProviderProps) {
  const [client, setClient] = useState<FhevmClient | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      try {
        const fhevmClient = await initFhevm(config);
        if (mounted) {
          setClient(fhevmClient);
          setIsReady(true);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      }
    }

    initialize();

    return () => {
      mounted = false;
    };
  }, [config]);

  const value: FhevmContextValue = {
    client,
    isReady,
    error
  };

  return <FhevmContext.Provider value={value}>{children}</FhevmContext.Provider>;
}

/**
 * Hook to access FHEVM context
 */
export function useFhevmContext(): FhevmContextValue {
  const context = useContext(FhevmContext);
  if (!context) {
    throw new Error('useFhevmContext must be used within FhevmProvider');
  }
  return context;
}
