/**
 * Hook for decrypting values
 */

import { useState, useCallback } from 'react';
import { useFhevmContext } from './FhevmProvider';
import { decryptValue } from '../core/decryption';
import type { UseDecryptResult } from './types';

/**
 * Decrypt encrypted values
 *
 * @returns Decryption function and state
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { decrypt, isDecrypting } = useDecrypt();
 *
 *   const handleDecrypt = async (handle: bigint) => {
 *     const decrypted = await decrypt(handle);
 *     console.log('Decrypted:', decrypted);
 *   };
 *
 *   return <button onClick={() => handleDecrypt(123n)}>Decrypt</button>;
 * }
 * ```
 */
export function useDecrypt(): UseDecryptResult {
  const { client } = useFhevmContext();
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const decrypt = useCallback(
    async (handle: bigint) => {
      if (!client) {
        throw new Error('FHEVM client not initialized');
      }

      if (!client.signer) {
        throw new Error('Signer required for decryption');
      }

      setIsDecrypting(true);
      setError(null);

      try {
        const userAddress = await client.signer.getAddress();
        const result = await decryptValue(client, {
          handle,
          contractAddress: client.config.contractAddress,
          userAddress
        });
        return result;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsDecrypting(false);
      }
    },
    [client]
  );

  return { decrypt, isDecrypting, error };
}
