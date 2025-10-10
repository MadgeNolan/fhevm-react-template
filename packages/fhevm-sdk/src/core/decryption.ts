/**
 * Decryption utilities for FHEVM
 *
 * Provides functions for decrypting FHEVM encrypted values using EIP-712 signatures.
 */

import type { FhevmClient, DecryptionParams, DecryptedData } from './types';
import { ValidationError, DecryptionError } from '../utils/errors';
import { validateAddress } from '../utils/validation';

/**
 * Decrypt an encrypted value (userDecrypt flow)
 *
 * Uses EIP-712 signature to request decryption permission from the contract.
 *
 * @param client - FHEVM client
 * @param params - Decryption parameters
 * @returns Decrypted value
 *
 * @example
 * ```typescript
 * const decrypted = await decryptValue(client, {
 *   handle: encryptedHandle,
 *   contractAddress: '0x...',
 *   userAddress: '0x...'
 * });
 * ```
 */
export async function decryptValue(
  client: FhevmClient,
  params: DecryptionParams
): Promise<DecryptedData> {
  // Validate parameters
  if (!validateAddress(params.contractAddress)) {
    throw new ValidationError('Invalid contract address');
  }

  if (!validateAddress(params.userAddress)) {
    throw new ValidationError('Invalid user address');
  }

  if (!client.signer) {
    throw new DecryptionError('Signer required for decryption');
  }

  // In a real implementation, this would:
  // 1. Create EIP-712 signature
  // 2. Call contract's decrypt function
  // 3. Return decrypted value

  // Mock implementation
  const value = Number(params.handle);

  return {
    value,
    handle: params.handle,
    timestamp: Date.now()
  };
}

/**
 * Public decrypt (no signature required)
 *
 * For values that have been marked as publicly decryptable.
 *
 * @param client - FHEVM client
 * @param handle - Encrypted handle
 * @returns Decrypted value
 */
export async function publicDecrypt(
  client: FhevmClient,
  handle: bigint
): Promise<DecryptedData> {
  // Mock implementation
  return {
    value: Number(handle),
    handle,
    timestamp: Date.now()
  };
}

/**
 * Batch decrypt multiple values
 *
 * @param client - FHEVM client
 * @param params - Array of decryption parameters
 * @returns Array of decrypted values
 */
export async function decryptBatch(
  client: FhevmClient,
  params: DecryptionParams[]
): Promise<DecryptedData[]> {
  return Promise.all(params.map(p => decryptValue(client, p)));
}

/**
 * Check if a value can be decrypted by the current user
 *
 * @param client - FHEVM client
 * @param handle - Encrypted handle
 * @param userAddress - User address to check
 * @returns True if user has decryption permission
 */
export async function canDecrypt(
  client: FhevmClient,
  handle: bigint,
  userAddress: string
): Promise<boolean> {
  if (!validateAddress(userAddress)) {
    throw new ValidationError('Invalid user address');
  }

  // In real implementation, check on-chain permissions
  return true;
}
