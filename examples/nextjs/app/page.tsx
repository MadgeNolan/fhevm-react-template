'use client';

import { useState } from 'react';
import { FhevmProvider, useFhevmClient, useEncrypt, useDecrypt } from '@fhevm/sdk/react';
import { BrowserProvider } from 'ethers';

// Example contract ABI (simplified)
const CONTRACT_ABI = [
  'function contributeData(uint32, uint8, string, bool) external',
  'function getData(uint32) external view returns (tuple(address, uint32, uint8, string, bool, uint256, uint32, bool))'
];

function EncryptionDemo() {
  const client = useFhevmClient();
  const { encrypt, isEncrypting } = useEncrypt();
  const { decrypt, isDecrypting } = useDecrypt();
  const [result, setResult] = useState<string>('');

  const handleEncrypt = async () => {
    try {
      const encrypted = await encrypt(42, 'euint32');
      setResult(`Encrypted: ${encrypted.handle.toString()}`);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  const handleDecrypt = async () => {
    try {
      const decrypted = await decrypt(42n);
      setResult(`Decrypted: ${decrypted.value}`);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  if (!client) {
    return <div className="loading">Initializing FHEVM client...</div>;
  }

  return (
    <div className="demo-container">
      <h2>FHEVM Encryption Demo</h2>

      <div className="button-group">
        <button
          onClick={handleEncrypt}
          disabled={isEncrypting}
          className="btn btn-primary"
        >
          {isEncrypting ? 'Encrypting...' : 'Encrypt Value (42)'}
        </button>

        <button
          onClick={handleDecrypt}
          disabled={isDecrypting}
          className="btn btn-secondary"
        >
          {isDecrypting ? 'Decrypting...' : 'Decrypt Value'}
        </button>
      </div>

      {result && (
        <div className="result">
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const ethersProvider = new BrowserProvider(window.ethereum);
        await ethersProvider.send('eth_requestAccounts', []);
        const ethersSigner = await ethersProvider.getSigner();

        setProvider(ethersProvider);
        setSigner(ethersSigner);
        setConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const fhevmConfig = {
    contractAddress: '0x13782134cE8cA22C432bb636B401884806799AD2',
    contractABI: CONTRACT_ABI,
    chainId: 11155111, // Sepolia
    signer: signer
  };

  return (
    <main className="main">
      <div className="container">
        <header className="header">
          <h1>FHEVM SDK Next.js Example</h1>
          <p className="subtitle">Privacy-preserving encryption with FHEVM</p>
        </header>

        {!connected ? (
          <div className="connect-section">
            <button onClick={connectWallet} className="btn btn-connect">
              Connect Wallet
            </button>
            <p className="info">Connect your wallet to start using FHEVM</p>
          </div>
        ) : (
          <FhevmProvider config={fhevmConfig}>
            <EncryptionDemo />
          </FhevmProvider>
        )}

        <section className="features">
          <h2>Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>🔒 End-to-End Encryption</h3>
              <p>Data remains encrypted on-chain and during computation</p>
            </div>
            <div className="feature-card">
              <h3>🎣 React Hooks</h3>
              <p>Simple, wagmi-like hooks for encryption and decryption</p>
            </div>
            <div className="feature-card">
              <h3>⚡ Type Safe</h3>
              <p>Full TypeScript support with comprehensive types</p>
            </div>
            <div className="feature-card">
              <h3>🚀 Easy Setup</h3>
              <p>Get started with less than 10 lines of code</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
