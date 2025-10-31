# FHEVM SDK Examples

Comprehensive examples demonstrating different use cases.

## Example 1: Private Banking

Implement confidential transactions where amounts and balances remain encrypted.

```typescript
import { initFhevm, encryptValue } from '@fhevm/sdk';

async function privateTransfer(amount: number, recipient: string) {
  const client = await initFhevm({
    contractAddress: BANK_CONTRACT,
    contractABI: BANK_ABI,
    chainId: 11155111,
    signer
  });

  // Encrypt transfer amount
  const encryptedAmount = await encryptValue(client, {
    value: amount,
    type: 'euint32'
  });

  // Submit to contract
  const contract = new Contract(BANK_CONTRACT, BANK_ABI, signer);
  const tx = await contract.transfer(recipient, encryptedAmount.handle);
  await tx.wait();

  console.log('Private transfer completed');
}
```

## Example 2: Medical Records

Store and manage sensitive health data with privacy.

```typescript
import { encryptBatch } from '@fhevm/sdk';

async function submitMedicalData(heartRate: number, temperature: number) {
  const client = await initFhevm({
    contractAddress: MEDICAL_CONTRACT,
    contractABI: MEDICAL_ABI,
    chainId: 11155111,
    signer
  });

  // Encrypt all medical data
  const encrypted = await encryptBatch(client, [
    { value: heartRate, type: 'euint8' },
    { value: Math.floor(temperature * 10), type: 'euint16' }
  ]);

  // Submit to medical records contract
  const contract = new Contract(MEDICAL_CONTRACT, MEDICAL_ABI, signer);
  await contract.submitHealthData(
    encrypted[0].handle,
    encrypted[1].handle
  );
}
```

## Example 3: Private Voting

Implement anonymous voting with encrypted vote counts.

```typescript
import { useEncrypt } from '@fhevm/sdk/react';

function VotingComponent() {
  const { encrypt } = useEncrypt();

  const castVote = async (candidateId: number) => {
    // Encrypt vote (1 for vote, 0 for no vote)
    const encryptedVote = await encrypt(1, 'euint8');

    // Submit to voting contract
    const contract = new Contract(VOTING_CONTRACT, VOTING_ABI, signer);
    await contract.vote(candidateId, encryptedVote.handle);
  };

  return (
    <div>
      <button onClick={() => castVote(1)}>Vote for Candidate 1</button>
      <button onClick={() => castVote(2)}>Vote for Candidate 2</button>
    </div>
  );
}
```

## Example 4: Sealed-Bid Auction

Create an auction where bids remain private until reveal.

```typescript
async function submitBid(auctionId: number, bidAmount: number) {
  const client = await initFhevm({
    contractAddress: AUCTION_CONTRACT,
    contractABI: AUCTION_ABI,
    chainId: 11155111,
    signer
  });

  // Encrypt bid amount
  const encryptedBid = await encryptValue(client, {
    value: bidAmount,
    type: 'euint32'
  });

  // Submit sealed bid
  const contract = new Contract(AUCTION_CONTRACT, AUCTION_ABI, signer);
  await contract.submitBid(auctionId, encryptedBid.handle);

  console.log('Sealed bid submitted');
}
```

## Example 5: Confidential Credit Score

Store and verify credit scores without revealing exact values.

```typescript
async function submitCreditScore(score: number) {
  const client = await initFhevm({
    contractAddress: CREDIT_CONTRACT,
    contractABI: CREDIT_ABI,
    chainId: 11155111,
    signer
  });

  // Encrypt credit score (300-850 range)
  const encryptedScore = await encryptValue(client, {
    value: score,
    type: 'euint16'
  });

  // Submit to credit contract
  const contract = new Contract(CREDIT_CONTRACT, CREDIT_ABI, signer);
  await contract.updateCreditScore(encryptedScore.handle);

  // Contract can compare scores without revealing actual values
  const isApproved = await contract.checkCreditApproval(encryptedScore.handle);
}
```

## Example 6: React Hook Usage

Complete React component with encryption and decryption.

```tsx
import { useState } from 'react';
import { useEncrypt, useDecrypt } from '@fhevm/sdk/react';

function PrivacyDemo() {
  const [value, setValue] = useState('');
  const [handle, setHandle] = useState<bigint | null>(null);
  const { encrypt, isEncrypting } = useEncrypt();
  const { decrypt, isDecrypting } = useDecrypt();

  const handleEncrypt = async () => {
    const result = await encrypt(parseInt(value), 'euint32');
    setHandle(result.handle);
  };

  const handleDecrypt = async () => {
    if (handle) {
      const result = await decrypt(handle);
      alert(`Decrypted value: ${result.value}`);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a number"
      />
      <button onClick={handleEncrypt} disabled={isEncrypting}>
        Encrypt
      </button>
      {handle && (
        <button onClick={handleDecrypt} disabled={isDecrypting}>
          Decrypt
        </button>
      )}
    </div>
  );
}
```

## Example 7: Server-Side Usage

Use FHEVM SDK in Node.js backend.

```typescript
import { initFhevm, encryptValue } from '@fhevm/sdk';
import { JsonRpcProvider, Wallet } from 'ethers';

async function serverSideEncryption() {
  const provider = new JsonRpcProvider(process.env.RPC_URL);
  const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

  const client = await initFhevm({
    contractAddress: process.env.CONTRACT_ADDRESS,
    contractABI: JSON.parse(process.env.CONTRACT_ABI),
    chainId: 11155111,
    signer: wallet
  });

  const encrypted = await encryptValue(client, {
    value: 42,
    type: 'euint32'
  });

  return encrypted.handle.toString();
}
```

## Running Examples

### Next.js Example

```bash
cd examples/nextjs
npm install
npm run dev
```

### Research Data Sharing Example

```bash
cd examples/research-data-sharing
npm install
npm run dev
```

## Best Practices

1. **Always validate inputs** before encryption
2. **Handle errors gracefully** with try-catch blocks
3. **Use appropriate encryption types** for value ranges
4. **Store handles securely** - they're references to encrypted data
5. **Verify permissions** before allowing decryption
6. **Test thoroughly** with various edge cases

## More Examples

Check the `examples/` directory for complete working applications:
- Next.js integration
- Research data sharing platform
- Banking demo
- Medical records system
