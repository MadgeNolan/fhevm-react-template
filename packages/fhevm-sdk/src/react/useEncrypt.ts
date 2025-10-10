/**
 * Hook for encrypting values
 */

import { useState, useCallback } from 'react';
import { useFhevmContext } from './FhevmProvider';
import { encryptValue } from '../core/encryption';
import type { UseEncryptResult } from './types';

/**
 * Encrypt values with FHEVM
 *
 * @returns Encryption function and state
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { encrypt, isEncrypting } = useEncrypt();
 *
 *   const handleEncrypt = async () => {
 *     const encrypted = await encrypt(42, 'euint32');
 *     console.log('Encrypted:', encrypted);
 *   };
 *
 *   return (
 *     <button onClick={handleEncrypt} disabled={isEncrypting}>
 *       Encrypt
 *     </button>
 *   );
 * }
 * ```
 */
export function useEncrypt(): UseEncryptResult {
  const { client } = useFhevmContext();
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encrypt = useCallback(
    async (value: number | bigint, type: 'euint8' | 'euint32' | 'euint64') => {
      if (!client) {
        throw new Error('FHEVM client not initialized');
      }

      setIsEncrypting(true);
      setError(null);

      try {
        const result = await encryptValue(client, { value, type });
        return result;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsEncrypting(false);
      }
    },
    [client]
  );

  return { encrypt, isEncrypting, error };
}
