'use client';

import React, { useState } from 'react';
import { useEncrypt, useFhevmClient } from '@fhevm/sdk/react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export const ComputationDemo: React.FC = () => {
  const [valueA, setValueA] = useState<string>('');
  const [valueB, setValueB] = useState<string>('');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply'>('add');
  const [result, setResult] = useState<string>('');
  const [isComputing, setIsComputing] = useState(false);
  const { encrypt } = useEncrypt();
  const client = useFhevmClient();

  const handleCompute = async () => {
    try {
      setIsComputing(true);
      if (!valueA || !valueB) {
        setResult('Please enter both values');
        return;
      }

      const numA = parseInt(valueA);
      const numB = parseInt(valueB);

      if (isNaN(numA) || isNaN(numB)) {
        setResult('Please enter valid numbers');
        return;
      }

      // Encrypt both values
      const encryptedA = await encrypt(numA, 'euint32');
      const encryptedB = await encrypt(numB, 'euint32');

      // Perform computation via API
      const response = await fetch('/api/fhe/compute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation,
          operands: [encryptedA.handle.toString(), encryptedB.handle.toString()]
        })
      });

      const data = await response.json();

      if (data.success) {
        setResult(`Computation successful!\nOperation: ${operation}\nResult Handle: ${data.result.handle}`);
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsComputing(false);
    }
  };

  return (
    <Card title="Homomorphic Computation" description="Perform calculations on encrypted data" variant="elevated">
      <div className="space-y-4">
        <Input
          type="number"
          label="First Value"
          placeholder="Enter first number"
          value={valueA}
          onChange={(e) => setValueA(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Operation
          </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="add">Addition (+)</option>
            <option value="subtract">Subtraction (-)</option>
            <option value="multiply">Multiplication (×)</option>
          </select>
        </div>

        <Input
          type="number"
          label="Second Value"
          placeholder="Enter second number"
          value={valueB}
          onChange={(e) => setValueB(e.target.value)}
        />

        <Button
          onClick={handleCompute}
          isLoading={isComputing}
          className="w-full"
        >
          Compute
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
