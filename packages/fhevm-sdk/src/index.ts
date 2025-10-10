/**
 * Universal FHEVM SDK
 *
 * Framework-agnostic SDK for building confidential frontends with FHEVM.
 * Provides utilities for initialization, encryption, and decryption flows.
 */

export * from './core/client';
export * from './core/encryption';
export * from './core/decryption';
export * from './core/types';
export * from './utils/validation';
export * from './utils/errors';

// Re-export commonly used types from @fhevm/solidity
export type { euint32, euint64, euint8, ebool } from '@fhevm/solidity/lib/FHE';
