# FHEVM SDK Next.js Example

Complete Next.js 14 application demonstrating comprehensive FHEVM SDK integration with privacy-preserving encryption.

## Features

- ✅ Next.js 14 App Router with TypeScript
- ✅ FHEVM SDK with React hooks
- ✅ MetaMask wallet connection
- ✅ Encryption and decryption demos
- ✅ API routes for server-side FHE operations
- ✅ Reusable UI components
- ✅ Custom FHE hooks
- ✅ Real-world examples (Banking, Medical)
- ✅ Complete type safety
- ✅ Responsive design

## Project Structure

```
nextjs/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main page with demos
│   ├── globals.css             # Global styles
│   └── api/                    # API routes
│       ├── fhe/
│       │   ├── route.ts        # Main FHE operations
│       │   ├── encrypt/route.ts
│       │   ├── decrypt/route.ts
│       │   └── compute/route.ts
│       └── keys/route.ts       # Key management
│
├── components/
│   ├── ui/                     # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── fhe/                    # FHE components
│   │   ├── FHEProvider.tsx
│   │   ├── EncryptionDemo.tsx
│   │   ├── ComputationDemo.tsx
│   │   └── KeyManager.tsx
│   └── examples/               # Use case examples
│       ├── BankingExample.tsx
│       └── MedicalExample.tsx
│
├── lib/
│   ├── fhe/                    # FHE utilities
│   │   ├── client.ts           # Client-side FHE
│   │   ├── server.ts           # Server-side FHE
│   │   ├── keys.ts             # Key management
│   │   └── types.ts            # FHE type definitions
│   └── utils/                  # Utility functions
│       ├── security.ts
│       └── validation.ts
│
├── hooks/                      # Custom hooks
│   ├── useFHE.ts
│   ├── useEncryption.ts
│   └── useComputation.ts
│
└── types/                      # TypeScript types
    ├── fhe.ts
    └── api.ts
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
CONTRACT_ADDRESS=0x13782134cE8cA22C432bb636B401884806799AD2
RPC_URL=https://sepolia.infura.io/v3/your-key
PRIVATE_KEY=your-private-key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Usage

### 1. Connect Wallet

Click "Connect Wallet" and approve MetaMask connection. Make sure you're on Sepolia testnet.

### 2. Encrypt Values

Use the encryption demo to encrypt numbers. Choose the appropriate type (euint8, euint16, euint32, euint64) based on your value range.

### 3. Perform Computations

Try homomorphic computations - add, subtract, or multiply encrypted values without decrypting them.

### 4. Explore Examples

Check out the Banking and Medical examples for real-world use cases.

## Key Components

### FHE Provider

```tsx
import { FHEProvider } from '../components/fhe/FHEProvider';

<FHEProvider
  contractAddress="0x..."
  contractABI={ABI}
  chainId={11155111}
>
  <App />
</FHEProvider>
```

### Encryption Demo

```tsx
import { EncryptionDemo } from '../components/fhe/EncryptionDemo';

<EncryptionDemo />
```

### Custom Hooks

```tsx
import { useEncryption } from '../hooks/useEncryption';

const { encryptValue, isLoading } = useEncryption();
const result = await encryptValue(42, 'euint32');
```

## API Routes

### Encrypt Endpoint

```typescript
POST /api/fhe/encrypt
Body: { value: number, type: string }
Response: { success: true, encrypted: { handle: string, type: string } }
```

### Decrypt Endpoint

```typescript
POST /api/fhe/decrypt
Body: { handle: string, userAddress: string }
Response: { success: true, decrypted: { value: string } }
```

### Compute Endpoint

```typescript
POST /api/fhe/compute
Body: { operation: string, operands: string[] }
Response: { success: true, result: { handle: string, operation: string } }
```

### Main Files

- `app/page.tsx` - Main page with wallet connection and demos
- `app/layout.tsx` - Root layout with metadata
- `app/globals.css` - Global styles
- `components/fhe/FHEProvider.tsx` - FHE context provider
- `components/fhe/EncryptionDemo.tsx` - Encryption UI
- `components/fhe/ComputationDemo.tsx` - Computation UI
- `lib/fhe/client.ts` - Client-side FHE utilities
- `hooks/useEncryption.ts` - Encryption hook
- `package.json` - Dependencies and scripts

## SDK Integration

This example demonstrates the complete FHEVM SDK integration:

```tsx
import { FhevmProvider, useEncrypt, useDecrypt } from '@fhevm/sdk/react';

// 1. Wrap app with provider
<FhevmProvider config={{
  contractAddress: '0x...',
  contractABI: ABI,
  chainId: 11155111,
  signer
}}>
  <App />
</FhevmProvider>

// 2. Use hooks in components
const { encrypt, isEncrypting } = useEncrypt();
const { decrypt, isDecrypting } = useDecrypt();

// 3. Encrypt values
const encrypted = await encrypt(42, 'euint32');

// 4. Decrypt values
const decrypted = await decrypt(handle);
```

## Examples Included

### Banking Example
Private financial transactions with encrypted amounts and balances.

### Medical Example
HIPAA-compliant health records with end-to-end encryption.

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [API Reference](../../docs/API.md)
- [Quick Start Guide](../../docs/QUICKSTART.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM](https://docs.zama.ai/fhevm)

## Deployment

This Next.js app can be deployed to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

```bash
npm run build
npm start
```

## License

MIT
