export interface FHEKeyPair {
  publicKey: string;
  privateKey?: string;
}

export interface KeyManager {
  getPublicKey(): Promise<Buffer>;
  refreshKeys(): Promise<void>;
}

export class FHEKeyManager implements KeyManager {
  private client: any;
  private publicKey: Buffer | null = null;

  constructor(client: any) {
    this.client = client;
  }

  async getPublicKey(): Promise<Buffer> {
    if (!this.publicKey) {
      this.publicKey = await this.client.getPublicKey();
    }
    return this.publicKey;
  }

  async refreshKeys(): Promise<void> {
    // Force refresh of keys
    this.publicKey = null;
    await this.client.refreshKeys?.();
    this.publicKey = await this.client.getPublicKey();
  }

  getPublicKeyHex(): string {
    if (!this.publicKey) {
      throw new Error('Public key not loaded. Call getPublicKey() first.');
    }
    return this.publicKey.toString('hex');
  }

  async validateKey(): Promise<boolean> {
    try {
      const key = await this.getPublicKey();
      return key && key.length > 0;
    } catch {
      return false;
    }
  }
}

export function createKeyManager(client: any): FHEKeyManager {
  return new FHEKeyManager(client);
}

export async function getPublicKeyFromClient(client: any): Promise<string> {
  const manager = createKeyManager(client);
  const key = await manager.getPublicKey();
  return key.toString('hex');
}
