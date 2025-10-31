import { validateAddress, validateEncryptionType, validateNumericValue } from './security';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateEncryptionRequest(value: any, type: string): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, error: 'Value is required' };
  }

  if (!validateEncryptionType(type)) {
    return { isValid: false, error: 'Invalid encryption type' };
  }

  if (!validateNumericValue(value, type)) {
    return { isValid: false, error: `Value out of range for ${type}` };
  }

  return { isValid: true };
}

export function validateDecryptionRequest(handle: any, contractAddress: string, userAddress: string): ValidationResult {
  if (!handle) {
    return { isValid: false, error: 'Handle is required' };
  }

  if (!validateAddress(contractAddress)) {
    return { isValid: false, error: 'Invalid contract address' };
  }

  if (!validateAddress(userAddress)) {
    return { isValid: false, error: 'Invalid user address' };
  }

  return { isValid: true };
}

export function validateConfig(config: any): ValidationResult {
  if (!config.contractAddress) {
    return { isValid: false, error: 'Contract address is required' };
  }

  if (!validateAddress(config.contractAddress)) {
    return { isValid: false, error: 'Invalid contract address format' };
  }

  if (!config.contractABI || !Array.isArray(config.contractABI)) {
    return { isValid: false, error: 'Contract ABI must be an array' };
  }

  if (!config.chainId || typeof config.chainId !== 'number') {
    return { isValid: false, error: 'Valid chain ID is required' };
  }

  return { isValid: true };
}

export function formatError(error: any): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error?.message) {
    return error.message;
  }

  return 'An unknown error occurred';
}
