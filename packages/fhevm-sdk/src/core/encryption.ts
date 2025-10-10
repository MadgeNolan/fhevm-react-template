/**
 * Encryption utilities for FHEVM
 *
 * Provides high-level functions for encrypting data before sending to contracts.
 */

import type { FhevmClient, EncryptionParams, EncryptedData } from './types';
import { ValidationError } from '../utils/errors';

/**
 * Encrypt a value for FHEVM contract
 *
 * @param client - FHEVM client
 * @param params - Encryption parameters
 * @returns Encrypted data object
 *
 * @example
 * ```typescript
 * const encrypted = await encryptValue(client, {
 *   value: 12345,
 *   type: 'euint32'
 * });
 * ```
 */
export async function encryptValue(
  client: FhevmClient,
  params: EncryptionParams
): Promise<EncryptedData> {
  // Validate parameters
  validateEncryptionParams(params);

  // In a real implementation, this would use FHEVM's encryption library
  // For now, we return a mock structure
  const handle = BigInt(params.value);

  return {
    handle,
    type: params.type,
    timestamp: Date.now()
  };
}

/**
 * Encrypt multiple values at once
 *
 * @param client - FHEVM client
 * @param values - Array of encryption parameters
 * @returns Array of encrypted data objects
 */
export async function encryptBatch(
  client: FhevmClient,
  values: EncryptionParams[]
): Promise<EncryptedData[]> {
  return Promise.all(values.map(params => encryptValue(client, params)));
}

/**
 * Helper to encrypt euint8 (0-255)
 */
export async function encryptUint8(
  client: FhevmClient,
  value: number
): Promise<EncryptedData> {
  if (value < 0 || value > 255) {
    throw new ValidationError('euint8 value must be between 0 and 255');
  }
  return encryptValue(client, { value, type: 'euint8' });
}

/**
 * Helper to encrypt euint32
 */
export async function encryptUint32(
  client: FhevmClient,
  value: number
): Promise<EncryptedData> {
  if (value < 0 || value > 4294967295) {
    throw new ValidationError('euint32 value must be between 0 and 2^32-1');
  }
  return encryptValue(client, { value, type: 'euint32' });
}

/**
 * Helper to encrypt euint64
 */
export async function encryptUint64(
  client: FhevmClient,
  value: number | bigint
): Promise<EncryptedData> {
  return encryptValue(client, { value, type: 'euint64' });
}

/**
 * Validate encryption parameters
 */
function validateEncryptionParams(params: EncryptionParams): void {
  if (params.value === undefined || params.value === null) {
    throw new ValidationError('Value is required');
  }

  const validTypes = ['euint8', 'euint16', 'euint32', 'euint64', 'euint128', 'euint256'];
  if (!validTypes.includes(params.type)) {
    throw new ValidationError(`Invalid type. Must be one of: ${validTypes.join(', ')}`);
  }

  // Type-specific validation
  const numValue = typeof params.value === 'bigint' ? Number(params.value) : params.value;

  if (params.type === 'euint8' && (numValue < 0 || numValue > 255)) {
    throw new ValidationError('euint8 must be between 0 and 255');
  }

  if (params.type === 'euint32' && (numValue < 0 || numValue > 4294967295)) {
    throw new ValidationError('euint32 must be between 0 and 2^32-1');
  }
}
