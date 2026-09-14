import { useState, useEffect } from 'react';

// Mock hook to simulate wallet connection without requiring an actual wallet extension
export function useMockWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connect = () => {
    setIsConnected(true);
    setAddress('0x71C...976F');
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
  };

  return { isConnected, address, connect, disconnect };
}

// Mock hook to simulate fetching user USDC balance
export function useMockBalance() {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      setBalance(4280.00);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return { balance, symbol: 'USDC' };
}
