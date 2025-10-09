# Privacy-Preserving Research Data Sharing

Complete example of a privacy-preserving scientific data platform using FHEVM SDK.

## Features

- 🔒 **Fully Encrypted Data** - Research data stays encrypted using euint32, euint8, euint64
- 🧮 **Homomorphic Operations** - Compute on encrypted data without decryption
- 🤝 **Access Control** - Grant permissions without revealing dataset contents
- 🚀 **FHEVM SDK Integration** - Built with universal @fhevm/sdk

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Usage

1. Connect your MetaMask wallet
2. Ensure you're on Sepolia testnet
3. Contribute encrypted datasets
4. Request data access
5. Access approved datasets

## Smart Contract

The example uses a deployed contract on Sepolia:
- **Address**: `0x13782134cE8cA22C432bb636B401884806799AD2`
- **Network**: Sepolia Testnet (Chain ID: 11155111)

## SDK Integration

```javascript
import { initFhevm, encryptValue } from '@fhevm/sdk';

// Initialize client
const client = await initFhevm({
  contractAddress: CONTRACT_ADDRESS,
  contractABI: CONTRACT_ABI,
  chainId: 11155111,
  signer: signer
});

// Encrypt and contribute data
const encrypted = await encryptValue(client, {
  value: 12345,
  type: 'euint32'
});
```

## Key Files

- `contracts/ResearchDataSharing.sol` - Smart contract with FHE encryption
- `index.html` - Frontend interface
- `main.js` - Application logic with SDK integration
- `styles.css` - Styling

## Use Cases

- **Medical Research** - Share patient data without revealing individual health information
- **Clinical Trials** - Aggregate trial results while maintaining participant privacy
- **Genomic Studies** - Analyze genetic data without exposing sensitive markers

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Zama FHEVM](https://docs.zama.ai/fhevm)
