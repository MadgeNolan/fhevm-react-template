import { initFhevm, encryptValue, decryptValue } from '@fhevm/sdk';
import { BrowserProvider, Signer } from 'ethers';

export interface FHEClientConfig {
  contractAddress: string;
  contractABI: any[];
  chainId: number;
  signer?: Signer;
}

export class FHEClient {
  private client: any;
  private config: FHEClientConfig;

  constructor(config: FHEClientConfig) {
    this.config = config;
  }

  async initialize() {
    try {
      this.client = await initFhevm({
        contractAddress: this.config.contractAddress,
        contractABI: this.config.contractABI,
        chainId: this.config.chainId,
        signer: this.config.signer
      });
      return this.client;
    } catch (error) {
      console.error('Failed to initialize FHE client:', error);
      throw error;
    }
  }

  async encrypt(value: number | bigint, type: 'euint8' | 'euint16' | 'euint32' | 'euint64' = 'euint32') {
    if (!this.client) {
      throw new Error('Client not initialized. Call initialize() first.');
    }

    try {
      return await encryptValue(this.client, { value, type });
    } catch (error) {
      console.error('Encryption failed:', error);
      throw error;
    }
  }

  async decrypt(handle: bigint, contractAddress: string, userAddress: string) {
    if (!this.client) {
      throw new Error('Client not initialized. Call initialize() first.');
    }

    try {
      return await decryptValue(this.client, {
        handle,
        contractAddress,
        userAddress
      });
    } catch (error) {
      console.error('Decryption failed:', error);
      throw error;
    }
  }

  getClient() {
    return this.client;
  }

  isInitialized() {
    return !!this.client;
  }
}

export async function createFHEClient(config: FHEClientConfig): Promise<FHEClient> {
  const client = new FHEClient(config);
  await client.initialize();
  return client;
}
