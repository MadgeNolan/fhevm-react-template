import { Signer } from 'ethers';

export type EncryptionType = 'euint8' | 'euint16' | 'euint32' | 'euint64';

export interface EncryptionParams {
  value: number | bigint;
  type: EncryptionType;
}

export interface EncryptionResult {
  handle: bigint;
  type: EncryptionType;
}

export interface DecryptionParams {
  handle: bigint;
  contractAddress: string;
  userAddress: string;
}

export interface DecryptionResult {
  value: number | bigint;
}

export interface FHEVMConfig {
  contractAddress: string;
  contractABI: any[];
  chainId: number;
  signer?: Signer;
  provider?: any;
}

export interface FHEVMClient {
  encrypt: (params: EncryptionParams) => Promise<EncryptionResult>;
  decrypt: (params: DecryptionParams) => Promise<DecryptionResult>;
  getPublicKey: () => Promise<Buffer>;
  refreshKeys?: () => Promise<void>;
}

export interface BatchEncryptionParams {
  values: Array<{ value: number | bigint; type: EncryptionType }>;
}

export interface BatchEncryptionResult {
  results: EncryptionResult[];
}

export interface BatchDecryptionParams {
  handles: bigint[];
  contractAddress: string;
  userAddress: string;
}

export interface BatchDecryptionResult {
  values: Array<number | bigint>;
}
