import { initFhevm, encryptValue, decryptValue } from '@fhevm/sdk';
import { JsonRpcProvider, Wallet } from 'ethers';

export interface ServerFHEConfig {
  contractAddress: string;
  contractABI: any[];
  chainId: number;
  privateKey: string;
  rpcUrl: string;
}

export class ServerFHEClient {
  private client: any;
  private wallet: Wallet;
  private provider: JsonRpcProvider;
  private config: ServerFHEConfig;

  constructor(config: ServerFHEConfig) {
    this.config = config;
    this.provider = new JsonRpcProvider(config.rpcUrl);
    this.wallet = new Wallet(config.privateKey, this.provider);
  }

  async initialize() {
    try {
      this.client = await initFhevm({
        contractAddress: this.config.contractAddress,
        contractABI: this.config.contractABI,
        chainId: this.config.chainId,
        signer: this.wallet
      });
      return this.client;
    } catch (error) {
      console.error('Failed to initialize server FHE client:', error);
      throw error;
    }
  }

  async encryptValue(value: number | bigint, type: 'euint8' | 'euint16' | 'euint32' | 'euint64' = 'euint32') {
    if (!this.client) {
      await this.initialize();
    }

    try {
      return await encryptValue(this.client, { value, type });
    } catch (error) {
      console.error('Server encryption failed:', error);
      throw error;
    }
  }

  async decryptValue(handle: bigint, userAddress?: string) {
    if (!this.client) {
      await this.initialize();
    }

    try {
      return await decryptValue(this.client, {
        handle,
        contractAddress: this.config.contractAddress,
        userAddress: userAddress || this.wallet.address
      });
    } catch (error) {
      console.error('Server decryption failed:', error);
      throw error;
    }
  }

  getWalletAddress() {
    return this.wallet.address;
  }

  getClient() {
    return this.client;
  }
}

export async function createServerFHEClient(config: ServerFHEConfig): Promise<ServerFHEClient> {
  const client = new ServerFHEClient(config);
  await client.initialize();
  return client;
}
