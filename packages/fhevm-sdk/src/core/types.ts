/**
 * Core types for FHEVM SDK
 */

import type { Contract, Signer, Provider } from 'ethers';

export interface FhevmConfig {
  /** Contract address for FHEVM operations */
  contractAddress: string;
  /** Contract ABI */
  contractABI: any[];
  /** Network chain ID (11155111 for Sepolia) */
  chainId: number;
  /** Optional signer for write operations */
  signer?: Signer;
  /** Optional provider for read operations */
  provider?: Provider;
}

export interface EncryptionParams {
  /** Value to encrypt */
  value: number | bigint;
  /** Type of encrypted value (euint8, euint32, euint64) */
  type: 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'euint128' | 'euint256';
}

export interface DecryptionParams {
  /** Encrypted handle to decrypt */
  handle: bigint;
  /** Contract address */
  contractAddress: string;
  /** User address requesting decryption */
  userAddress: string;
}

export interface FhevmClient {
  /** Contract instance */
  contract: Contract;
  /** Signer instance */
  signer?: Signer;
  /** Provider instance */
  provider: Provider;
  /** Configuration */
  config: FhevmConfig;
}

export interface EncryptedData {
  /** Encrypted handle */
  handle: bigint;
  /** Type of encryption */
  type: string;
  /** Timestamp of encryption */
  timestamp: number;
}

export interface DecryptedData {
  /** Decrypted value */
  value: bigint | number;
  /** Original handle */
  handle: bigint;
  /** Timestamp of decryption */
  timestamp: number;
}

export interface TransactionResult {
  /** Transaction hash */
  hash: string;
  /** Block number */
  blockNumber?: number;
  /** Gas used */
  gasUsed?: bigint;
  /** Success status */
  success: boolean;
}
