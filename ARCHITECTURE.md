# FHEVM SDK Architecture

This document explains the architectural decisions and design patterns used in the FHEVM SDK.

## Overview

The FHEVM SDK is designed as a universal, framework-agnostic toolkit for building confidential dApps with Zama's FHEVM. It provides a clean separation between core functionality and framework-specific adapters.

## Design Principles

### 1. Framework Agnostic Core

The core SDK (`packages/fhevm-sdk/src/core/`) is completely independent of any framework:

```
core/
├── client.ts       # FHEVM client initialization
├── encryption.ts   # Encryption utilities
├── decryption.ts   # Decryption utilities
└── types.ts        # Type definitions
```

**Benefits:**
- Use in Node.js, React, Vue, or vanilla JS
- Tree-shakeable for optimal bundle size
- Easy to test
- Future-proof

### 2. Adapter Pattern for Frameworks

Framework-specific functionality is isolated in adapters:

```
react/
├── FhevmProvider.tsx    # Context provider
├── useFhevmClient.ts    # Client hook
├── useEncrypt.ts        # Encryption hook
├── useDecrypt.ts        # Decryption hook
└── useContract.ts       # Contract interaction hook
```

**Adding a new framework:**

```typescript
// vue/useFhevm.ts
export function useFhevm() {
  const client = inject('fhevmClient');
  // Vue-specific implementation
}
```

### 3. Wagmi-like API

Familiar patterns for web3 developers:

```tsx
// Similar to wagmi
import { FhevmProvider, useEncrypt } from '@fhevm/sdk/react';

<FhevmProvider config={...}>
  <App />
</FhevmProvider>

function Component() {
  const { encrypt } = useEncrypt();
}
```

### 4. Type Safety First

Full TypeScript support throughout:

```typescript
interface FhevmConfig {
  contractAddress: string;
  contractABI: any[];
  chainId: number;
  signer?: Signer;
  provider?: Provider;
}

interface EncryptionParams {
  value: number | bigint;
  type: 'euint8' | 'euint16' | 'euint32' | 'euint64';
}
```

## Core Modules

### Client Module (`core/client.ts`)

Handles FHEVM client initialization and management:

```typescript
export async function initFhevm(config: FhevmConfig): Promise<FhevmClient>
export function getContract(client: FhevmClient): Contract
export function getSigner(client: FhevmClient): Signer | undefined
export function getProvider(client: FhevmClient): Provider
export function isWriteReady(client: FhevmClient): boolean
```

**Responsibilities:**
- Validate configuration
- Create contract instance
- Manage provider/signer
- Provide client accessors

### Encryption Module (`core/encryption.ts`)

Handles data encryption before sending to contracts:

```typescript
export async function encryptValue(
  client: FhevmClient,
  params: EncryptionParams
): Promise<EncryptedData>

export async function encryptBatch(
  client: FhevmClient,
  values: EncryptionParams[]
): Promise<EncryptedData[]>

// Type-specific helpers
export async function encryptUint8(client, value): Promise<EncryptedData>
export async function encryptUint32(client, value): Promise<EncryptedData>
export async function encryptUint64(client, value): Promise<EncryptedData>
```

**Responsibilities:**
- Validate encryption parameters
- Encrypt values using FHEVM
- Return encrypted handles
- Provide type-specific helpers

### Decryption Module (`core/decryption.ts`)

Handles decryption with EIP-712 signatures:

```typescript
export async function decryptValue(
  client: FhevmClient,
  params: DecryptionParams
): Promise<DecryptedData>

export async function publicDecrypt(
  client: FhevmClient,
  handle: bigint
): Promise<DecryptedData>

export async function decryptBatch(
  client: FhevmClient,
  params: DecryptionParams[]
): Promise<DecryptedData[]>

export async function canDecrypt(
  client: FhevmClient,
  handle: bigint,
  userAddress: string
): Promise<boolean>
```

**Responsibilities:**
- Create EIP-712 signatures
- Request decryption from contract
- Handle public decryption
- Check decryption permissions

### Types Module (`core/types.ts`)

Comprehensive type definitions:

```typescript
// Configuration types
export interface FhevmConfig { ... }

// Operation types
export interface EncryptionParams { ... }
export interface DecryptionParams { ... }

// Result types
export interface EncryptedData { ... }
export interface DecryptedData { ... }
export interface TransactionResult { ... }

// Client type
export interface FhevmClient { ... }
```

## React Adapter

### Provider Pattern

```tsx
// FhevmProvider.tsx
export function FhevmProvider({ config, children }: FhevmProviderProps) {
  const [client, setClient] = useState<FhevmClient | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    initFhevm(config).then(setClient);
  }, [config]);

  return (
    <FhevmContext.Provider value={{ client, isReady, error }}>
      {children}
    </FhevmContext.Provider>
  );
}
```

### Hook Pattern

```typescript
// useEncrypt.ts
export function useEncrypt(): UseEncryptResult {
  const { client } = useFhevmContext();
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encrypt = useCallback(async (value, type) => {
    setIsEncrypting(true);
    try {
      return await encryptValue(client, { value, type });
    } finally {
      setIsEncrypting(false);
    }
  }, [client]);

  return { encrypt, isEncrypting, error };
}
```

## Data Flow

### Encryption Flow

```
User Input (42)
    ↓
useEncrypt() hook
    ↓
encryptValue(client, { value: 42, type: 'euint32' })
    ↓
FHEVM encryption
    ↓
Encrypted handle (0x123...)
    ↓
Contract call with handle
```

### Decryption Flow

```
Encrypted handle (0x123...)
    ↓
useDecrypt() hook
    ↓
Create EIP-712 signature
    ↓
decryptValue(client, { handle, ... })
    ↓
Contract decryption
    ↓
Decrypted value (42)
```

## Error Handling

Custom error types for better debugging:

```typescript
export class FhevmError extends Error { }
export class ValidationError extends FhevmError { }
export class EncryptionError extends FhevmError { }
export class DecryptionError extends FhevmError { }
export class TransactionError extends FhevmError { }
export class NetworkError extends FhevmError { }
```

Usage:

```typescript
if (!validateAddress(address)) {
  throw new ValidationError('Invalid contract address');
}

if (!client.signer) {
  throw new DecryptionError('Signer required for decryption');
}
```

## Validation Layer

Input validation utilities:

```typescript
export function validateAddress(address: string): boolean
export function validateChainId(chainId: number): boolean
export function validateTxHash(hash: string): boolean
export function validateUintRange(value, min, max): boolean
```

**Why:**
- Catch errors early
- Provide clear error messages
- Prevent invalid operations
- Improve developer experience

## Bundle Optimization

### Tree Shaking

Core and React exports are separate:

```typescript
// Core only (smaller bundle)
import { initFhevm, encryptValue } from '@fhevm/sdk';

// React hooks (includes React dependencies)
import { FhevmProvider, useEncrypt } from '@fhevm/sdk/react';
```

### Code Splitting

Each module can be imported independently:

```typescript
import { initFhevm } from '@fhevm/sdk/core/client';
import { encryptValue } from '@fhevm/sdk/core/encryption';
```

## Testing Strategy

### Unit Tests

Test each function in isolation:

```typescript
describe('encryptValue', () => {
  it('validates input parameters', async () => {
    await expect(
      encryptValue(client, { value: -1, type: 'euint8' })
    ).rejects.toThrow(ValidationError);
  });
});
```

### Integration Tests

Test complete workflows:

```typescript
describe('encryption workflow', () => {
  it('encrypts and uses in contract', async () => {
    const encrypted = await encryptValue(client, { value: 42, type: 'euint32' });
    const tx = await contract.submitData(encrypted.handle);
    await expect(tx.wait()).resolves.toBeDefined();
  });
});
```

## Future Enhancements

### Planned Features

1. **Vue Adapter**
   ```typescript
   // packages/fhevm-sdk/src/vue/
   export function useFhevm() { ... }
   ```

2. **Svelte Adapter**
   ```typescript
   // packages/fhevm-sdk/src/svelte/
   export const fhevmStore = writable(null);
   ```

3. **React Native Support**
   ```typescript
   // packages/fhevm-sdk/src/react-native/
   export function useFhevmNative() { ... }
   ```

4. **Advanced Caching**
   ```typescript
   // Cache encrypted values
   const cache = new Map<string, EncryptedData>();
   ```

5. **Batch Operations**
   ```typescript
   // Already implemented
   await encryptBatch(client, [
     { value: 1, type: 'euint32' },
     { value: 2, type: 'euint32' }
   ]);
   ```

## Performance Considerations

### Initialization

- Client initialization is async
- Provider handles initialization state
- Loading states exposed to UI

### Encryption

- Validation before encryption
- Type-specific optimizations
- Batch operations for multiple values

### Decryption

- Requires signer (throws early if missing)
- EIP-712 signature overhead
- Permission checks before decryption

## Security Considerations

### Input Validation

All inputs validated before processing:
- Address format
- Chain ID range
- Value ranges for types

### Access Control

- Signer required for write operations
- Permission checks for decryption
- Type-safe operations throughout

### Error Handling

- Never expose sensitive data in errors
- Clear error messages for debugging
- Proper error types for handling

## Conclusion

The FHEVM SDK architecture prioritizes:

1. **Flexibility** - Works with any framework
2. **Simplicity** - Easy to use API
3. **Type Safety** - Comprehensive TypeScript support
4. **Performance** - Optimized bundle sizes
5. **Extensibility** - Easy to add new features

This design enables developers to build confidential dApps quickly while maintaining code quality and security.
