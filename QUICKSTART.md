# Quick Start Guide

Get started with FHEVM SDK in under 5 minutes.

## Prerequisites

- Node.js 18+ or 20+
- npm 9+
- MetaMask wallet
- Sepolia testnet ETH ([get from faucet](https://sepoliafaucet.com/))

## Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd fhevm-react-template

# Install dependencies
npm install

# Install example dependencies
npm run install:all
```

## Build the SDK

```bash
npm run build:sdk
```

## Run Examples

### Next.js Example

```bash
# Start Next.js app
npm run dev:nextjs

# Open http://localhost:3000
```

**Try it:**
1. Click "Connect Wallet"
2. Select Sepolia network in MetaMask
3. Click "Encrypt Value (42)"
4. See encrypted result
5. Click "Decrypt Value"

### Research Data Sharing

```bash
# Start research platform
npm run dev:research

# Open http://localhost:3000
```

**Try it:**
1. Connect wallet on Sepolia
2. Fill in dataset form
3. Click "Contribute Dataset"
4. Check transaction on Etherscan

## Using the SDK in Your Project

### Install Package

```bash
npm install @fhevm/sdk ethers
```

### Basic Usage (Vanilla JS)

```javascript
import { initFhevm, encryptValue } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

// 1. Connect wallet
const provider = new BrowserProvider(window.ethereum);
await provider.send('eth_requestAccounts', []);
const signer = await provider.getSigner();

// 2. Initialize FHEVM client
const client = await initFhevm({
  contractAddress: '0x...',
  contractABI: [...],
  chainId: 11155111, // Sepolia
  signer
});

// 3. Encrypt value
const encrypted = await encryptValue(client, {
  value: 42,
  type: 'euint32'
});

// 4. Use in contract call
const tx = await client.contract.submitData(encrypted.handle);
await tx.wait();
```

### React Usage

```tsx
import { FhevmProvider, useEncrypt } from '@fhevm/sdk/react';

// 1. Wrap app with provider
function App() {
  return (
    <FhevmProvider config={fhevmConfig}>
      <MyComponent />
    </FhevmProvider>
  );
}

// 2. Use hooks in components
function MyComponent() {
  const { encrypt, isEncrypting } = useEncrypt();

  const handleEncrypt = async () => {
    const result = await encrypt(42, 'euint32');
    console.log('Encrypted:', result);
  };

  return (
    <button onClick={handleEncrypt} disabled={isEncrypting}>
      Encrypt
    </button>
  );
}
```

### Next.js Usage

See complete example in `examples/nextjs/`:

```tsx
// app/page.tsx
'use client';

import { FhevmProvider, useEncrypt } from '@fhevm/sdk/react';

export default function Home() {
  const [signer, setSigner] = useState(null);

  // ... wallet connection code

  return (
    <FhevmProvider config={{ contractAddress, contractABI, chainId: 11155111, signer }}>
      <EncryptionDemo />
    </FhevmProvider>
  );
}
```

## Configuration

### Contract Setup

```typescript
const CONTRACT_ADDRESS = '0x13782134cE8cA22C432bb636B401884806799AD2';

const CONTRACT_ABI = [
  'function contributeData(uint32, uint8, string, bool) external',
  'function getData(uint32) external view returns (tuple(...))'
];

const config = {
  contractAddress: CONTRACT_ADDRESS,
  contractABI: CONTRACT_ABI,
  chainId: 11155111, // Sepolia
  signer: yourSigner
};
```

### Network Settings

Ensure MetaMask is on Sepolia:

- **Network Name**: Sepolia Test Network
- **RPC URL**: https://sepolia.infura.io/v3/YOUR_KEY
- **Chain ID**: 11155111
- **Currency Symbol**: ETH

## Common Operations

### Encrypt Different Types

```typescript
// euint8 (0-255)
const encrypted8 = await encryptValue(client, { value: 100, type: 'euint8' });

// euint32
const encrypted32 = await encryptValue(client, { value: 12345, type: 'euint32' });

// euint64
const encrypted64 = await encryptValue(client, { value: 999999n, type: 'euint64' });
```

### Decrypt Values

```typescript
const decrypted = await decryptValue(client, {
  handle: encryptedHandle,
  contractAddress: '0x...',
  userAddress: await signer.getAddress()
});

console.log('Decrypted value:', decrypted.value);
```

### Batch Operations

```typescript
// Encrypt multiple values
const encrypted = await encryptBatch(client, [
  { value: 1, type: 'euint32' },
  { value: 2, type: 'euint32' },
  { value: 3, type: 'euint32' }
]);

// Use in contract
await contract.submitBatch(encrypted.map(e => e.handle));
```

## Troubleshooting

### MetaMask Not Connecting

```javascript
// Check if MetaMask is installed
if (!window.ethereum) {
  alert('Please install MetaMask!');
  return;
}

// Request accounts
await window.ethereum.request({ method: 'eth_requestAccounts' });
```

### Wrong Network

```javascript
// Check network
const network = await provider.getNetwork();
if (network.chainId !== 11155111n) {
  alert('Please switch to Sepolia Testnet');
}

// Or auto-switch
await window.ethereum.request({
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0xaa36a7' }] // 11155111 in hex
});
```

### Transaction Fails

```javascript
try {
  const tx = await contract.submitData(encryptedValue);
  await tx.wait();
} catch (error) {
  console.error('Transaction failed:', error.message);
  // Check: sufficient gas, correct parameters, contract address
}
```

## Next Steps

- 📖 Read [README.md](./README.md) for complete documentation
- 🏗️ See [ARCHITECTURE.md](./ARCHITECTURE.md) for design details
- 🚀 Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment guide
- 🎬 Watch [demo.mp4](./demo.mp4) for video walkthrough
- 💻 Explore [examples/](./examples/) for more code samples

## Resources

- [Zama FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sepolia Faucet](https://sepoliafaucet.com/)

## Support

Having issues? Check:
- [GitHub Issues](https://github.com/your-repo/issues)
- [Contributing Guide](./CONTRIBUTING.md)
- [Architecture Guide](./ARCHITECTURE.md)

## License

MIT - see [LICENSE](./LICENSE) for details

---

**Happy Building! 🚀**
