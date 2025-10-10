/**
 * Custom error types for FHEVM SDK
 */

export class FhevmError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FhevmError';
  }
}

export class ValidationError extends FhevmError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class EncryptionError extends FhevmError {
  constructor(message: string) {
    super(message);
    this.name = 'EncryptionError';
  }
}

export class DecryptionError extends FhevmError {
  constructor(message: string) {
    super(message);
    this.name = 'DecryptionError';
  }
}

export class TransactionError extends FhevmError {
  constructor(message: string) {
    super(message);
    this.name = 'TransactionError';
  }
}

export class NetworkError extends FhevmError {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}
