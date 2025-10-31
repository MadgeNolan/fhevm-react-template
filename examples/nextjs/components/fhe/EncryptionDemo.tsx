'use client';

import React, { useState } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export const EncryptionDemo: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [encryptionType, setEncryptionType] = useState<'euint8' | 'euint16' | 'euint32' | 'euint64'>('euint32');
  const [result, setResult] = useState<string>('');
  const { encrypt, isEncrypting } = useEncrypt();

  const handleEncrypt = async () => {
    try {
      if (!value) {
        setResult('Please enter a value to encrypt');
        return;
      }

      const numValue = parseInt(value);
      if (isNaN(numValue)) {
        setResult('Please enter a valid number');
        return;
      }

      const encrypted = await encrypt(numValue, encryptionType);
      setResult(`Encrypted successfully!\nHandle: ${encrypted.handle.toString()}\nType: ${encryptionType}`);
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <Card title="Encryption Demo" description="Encrypt values using FHE" variant="elevated">
      <div className="space-y-4">
        <Input
          type="number"
          label="Value to Encrypt"
          placeholder="Enter a number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Encryption Type
          </label>
          <select
            value={encryptionType}
            onChange={(e) => setEncryptionType(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="euint8">euint8 (0-255)</option>
            <option value="euint16">euint16 (0-65535)</option>
            <option value="euint32">euint32 (0-4294967295)</option>
            <option value="euint64">euint64 (large numbers)</option>
          </select>
        </div>

        <Button
          onClick={handleEncrypt}
          isLoading={isEncrypting}
          className="w-full"
        >
          Encrypt Value
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <pre className="text-sm whitespace-pre-wrap text-gray-800">{result}</pre>
          </div>
        )}
      </div>
    </Card>
  );
};
