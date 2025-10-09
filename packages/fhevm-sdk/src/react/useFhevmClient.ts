/**
 * Hook to access FHEVM client
 */

import { useFhevmContext } from './FhevmProvider';
import type { FhevmClient } from '../core/types';

/**
 * Access the FHEVM client instance
 *
 * @returns FHEVM client or null if not initialized
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const client = useFhevmClient();
 *
 *   if (!client) return <div>Loading...</div>;
 *
 *   return <div>Connected!</div>;
 * }
 * ```
 */
export function useFhevmClient(): FhevmClient | null {
  const { client } = useFhevmContext();
  return client;
}
