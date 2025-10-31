export function sanitizeInput(input: string): string {
  return input.replace(/[<>'"]/g, '');
}

export function validateAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function validateChainId(chainId: number): boolean {
  const validChainIds = [1, 3, 4, 5, 42, 11155111]; // Mainnet and common testnets
  return validChainIds.includes(chainId);
}

export function validateEncryptionType(type: string): boolean {
  const validTypes = ['euint8', 'euint16', 'euint32', 'euint64'];
  return validTypes.includes(type);
}

export function validateNumericValue(value: any, type: string): boolean {
  const num = typeof value === 'bigint' ? value : BigInt(value);

  switch (type) {
    case 'euint8':
      return num >= 0n && num <= 255n;
    case 'euint16':
      return num >= 0n && num <= 65535n;
    case 'euint32':
      return num >= 0n && num <= 4294967295n;
    case 'euint64':
      return num >= 0n && num <= 18446744073709551615n;
    default:
      return false;
  }
}

export function isValidHandle(handle: any): boolean {
  try {
    const bigIntHandle = typeof handle === 'bigint' ? handle : BigInt(handle);
    return bigIntHandle > 0n;
  } catch {
    return false;
  }
}

export function secureRandom(min: number, max: number): number {
  const range = max - min;
  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  return min + (randomBuffer[0] % range);
}
