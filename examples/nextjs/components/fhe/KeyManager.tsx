'use client';

import React, { useState, useEffect } from 'react';
import { useFhevmClient } from '@fhevm/sdk/react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const KeyManager: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const client = useFhevmClient();

  const fetchPublicKey = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('/api/keys');
      const data = await response.json();

      if (data.success) {
        setPublicKey(data.publicKey.key);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshKeys = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation: 'refresh' })
      });

      const data = await response.json();

      if (data.success) {
        await fetchPublicKey();
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (client) {
      fetchPublicKey();
    }
  }, [client]);

  return (
    <Card title="Key Management" description="Manage FHE encryption keys" variant="elevated">
      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {publicKey && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Public Key
            </label>
            <div className="p-3 bg-gray-50 rounded-lg font-mono text-xs break-all">
              {publicKey.slice(0, 64)}...
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={fetchPublicKey}
            isLoading={isLoading}
            variant="outline"
            className="flex-1"
          >
            Fetch Key
          </Button>

          <Button
            onClick={refreshKeys}
            isLoading={isLoading}
            variant="secondary"
            className="flex-1"
          >
            Refresh Keys
          </Button>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">About FHE Keys</h4>
          <p className="text-xs text-blue-800">
            FHE uses public keys for encryption. The same encrypted value can be
            used in computations without revealing the underlying data.
          </p>
        </div>
      </div>
    </Card>
  );
};
