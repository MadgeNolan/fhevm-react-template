# Demo Video Guide

This document outlines what should be covered in the `demo.mp4` video demonstration.

## Video Structure (10-15 minutes)

### 1. Introduction (2 minutes)

- Project overview
- Key features of the SDK
- Why it's better than existing solutions

### 2. SDK Installation & Setup (3 minutes)

**Show the following:**

```bash
# Clone repository
git clone <repo-url>
cd fhevm-react-template

# Install all dependencies
npm install
npm run install:all
```

**Explain:**
- Monorepo structure
- How packages are linked
- Development workflow

### 3. Core SDK Usage (3 minutes)

**Demonstrate vanilla JavaScript usage:**

```javascript
import { initFhevm, encryptValue, decryptValue } from '@fhevm/sdk';

// Show initialization
const client = await initFhevm({
  contractAddress: '0x...',
  contractABI: [...],
  chainId: 11155111,
  signer
});

// Show encryption
const encrypted = await encryptValue(client, {
  value: 42,
  type: 'euint32'
});

// Show decryption
const decrypted = await decryptValue(client, {
  handle: encrypted.handle,
  contractAddress: '0x...',
  userAddress: await signer.getAddress()
});
```

**Highlight:**
- Simple, intuitive API
- < 10 lines of code
- Type safety with TypeScript

### 4. Next.js Example (4 minutes)

**Start the Next.js app:**

```bash
cd examples/nextjs
npm run dev
```

**Show in browser:**
1. Connect MetaMask wallet
2. Encrypt a value using the UI
3. Decrypt a value
4. Show React DevTools with hooks

**Highlight in code:**
```tsx
// Show FhevmProvider setup
<FhevmProvider config={...}>
  <App />
</FhevmProvider>

// Show hooks usage
const { encrypt } = useEncrypt();
const { decrypt } = useDecrypt();
```

### 5. Research Data Sharing Example (3 minutes)

**Start the research platform:**

```bash
cd examples/research-data-sharing
npm run dev
```

**Demonstrate:**
1. Connect wallet on Sepolia
2. Contribute encrypted dataset
3. Request data access
4. Access a dataset
5. Show encrypted values on-chain (Etherscan)

**Highlight:**
- Real-world use case
- Integration with deployed contract
- Privacy preservation

### 6. Design Decisions & Architecture (2 minutes)

**Show code structure:**
```
packages/fhevm-sdk/
├── src/
│   ├── core/          # Framework-agnostic
│   ├── react/         # React hooks
│   └── utils/         # Utilities
```

**Explain:**
- Why modular architecture
- How to extend for other frameworks
- Type safety throughout

### 7. Conclusion (1 minute)

**Recap:**
- ✅ Framework agnostic
- ✅ < 10 lines to start
- ✅ Wagmi-like structure
- ✅ Multiple examples
- ✅ Production ready

**Next steps:**
- Deploy your own dApp
- Extend the SDK
- Contribute to the project

## Recording Tips

1. **Use a clean environment**
   - Fresh terminal
   - Clear browser state
   - Stable Sepolia connection

2. **Prepare beforehand**
   - Have wallet funded with Sepolia ETH
   - Test all examples work
   - Prepare code snippets

3. **Show, don't just tell**
   - Live coding where possible
   - Show actual transactions on Etherscan
   - Display browser console for debugging

4. **Highlight key points**
   - Zoom into important code
   - Use annotations if possible
   - Repeat important commands

5. **Keep it concise**
   - 10-15 minutes maximum
   - Focus on practical usage
   - Skip long wait times (edit out)

## What to Include in Screen Recording

- Terminal (for commands)
- Code editor (VS Code recommended)
- Browser (for demos)
- Etherscan (for on-chain verification)

## Demo Script Checklist

- [ ] Introduction and project overview
- [ ] Show repository structure
- [ ] Install dependencies
- [ ] Build SDK
- [ ] Show vanilla JS usage
- [ ] Run Next.js example
- [ ] Demonstrate wallet connection
- [ ] Show encryption in action
- [ ] Show decryption in action
- [ ] Run research platform example
- [ ] Contribute encrypted data
- [ ] Verify transaction on Etherscan
- [ ] Show React DevTools with hooks
- [ ] Explain architecture
- [ ] Conclusion and summary

## Video File Requirements

- **Format**: MP4
- **Resolution**: 1080p or 720p minimum
- **Duration**: 10-15 minutes
- **Audio**: Clear voiceover explaining actions
- **Captions**: Optional but recommended

## Recording Tools

Recommended tools:
- **OBS Studio** (free, open source)
- **Loom** (easy to use)
- **QuickTime** (Mac)
- **Windows Game Bar** (Windows)

## After Recording

1. Review the video
2. Add annotations if needed
3. Export as MP4
4. Test playback
5. Place in repository root as `demo.mp4`
