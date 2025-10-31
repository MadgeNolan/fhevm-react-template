'use client';

import React, { useState } from 'react';
import { useEncryption } from '../../hooks/useEncryption';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';

export const BankingExample: React.FC = () => {
  const [balance, setBalance] = useState<string>('1000');
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const { encryptValue, result, error, isLoading } = useEncryption();

  const handleTransfer = async () => {
    try {
      if (!transferAmount || !recipient) {
        alert('Please enter transfer amount and recipient');
        return;
      }

      const amount = parseInt(transferAmount);
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
      }

      // Encrypt the transfer amount
      const encrypted = await encryptValue(amount, 'euint32');

      // In a real application, you would:
      // 1. Submit encrypted amount to smart contract
      // 2. Contract performs encrypted balance checks
      // 3. Contract updates encrypted balances
      // 4. User can decrypt their balance with their private key

      alert(`Transfer initiated!\nEncrypted Amount Handle: ${encrypted.handle.toString()}\nRecipient: ${recipient}`);
    } catch (err: any) {
      alert(`Transfer failed: ${err.message}`);
    }
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <h3 className="text-xl font-bold text-gray-900">Private Banking</h3>
        <p className="text-sm text-gray-600 mt-1">
          Transfer funds with complete privacy using FHE
        </p>
      </CardHeader>

      <CardBody>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600 mb-1">Your Balance (Encrypted)</div>
            <div className="text-2xl font-bold text-blue-900">{balance} ETH</div>
            <div className="text-xs text-blue-500 mt-1">
              Only you can see your real balance
            </div>
          </div>

          <Input
            type="text"
            label="Recipient Address"
            placeholder="0x..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />

          <Input
            type="number"
            label="Transfer Amount (ETH)"
            placeholder="Enter amount"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {result && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                Amount encrypted successfully!
              </p>
              <p className="text-xs text-green-600 mt-1 font-mono break-all">
                Handle: {result.handle.toString()}
              </p>
            </div>
          )}
        </div>
      </CardBody>

      <CardFooter>
        <Button
          onClick={handleTransfer}
          isLoading={isLoading}
          className="w-full"
        >
          Send Private Transfer
        </Button>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Privacy Features:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Transfer amounts are encrypted</li>
            <li>• Balances remain private on-chain</li>
            <li>• Only authorized parties can decrypt</li>
            <li>• Computation happens on encrypted data</li>
          </ul>
        </div>
      </CardFooter>
    </Card>
  );
};
