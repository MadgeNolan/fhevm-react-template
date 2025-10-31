import { NextRequest, NextResponse } from 'next/server';
import { initFhevm, decryptValue } from '@fhevm/sdk';
import { JsonRpcProvider, Wallet } from 'ethers';

export async function POST(request: NextRequest) {
  try {
    const { handle, userAddress } = await request.json();

    if (!handle) {
      return NextResponse.json({ success: false, error: 'Handle is required' }, { status: 400 });
    }

    const provider = new JsonRpcProvider(process.env.RPC_URL || 'https://sepolia.infura.io/v3/your-key');
    const wallet = new Wallet(process.env.PRIVATE_KEY || '', provider);

    const client = await initFhevm({
      contractAddress: process.env.CONTRACT_ADDRESS || '',
      contractABI: [],
      chainId: 11155111,
      signer: wallet
    });

    const decrypted = await decryptValue(client, {
      handle: BigInt(handle),
      contractAddress: process.env.CONTRACT_ADDRESS || '',
      userAddress: userAddress || wallet.address
    });

    return NextResponse.json({
      success: true,
      decrypted: {
        value: decrypted.value.toString()
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
