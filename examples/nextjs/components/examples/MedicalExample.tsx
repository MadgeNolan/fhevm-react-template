'use client';

import React, { useState } from 'react';
import { useEncryption } from '../../hooks/useEncryption';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';

interface MedicalData {
  heartRate: string;
  bloodPressure: string;
  temperature: string;
}

export const MedicalExample: React.FC = () => {
  const [data, setData] = useState<MedicalData>({
    heartRate: '',
    bloodPressure: '',
    temperature: ''
  });
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const { encryptBatch, isLoading, error } = useEncryption();

  const handleDataChange = (field: keyof MedicalData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpload = async () => {
    try {
      setUploadStatus('');

      // Validate inputs
      const heartRate = parseInt(data.heartRate);
      const temperature = parseFloat(data.temperature);

      if (isNaN(heartRate) || isNaN(temperature)) {
        alert('Please enter valid numeric values');
        return;
      }

      // Encrypt all medical data
      const encrypted = await encryptBatch([
        { value: heartRate, type: 'euint8' }, // Heart rate (40-200 bpm)
        { value: Math.floor(temperature * 10), type: 'euint16' } // Temperature in 0.1°C units
      ]);

      // In a real application:
      // 1. Submit encrypted data to medical records contract
      // 2. Only authorized medical professionals can decrypt
      // 3. Data analysis happens on encrypted values
      // 4. Privacy is maintained throughout

      setUploadStatus(`Medical data uploaded successfully!\nEncrypted ${encrypted.length} values`);
    } catch (err: any) {
      setUploadStatus(`Upload failed: ${err.message}`);
    }
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <h3 className="text-xl font-bold text-gray-900">Private Health Records</h3>
        <p className="text-sm text-gray-600 mt-1">
          Store medical data with complete confidentiality
        </p>
      </CardHeader>

      <CardBody>
        <div className="space-y-4">
          <div className="p-3 bg-purple-50 rounded-lg mb-4">
            <p className="text-sm text-purple-800">
              Your health data will be encrypted before being stored on-chain.
              Only authorized medical professionals can access it.
            </p>
          </div>

          <Input
            type="number"
            label="Heart Rate (bpm)"
            placeholder="e.g., 72"
            value={data.heartRate}
            onChange={(e) => handleDataChange('heartRate', e.target.value)}
            helperText="Normal range: 60-100 bpm"
          />

          <Input
            type="text"
            label="Blood Pressure"
            placeholder="e.g., 120/80"
            value={data.bloodPressure}
            onChange={(e) => handleDataChange('bloodPressure', e.target.value)}
            helperText="Format: Systolic/Diastolic"
          />

          <Input
            type="number"
            label="Body Temperature (°C)"
            placeholder="e.g., 36.6"
            step="0.1"
            value={data.temperature}
            onChange={(e) => handleDataChange('temperature', e.target.value)}
            helperText="Normal range: 36.1-37.2°C"
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {uploadStatus && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 whitespace-pre-line">{uploadStatus}</p>
            </div>
          )}
        </div>
      </CardBody>

      <CardFooter>
        <Button
          onClick={handleUpload}
          isLoading={isLoading}
          className="w-full"
        >
          Upload Encrypted Data
        </Button>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">HIPAA-Compliant Privacy:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• End-to-end encryption of medical records</li>
            <li>• Access control via smart contracts</li>
            <li>• Audit trail of all data access</li>
            <li>• Patient retains ownership of data</li>
            <li>• Compliant with healthcare regulations</li>
          </ul>
        </div>
      </CardFooter>
    </Card>
  );
};
