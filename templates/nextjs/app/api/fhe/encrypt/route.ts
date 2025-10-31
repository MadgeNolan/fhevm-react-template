import { NextRequest, NextResponse } from 'next/server';
import { initFhevm, encryptValue } from '@fhevm/sdk';
import { JsonRpcProvider, Wallet } from 'ethers';

export async function POST(request: NextRequest) {
  try {
    const { value, type = 'euint32' } = await request.json();

    if (value === undefined) {
      return NextResponse.json({ success: false, error: 'Value is required' }, { status: 400 });
    }

    const provider = new JsonRpcProvider(process.env.RPC_URL || 'https://sepolia.infura.io/v3/your-key');
    const wallet = new Wallet(process.env.PRIVATE_KEY || '', provider);

    const client = await initFhevm({
      contractAddress: process.env.CONTRACT_ADDRESS || '',
      contractABI: [],
      chainId: 11155111,
      signer: wallet
    });

    const encrypted = await encryptValue(client, { value, type });

    return NextResponse.json({
      success: true,
      encrypted: {
        handle: encrypted.handle.toString(),
        type: type
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
