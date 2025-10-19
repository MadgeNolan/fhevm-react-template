# Universal FHEVM SDK

**Build confidential dApps with any framework in less than 10 lines of code.**

A comprehensive, framework-agnostic SDK for building privacy-preserving applications with Zama's FHEVM (Fully Homomorphic Encryption Virtual Machine). This SDK provides wagmi-like structure for web3 developers, making it intuitive to build confidential frontends.

## 🚀 Quick Start (< 10 Lines)

```typescript
import { initFhevm, encryptValue } from '@fhevm/sdk';

// Initialize (3 lines)
const client = await initFhevm({
  contractAddress: '0x...',
  contractABI: [...],
  chainId: 11155111,
  signer: yourSigner
});

// Encrypt (1 line)
const encrypted = await encryptValue(client, { value: 42, type: 'euint32' });

// Done! Use encrypted.handle in your contract calls
await contract.submitData(encrypted.handle);
```

## ✨ Features

- 🌐 **Framework Agnostic** - Works with React, Next.js, Vue, Node.js, or vanilla JavaScript
- 🎣 **Wagmi-like Hooks** - Familiar patterns for React developers
- 📦 **All-in-One** - Single package wraps all FHEVM dependencies
- 🔒 **Type Safe** - Full TypeScript support with comprehensive types
- ⚡ **Zero Config** - Sensible defaults, customize when needed
- 🛠️ **Developer Friendly** - Intuitive API, clear documentation
- 🔐 **Complete Flow** - Handles initialization, encryption, decryption, and permissions

## 📦 Installation

```bash
# Install from root
npm install

# Install all packages and examples
npm run install:all
```

## 🏗️ Project Structure

```
fhevm-sdk-monorepo/
├── packages/
│   └── fhevm-sdk/              # Core SDK package
│       ├── src/
│       │   ├── core/           # Core functionality
│       │   │   ├── client.ts   # FHEVM client initialization
│       │   │   ├── encryption.ts
│       │   │   ├── decryption.ts
│       │   │   └── types.ts
│       │   ├── react/          # React hooks
│       │   │   ├── FhevmProvider.tsx
│       │   │   ├── useEncrypt.ts
│       │   │   ├── useDecrypt.ts
│       │   │   └── useContract.ts
│       │   └── utils/          # Utilities
│       └── README.md
│
├── examples/
│   ├── nextjs/                 # Next.js example (REQUIRED)
│   │   ├── app/
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── research-data-sharing/  # Full dApp example
│       ├── contracts/          # Smart contracts
│       ├── index.html          # Frontend
│       ├── main.js             # SDK integration
│       └── README.md
│
├── demo.mp4                    # Video demonstration
├── package.json                # Root package
└── README.md                   # This file
```

## 🎯 Usage Examples

### Vanilla JavaScript / Node.js

```javascript
import { initFhevm, encryptValue, decryptValue } from '@fhevm/sdk';

const client = await initFhevm({
  contractAddress: '0x...',
  contractABI: [...],
  chainId: 11155111,
  signer
});

// Encrypt
const encrypted = await encryptValue(client, {
  value: 12345,
  type: 'euint32'
});

// Decrypt
const decrypted = await decryptValue(client, {
  handle: encrypted.handle,
  contractAddress: '0x...',
  userAddress: await signer.getAddress()
});
```

### React with Hooks

```tsx
import { FhevmProvider, useEncrypt, useDecrypt } from '@fhevm/sdk/react';

function App() {
  return (
    <FhevmProvider config={{ contractAddress: '0x...', ... }}>
      <MyComponent />
    </FhevmProvider>
  );
}

function MyComponent() {
  const { encrypt, isEncrypting } = useEncrypt();
  const { decrypt } = useDecrypt();

  const handleEncrypt = async () => {
    const result = await encrypt(42, 'euint32');
    console.log('Encrypted:', result);
  };

  return <button onClick={handleEncrypt}>Encrypt</button>;
}
```

### Next.js

See complete working example in `examples/nextjs/`.

```bash
cd examples/nextjs
npm install
npm run dev
```

## 📖 Documentation

### Core SDK

The core SDK provides framework-agnostic functions:

- **`initFhevm(config)`** - Initialize FHEVM client
- **`encryptValue(client, params)`** - Encrypt values for contracts
- **`decryptValue(client, params)`** - Decrypt encrypted values
- **`encryptBatch(client, values)`** - Encrypt multiple values
- **`decryptBatch(client, params)`** - Decrypt multiple values

### React Hooks

Wagmi-like hooks for React applications:

- **`<FhevmProvider>`** - Context provider
- **`useFhevmClient()`** - Access FHEVM client
- **`useEncrypt()`** - Encrypt values
- **`useDecrypt()`** - Decrypt values
- **`useContract()`** - Contract interactions

### Type Definitions

Full TypeScript support with comprehensive types:

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

## 🎬 Video Demo

Watch `demo.mp4` for a complete walkthrough of:
- SDK installation and setup
- Building a confidential dApp
- Encryption and decryption flows
- React hooks usage
- Next.js integration

## 🌟 Examples

### 1. Next.js Example (Required)

Complete Next.js 14 application with App Router, demonstrating:
- Wallet connection
- FHEVM SDK integration
- Encryption/decryption UI
- Type-safe components

```bash
cd examples/nextjs
npm install
npm run dev
# Open http://localhost:3000
```

### 2. Research Data Sharing

Full privacy-preserving research platform showing:
- Encrypted data contribution
- Access control
- Quality scoring
- Reward distribution

```bash
cd examples/research-data-sharing
npm install
npm run dev
```

## 🔧 Development

```bash
# Build SDK
npm run build:sdk

# Run tests
npm test

# Start Next.js example
npm run dev:nextjs

# Start research example
npm run dev:research

# Clean all dependencies
npm run clean
```

## 🏆 Competition Requirements

This SDK fulfills all Zama FHEVM Challenge requirements:

### ✅ Core Requirements

- **Framework Agnostic** - Works with any JavaScript environment
- **Wrapper Package** - Single `@fhevm/sdk` handles all dependencies
- **Wagmi-like Structure** - Familiar patterns for web3 developers
- **Quick Setup** - < 10 lines of code to get started
- **Complete Flow** - Initialization, encryption, decryption, permissions

### ✅ Bonus Features

- **Multiple Environments** - Examples for Next.js, vanilla JS, and Node.js
- **Clear Documentation** - Comprehensive guides and code examples
- **Developer Friendly** - Minimal setup time, intuitive API
- **Production Ready** - Type-safe, tested, and well-structured

## 📊 Key Design Decisions

### 1. Modular Architecture

Core functionality is separated into logical modules:
- `core/` - Framework-agnostic functions
- `react/` - React-specific hooks
- `utils/` - Shared utilities

This allows:
- Tree-shaking for optimal bundle sizes
- Easy addition of Vue/Svelte adapters
- Framework-agnostic core usage

### 2. Wagmi-like API

Familiar patterns for web3 developers:
```tsx
// Similar to wagmi's useAccount, useConnect
const client = useFhevmClient();
const { encrypt } = useEncrypt();
```

### 3. TypeScript First

Full type safety throughout:
- Comprehensive type definitions
- IntelliSense support
- Compile-time error catching

### 4. Zero Configuration

Sensible defaults with customization options:
```typescript
// Simple
const client = await initFhevm({ contractAddress, contractABI, chainId, signer });

// Advanced
const client = await initFhevm({
  contractAddress,
  contractABI,
  chainId,
  signer,
  provider: customProvider
});
```

## 🔐 Security

- EIP-712 signatures for decryption
- Proper access control patterns
- Input validation
- Type-safe operations

## 🚀 Deployment

All examples are deployment-ready:

- **Next.js** - Deploy to Vercel, Netlify, or any Node.js host
- **Research Platform** - Static hosting or Vercel

## 📝 License

MIT

## 🙏 Acknowledgments

Built for the Zama FHEVM Challenge, demonstrating practical privacy-preserving applications:

- **Zama** - For pioneering FHEVM technology
- **Community** - For feedback and suggestions

## 🔗 Links

- [Zama Documentation](https://docs.zama.ai/fhevm)
- [FHEVM Hardhat Plugin](https://github.com/zama-ai/fhevm-hardhat-plugin)
- [Example Deployment](https://fhe-research-data-sharing.vercel.app/)

---

**Built with ❤️ for the Zama FHEVM Challenge**

*Making confidential smart contracts accessible to all developers*
