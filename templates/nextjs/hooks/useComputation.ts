'use client';

import { useState, useCallback } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';

export type ComputationOperation = 'add' | 'subtract' | 'multiply' | 'divide';

export interface ComputationState {
  result: any | null;
  error: string | null;
  isLoading: boolean;
}

export function useComputation() {
  const { encrypt } = useEncrypt();
  const [state, setState] = useState<ComputationState>({
    result: null,
    error: null,
    isLoading: false
  });

  const compute = useCallback(
    async (
      valueA: number | bigint,
      valueB: number | bigint,
      operation: ComputationOperation,
      type: 'euint8' | 'euint16' | 'euint32' | 'euint64' = 'euint32'
    ) => {
      setState({ result: null, error: null, isLoading: true });

      try {
        // Encrypt both values
        const encryptedA = await encrypt(valueA, type);
        const encryptedB = await encrypt(valueB, type);

        // Call computation API
        const response = await fetch('/api/fhe/compute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            operation,
            operands: [encryptedA.handle.toString(), encryptedB.handle.toString()]
          })
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error);
        }

        setState({ result: data.result, error: null, isLoading: false });
        return data.result;
      } catch (error: any) {
        setState({ result: null, error: error.message, isLoading: false });
        throw error;
      }
    },
    [encrypt]
  );

  const add = useCallback(
    async (a: number | bigint, b: number | bigint, type?: 'euint8' | 'euint16' | 'euint32' | 'euint64') => {
      return compute(a, b, 'add', type);
    },
    [compute]
  );

  const subtract = useCallback(
    async (a: number | bigint, b: number | bigint, type?: 'euint8' | 'euint16' | 'euint32' | 'euint64') => {
      return compute(a, b, 'subtract', type);
    },
    [compute]
  );

  const multiply = useCallback(
    async (a: number | bigint, b: number | bigint, type?: 'euint8' | 'euint16' | 'euint32' | 'euint64') => {
      return compute(a, b, 'multiply', type);
    },
    [compute]
  );

  const reset = useCallback(() => {
    setState({ result: null, error: null, isLoading: false });
  }, []);

  return {
    compute,
    add,
    subtract,
    multiply,
    reset,
    result: state.result,
    error: state.error,
    isLoading: state.isLoading
  };
}
