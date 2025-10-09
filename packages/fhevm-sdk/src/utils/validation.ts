/**
 * Validation utilities
 */

/**
 * Validate Ethereum address
 */
export function validateAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate chain ID
 */
export function validateChainId(chainId: number): boolean {
  return chainId > 0 && Number.isInteger(chainId);
}

/**
 * Validate transaction hash
 */
export function validateTxHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}

/**
 * Validate uint range
 */
export function validateUintRange(
  value: number | bigint,
  min: number | bigint,
  max: number | bigint
): boolean {
  const val = typeof value === 'bigint' ? value : BigInt(value);
  const minVal = typeof min === 'bigint' ? min : BigInt(min);
  const maxVal = typeof max === 'bigint' ? max : BigInt(max);

  return val >= minVal && val <= maxVal;
}
