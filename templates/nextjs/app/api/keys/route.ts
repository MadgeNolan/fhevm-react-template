import { NextRequest, NextResponse } from 'next/server';
import { initFhevm } from '@fhevm/sdk';
import { JsonRpcProvider, Wallet } from 'ethers';

export async function GET(request: NextRequest) {
  try {
    const provider = new JsonRpcProvider(process.env.RPC_URL || 'https://sepolia.infura.io/v3/your-key');
    const wallet = new Wallet(process.env.PRIVATE_KEY || '', provider);

    const client = await initFhevm({
      contractAddress: process.env.CONTRACT_ADDRESS || '',
      contractABI: [],
      chainId: 11155111,
      signer: wallet
    });

    // Get public key information
    const publicKey = await client.getPublicKey();

    return NextResponse.json({
      success: true,
      publicKey: {
        key: publicKey.toString('hex'),
        address: wallet.address
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { operation } = await request.json();

    const provider = new JsonRpcProvider(process.env.RPC_URL || 'https://sepolia.infura.io/v3/your-key');
    const wallet = new Wallet(process.env.PRIVATE_KEY || '', provider);

    const client = await initFhevm({
      contractAddress: process.env.CONTRACT_ADDRESS || '',
      contractABI: [],
      chainId: 11155111,
      signer: wallet
    });

    if (operation === 'refresh') {
      // Refresh keys
      await client.refreshKeys();
      return NextResponse.json({ success: true, message: 'Keys refreshed successfully' });
    }

    return NextResponse.json({ success: false, error: 'Invalid operation' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
