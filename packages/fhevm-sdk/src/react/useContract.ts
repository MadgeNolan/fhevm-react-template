/**
 * Hook for interacting with FHEVM contracts
 */

import { useCallback } from 'react';
import { useFhevmContext } from './FhevmProvider';
import type { Contract } from 'ethers';

/**
 * Access contract instance and call methods
 *
 * @returns Contract interaction utilities
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { contract, call, send } = useContract();
 *
 *   const getData = async () => {
 *     const result = await call('getData', [1]);
 *     return result;
 *   };
 *
 *   const submitData = async () => {
 *     const tx = await send('submitData', [encryptedValue]);
 *     await tx.wait();
 *   };
 * }
 * ```
 */
export function useContract() {
  const { client } = useFhevmContext();

  const call = useCallback(
    async (method: string, args: any[] = []) => {
      if (!client) {
        throw new Error('FHEVM client not initialized');
      }

      return client.contract[method](...args);
    },
    [client]
  );

  const send = useCallback(
    async (method: string, args: any[] = []) => {
      if (!client) {
        throw new Error('FHEVM client not initialized');
      }

      if (!client.signer) {
        throw new Error('Signer required for write operations');
      }

      return client.contract[method](...args);
    },
    [client]
  );

  return {
    contract: client?.contract as Contract | undefined,
    call,
    send
  };
}
