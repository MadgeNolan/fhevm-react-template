# @fhevm/sdk

Universal FHEVM SDK for building confidential dApps with any framework.

## Features

- 🚀 **Framework Agnostic** - Works with React, Next.js, Vue, Node.js, or any JavaScript environment
- 🔒 **Type Safe** - Full TypeScript support with comprehensive types
- 🎣 **React Hooks** - Wagmi-like hooks for React applications
- 🛠️ **Developer Friendly** - Simple, intuitive API with < 10 lines to get started
- 📦 **All-in-One** - Wraps all required packages for FHEVM development

## Installation

```bash
npm install @fhevm/sdk ethers
```

## Quick Start

### Vanilla JavaScript / Node.js

```typescript
import { initFhevm, encryptValue, decryptValue } from '@fhevm/sdk';
import { ethers } from 'ethers';

// Initialize client
const client = await initFhevm({
  contractAddress: '0x...',
  contractABI: [...],
  chainId: 11155111,
  signer: yourSigner
});

// Encrypt a value
const encrypted = await encryptValue(client, {
  value: 42,
  type: 'euint32'
});

// Decrypt a value
const decrypted = await decryptValue(client, {
  handle: encrypted.handle,
  contractAddress: '0x...',
  userAddress: await signer.getAddress()
});
```

### React with Hooks

```tsx
import { FhevmProvider, useFhevmClient, useEncrypt, useDecrypt } from '@fhevm/sdk/react';

// Wrap your app with FhevmProvider
function App() {
  return (
    <FhevmProvider config={{ contractAddress: '0x...', ... }}>
      <MyComponent />
    </FhevmProvider>
  );
}

// Use hooks in your components
function MyComponent() {
  const client = useFhevmClient();
  const { encrypt, isEncrypting } = useEncrypt();
  const { decrypt, isDecrypting } = useDecrypt();

  const handleEncrypt = async () => {
    const result = await encrypt(42, 'euint32');
    console.log('Encrypted:', result);
  };

  return <button onClick={handleEncrypt}>Encrypt Value</button>;
}
```

## API Reference

### Core Functions

#### `initFhevm(config)`

Initialize FHEVM client.

```typescript
const client = await initFhevm({
  contractAddress: string;
  contractABI: any[];
  chainId: number;
  signer?: Signer;
  provider?: Provider;
});
```

#### `encryptValue(client, params)`

Encrypt a value for FHEVM contract.

```typescript
const encrypted = await encryptValue(client, {
  value: 12345,
  type: 'euint32' // 'euint8' | 'euint16' | 'euint32' | 'euint64'
});
```

#### `decryptValue(client, params)`

Decrypt an encrypted value using EIP-712 signature.

```typescript
const decrypted = await decryptValue(client, {
  handle: bigint,
  contractAddress: string,
  userAddress: string
});
```

### React Hooks

#### `useFhevmClient()`

Access the FHEVM client instance.

```tsx
const client = useFhevmClient();
```

#### `useEncrypt()`

Hook for encrypting values.

```tsx
const { encrypt, isEncrypting, error } = useEncrypt();

const result = await encrypt(42, 'euint32');
```

#### `useDecrypt()`

Hook for decrypting values.

```tsx
const { decrypt, isDecrypting, error } = useDecrypt();

const result = await decrypt(handleBigInt);
```

#### `useContract()`

Hook for contract interactions.

```tsx
const { contract, call, send } = useContract();

// Read operation
const data = await call('getData', [1]);

// Write operation
const tx = await send('setData', [encryptedValue]);
await tx.wait();
```

## Examples

See the `/examples` directory for complete working examples:

- **Next.js** - Full Next.js application with FHEVM SDK
- **Research Data Sharing** - Privacy-preserving research platform
- **React** - Basic React integration
- **Node.js** - Backend usage examples

## License

MIT
