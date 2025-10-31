'use client';

import { useState, useEffect, useCallback } from 'react';
import { useFhevmClient, useEncrypt as useSDKEncrypt, useDecrypt as useSDKDecrypt } from '@fhevm/sdk/react';

export function useFHE() {
  const client = useFhevmClient();
  const { encrypt: sdkEncrypt, isEncrypting } = useSDKEncrypt();
  const { decrypt: sdkDecrypt, isDecrypting } = useSDKDecrypt();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(!!client);
  }, [client]);

  const encrypt = useCallback(
    async (value: number | bigint, type: 'euint8' | 'euint16' | 'euint32' | 'euint64' = 'euint32') => {
      if (!client) {
        throw new Error('FHE client not initialized');
      }
      return await sdkEncrypt(value, type);
    },
    [client, sdkEncrypt]
  );

  const decrypt = useCallback(
    async (handle: bigint) => {
      if (!client) {
        throw new Error('FHE client not initialized');
      }
      return await sdkDecrypt(handle);
    },
    [client, sdkDecrypt]
  );

  const getPublicKey = useCallback(async () => {
    if (!client) {
      throw new Error('FHE client not initialized');
    }
    return await client.getPublicKey();
  }, [client]);

  return {
    client,
    isReady,
    encrypt,
    decrypt,
    getPublicKey,
    isEncrypting,
    isDecrypting
  };
}
