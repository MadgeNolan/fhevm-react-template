/**
 * React-specific types
 */

import type { ReactNode } from 'react';
import type { FhevmConfig, FhevmClient } from '../core/types';

export interface FhevmProviderProps {
  config: FhevmConfig;
  children: ReactNode;
}

export interface FhevmContextValue {
  client: FhevmClient | null;
  isReady: boolean;
  error: Error | null;
}

export interface UseEncryptResult {
  encrypt: (value: number | bigint, type: 'euint8' | 'euint32' | 'euint64') => Promise<any>;
  isEncrypting: boolean;
  error: Error | null;
}

export interface UseDecryptResult {
  decrypt: (handle: bigint) => Promise<any>;
  isDecrypting: boolean;
  error: Error | null;
}
