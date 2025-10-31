# FHEVM SDK API Reference

## Core Functions

### initFhevm(config)

Initialize the FHEVM client.

**Parameters:**
- `config.contractAddress` (string): The smart contract address
- `config.contractABI` (array): Contract ABI
- `config.chainId` (number): Network chain ID
- `config.signer` (Signer): Ethers.js signer instance

**Returns:** Promise<FHEVMClient>

**Example:**
```typescript
const client = await initFhevm({
  contractAddress: '0x...',
  contractABI: [...],
  chainId: 11155111,
  signer: signer
});
```

### encryptValue(client, params)

Encrypt a value for use in FHE contracts.

**Parameters:**
- `client` (FHEVMClient): Initialized FHEVM client
- `params.value` (number | bigint): Value to encrypt
- `params.type` (EncryptionType): Type of encryption ('euint8' | 'euint16' | 'euint32' | 'euint64')

**Returns:** Promise<EncryptionResult>

**Example:**
```typescript
const encrypted = await encryptValue(client, {
  value: 42,
  type: 'euint32'
});
```

### decryptValue(client, params)

Decrypt an encrypted value.

**Parameters:**
- `client` (FHEVMClient): Initialized FHEVM client
- `params.handle` (bigint): Encrypted value handle
- `params.contractAddress` (string): Contract address
- `params.userAddress` (string): User's address

**Returns:** Promise<DecryptionResult>

**Example:**
```typescript
const decrypted = await decryptValue(client, {
  handle: encryptedHandle,
  contractAddress: '0x...',
  userAddress: await signer.getAddress()
});
```

### encryptBatch(client, values)

Encrypt multiple values at once.

**Parameters:**
- `client` (FHEVMClient): Initialized FHEVM client
- `values` (Array): Array of {value, type} objects

**Returns:** Promise<EncryptionResult[]>

**Example:**
```typescript
const results = await encryptBatch(client, [
  { value: 10, type: 'euint8' },
  { value: 1000, type: 'euint32' }
]);
```

### decryptBatch(client, params)

Decrypt multiple values at once.

**Parameters:**
- `client` (FHEVMClient): Initialized FHEVM client
- `params.handles` (bigint[]): Array of encrypted handles
- `params.contractAddress` (string): Contract address
- `params.userAddress` (string): User's address

**Returns:** Promise<Array<number | bigint>>

## React Hooks

### useFhevmClient()

Access the FHEVM client from context.

**Returns:** FHEVMClient | null

**Example:**
```typescript
const client = useFhevmClient();
```

### useEncrypt()

Hook for encrypting values.

**Returns:** Object with:
- `encrypt(value, type)`: Encrypt function
- `isEncrypting`: Loading state

**Example:**
```typescript
const { encrypt, isEncrypting } = useEncrypt();
const result = await encrypt(42, 'euint32');
```

### useDecrypt()

Hook for decrypting values.

**Returns:** Object with:
- `decrypt(handle)`: Decrypt function
- `isDecrypting`: Loading state

**Example:**
```typescript
const { decrypt, isDecrypting } = useDecrypt();
const result = await decrypt(handle);
```

### useContract()

Hook for contract interactions.

**Returns:** Object with contract utilities

## Types

### EncryptionType

```typescript
type EncryptionType = 'euint8' | 'euint16' | 'euint32' | 'euint64';
```

### FHEVMConfig

```typescript
interface FHEVMConfig {
  contractAddress: string;
  contractABI: any[];
  chainId: number;
  signer?: Signer;
  provider?: Provider;
}
```

### EncryptionParams

```typescript
interface EncryptionParams {
  value: number | bigint;
  type: EncryptionType;
}
```

### EncryptionResult

```typescript
interface EncryptionResult {
  handle: bigint;
  type: EncryptionType;
}
```

### DecryptionParams

```typescript
interface DecryptionParams {
  handle: bigint;
  contractAddress: string;
  userAddress: string;
}
```

### DecryptionResult

```typescript
interface DecryptionResult {
  value: number | bigint;
}
```
