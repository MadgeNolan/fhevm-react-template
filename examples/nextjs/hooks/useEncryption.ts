'use client';

import { useState, useCallback } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';

export interface EncryptionState {
  result: any | null;
  error: string | null;
  isLoading: boolean;
}

export function useEncryption() {
  const { encrypt: sdkEncrypt, isEncrypting } = useEncrypt();
  const [state, setState] = useState<EncryptionState>({
    result: null,
    error: null,
    isLoading: false
  });

  const encryptValue = useCallback(
    async (value: number | bigint, type: 'euint8' | 'euint16' | 'euint32' | 'euint64' = 'euint32') => {
      setState({ result: null, error: null, isLoading: true });

      try {
        const result = await sdkEncrypt(value, type);
        setState({ result, error: null, isLoading: false });
        return result;
      } catch (error: any) {
        setState({ result: null, error: error.message, isLoading: false });
        throw error;
      }
    },
    [sdkEncrypt]
  );

  const encryptBatch = useCallback(
    async (values: Array<{ value: number | bigint; type: 'euint8' | 'euint16' | 'euint32' | 'euint64' }>) => {
      setState({ result: null, error: null, isLoading: true });

      try {
        const results = await Promise.all(
          values.map(({ value, type }) => sdkEncrypt(value, type))
        );
        setState({ result: results, error: null, isLoading: false });
        return results;
      } catch (error: any) {
        setState({ result: null, error: error.message, isLoading: false });
        throw error;
      }
    },
    [sdkEncrypt]
  );

  const reset = useCallback(() => {
    setState({ result: null, error: null, isLoading: false });
  }, []);

  return {
    encryptValue,
    encryptBatch,
    reset,
    result: state.result,
    error: state.error,
    isLoading: state.isLoading || isEncrypting
  };
}
