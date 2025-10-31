export type EncryptionType = 'euint8' | 'euint16' | 'euint32' | 'euint64';

export interface EncryptedValue {
  handle: bigint;
  type: EncryptionType;
}

export interface DecryptedValue {
  value: number | bigint;
}

export interface FHEOperation {
  type: 'encrypt' | 'decrypt' | 'compute';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
}

export interface ComputationResult {
  handle: string;
  operation: string;
}

export interface KeyInfo {
  publicKey: string;
  address?: string;
}
