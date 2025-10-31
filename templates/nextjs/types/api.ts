export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface EncryptAPIRequest {
  value: number | bigint;
  type: 'euint8' | 'euint16' | 'euint32' | 'euint64';
}

export interface EncryptAPIResponse {
  encrypted: {
    handle: string;
    type: string;
  };
}

export interface DecryptAPIRequest {
  handle: string;
  userAddress?: string;
}

export interface DecryptAPIResponse {
  decrypted: {
    value: string;
  };
}

export interface ComputeAPIRequest {
  operation: 'add' | 'subtract' | 'multiply';
  operands: string[];
  contractMethod?: string;
}

export interface ComputeAPIResponse {
  result: {
    handle: string;
    operation: string;
  };
}

export interface KeysAPIResponse {
  publicKey: {
    key: string;
    address: string;
  };
}
