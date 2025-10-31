import { NextRequest, NextResponse } from 'next/server';
import { initFhevm, encryptValue, decryptValue } from '@fhevm/sdk';
import { JsonRpcProvider, Wallet } from 'ethers';

export async function POST(request: NextRequest) {
  try {
    const { operation, value, handle, type } = await request.json();

    // Initialize FHEVM client
    const provider = new JsonRpcProvider(process.env.RPC_URL || 'https://sepolia.infura.io/v3/your-key');
    const wallet = new Wallet(process.env.PRIVATE_KEY || '', provider);

    const client = await initFhevm({
      contractAddress: process.env.CONTRACT_ADDRESS || '',
      contractABI: [],
      chainId: 11155111,
      signer: wallet
    });

    if (operation === 'encrypt') {
      const encrypted = await encryptValue(client, { value, type: type || 'euint32' });
      return NextResponse.json({ success: true, result: encrypted });
    }

    if (operation === 'decrypt') {
      const decrypted = await decryptValue(client, {
        handle,
        contractAddress: process.env.CONTRACT_ADDRESS || '',
        userAddress: wallet.address
      });
      return NextResponse.json({ success: true, result: decrypted });
    }

    return NextResponse.json({ success: false, error: 'Invalid operation' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
