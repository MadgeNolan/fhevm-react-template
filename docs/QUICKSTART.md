# Quick Start Guide

Get started with FHEVM SDK in less than 5 minutes.

## Installation

```bash
npm install @fhevm/sdk ethers
```

## Basic Usage

### 1. Initialize the Client

```typescript
import { initFhevm } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

// Connect wallet
const provider = new BrowserProvider(window.ethereum);
await provider.send('eth_requestAccounts', []);
const signer = await provider.getSigner();

// Initialize FHEVM
const client = await initFhevm({
  contractAddress: '0x...',
  contractABI: [...],
  chainId: 11155111,
  signer
});
```

### 2. Encrypt a Value

```typescript
import { encryptValue } from '@fhevm/sdk';

const encrypted = await encryptValue(client, {
  value: 42,
  type: 'euint32'
});

console.log('Encrypted handle:', encrypted.handle);
```

### 3. Use in Contract Call

```typescript
import { Contract } from 'ethers';

const contract = new Contract(contractAddress, abi, signer);
await contract.submitData(encrypted.handle);
```

### 4. Decrypt a Value

```typescript
import { decryptValue } from '@fhevm/sdk';

const decrypted = await decryptValue(client, {
  handle: encrypted.handle,
  contractAddress: '0x...',
  userAddress: await signer.getAddress()
});

console.log('Decrypted value:', decrypted.value);
```

## React Integration

### Setup Provider

```tsx
import { FhevmProvider } from '@fhevm/sdk/react';

function App() {
  return (
    <FhevmProvider config={{
      contractAddress: '0x...',
      contractABI: [...],
      chainId: 11155111,
      signer
    }}>
      <YourComponents />
    </FhevmProvider>
  );
}
```

### Use Hooks

```tsx
import { useEncrypt, useDecrypt } from '@fhevm/sdk/react';

function MyComponent() {
  const { encrypt, isEncrypting } = useEncrypt();
  const { decrypt, isDecrypting } = useDecrypt();

  const handleEncrypt = async () => {
    const result = await encrypt(42, 'euint32');
    console.log('Encrypted:', result.handle);
  };

  return (
    <button onClick={handleEncrypt} disabled={isEncrypting}>
      Encrypt
    </button>
  );
}
```

## Next.js Example

```tsx
// app/page.tsx
'use client';

import { useState } from 'react';
import { FhevmProvider, useEncrypt } from '@fhevm/sdk/react';

function EncryptionDemo() {
  const { encrypt } = useEncrypt();
  const [result, setResult] = useState('');

  const handleClick = async () => {
    const encrypted = await encrypt(42, 'euint32');
    setResult(encrypted.handle.toString());
  };

  return (
    <div>
      <button onClick={handleClick}>Encrypt</button>
      <p>Result: {result}</p>
    </div>
  );
}

export default function Home() {
  return (
    <FhevmProvider config={...}>
      <EncryptionDemo />
    </FhevmProvider>
  );
}
```

## Encryption Types

| Type | Range | Use Case |
|------|-------|----------|
| euint8 | 0-255 | Small numbers, flags |
| euint16 | 0-65535 | Medium numbers |
| euint32 | 0-4294967295 | Large numbers |
| euint64 | 0-18446744073709551615 | Very large numbers |

## Common Patterns

### Batch Encryption

```typescript
import { encryptBatch } from '@fhevm/sdk';

const results = await encryptBatch(client, [
  { value: 10, type: 'euint8' },
  { value: 1000, type: 'euint32' }
]);
```

### Error Handling

```typescript
try {
  const encrypted = await encrypt(value, 'euint32');
} catch (error) {
  console.error('Encryption failed:', error);
}
```

## Next Steps

- Explore the [API Reference](./API.md)
- Check out [Examples](../examples/)
- Read the [Architecture Guide](../ARCHITECTURE.md)
