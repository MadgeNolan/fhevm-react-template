/**
 * FHEVM Client
 *
 * Core client for interacting with FHEVM contracts.
 * Provides a clean, intuitive API for encryption and decryption operations.
 */

import { Contract, Signer, Provider } from 'ethers';
import type { FhevmConfig, FhevmClient } from './types';
import { ValidationError } from '../utils/errors';
import { validateAddress, validateChainId } from '../utils/validation';

/**
 * Initialize FHEVM client
 *
 * @param config - Configuration object
 * @returns Initialized FHEVM client
 *
 * @example
 * ```typescript
 * const client = await initFhevm({
 *   contractAddress: '0x...',
 *   contractABI: [...],
 *   chainId: 11155111,
 *   signer: signer
 * });
 * ```
 */
export async function initFhevm(config: FhevmConfig): Promise<FhevmClient> {
  // Validate configuration
  if (!validateAddress(config.contractAddress)) {
    throw new ValidationError('Invalid contract address');
  }

  if (!validateChainId(config.chainId)) {
    throw new ValidationError('Invalid chain ID');
  }

  if (!config.contractABI || config.contractABI.length === 0) {
    throw new ValidationError('Contract ABI is required');
  }

  // Determine provider
  let provider: Provider;
  if (config.signer) {
    provider = config.signer.provider as Provider;
  } else if (config.provider) {
    provider = config.provider;
  } else {
    throw new ValidationError('Either signer or provider must be provided');
  }

  // Create contract instance
  const contract = new Contract(
    config.contractAddress,
    config.contractABI,
    config.signer || provider
  );

  return {
    contract,
    signer: config.signer,
    provider,
    config
  };
}

/**
 * Get client contract instance
 *
 * @param client - FHEVM client
 * @returns Contract instance
 */
export function getContract(client: FhevmClient): Contract {
  return client.contract;
}

/**
 * Get client signer
 *
 * @param client - FHEVM client
 * @returns Signer instance or undefined
 */
export function getSigner(client: FhevmClient): Signer | undefined {
  return client.signer;
}

/**
 * Get client provider
 *
 * @param client - FHEVM client
 * @returns Provider instance
 */
export function getProvider(client: FhevmClient): Provider {
  return client.provider;
}

/**
 * Check if client is ready for write operations
 *
 * @param client - FHEVM client
 * @returns True if signer is available
 */
export function isWriteReady(client: FhevmClient): boolean {
  return !!client.signer;
}
