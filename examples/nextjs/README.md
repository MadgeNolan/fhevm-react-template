# FHEVM SDK Next.js Example

Complete Next.js application demonstrating the FHEVM SDK integration.

## Features

- ✅ Next.js 14 App Router
- ✅ FHEVM SDK with React hooks
- ✅ MetaMask wallet connection
- ✅ Encryption and decryption demos
- ✅ TypeScript support
- ✅ Responsive design

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## Usage

1. Open [http://localhost:3000](http://localhost:3000)
2. Connect your MetaMask wallet
3. Make sure you're on Sepolia testnet
4. Try encrypting and decrypting values

## Key Files

- `app/page.tsx` - Main page with FHEVM integration
- `app/layout.tsx` - Root layout
- `app/globals.css` - Global styles
- `package.json` - Dependencies

## SDK Integration

```tsx
import { FhevmProvider, useEncrypt, useDecrypt } from '@fhevm/sdk/react';

// Wrap app with provider
<FhevmProvider config={fhevmConfig}>
  <App />
</FhevmProvider>

// Use hooks in components
const { encrypt } = useEncrypt();
const { decrypt } = useDecrypt();
```

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM](https://docs.zama.ai/fhevm)
