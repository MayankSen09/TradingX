export type Outcome = 'YES' | 'NO';
export type MarketStatus = 'OPEN' | 'TRADING' | 'RESOLVING' | 'CLOSED' | 'CLAIMABLE';

export interface Market {
  id: string;
  question: string;
  description: string;
  category: string;
  outcomes: Outcome[];
  endTime: string;
  resolutionTime?: string;
  creator: string;
  collateralToken: string;
  status: MarketStatus;
  probability: number;
  volume: number;
  liquidity: number;
  resolutionSource: string;
  resolutionCriteria: string;
}

export interface Trade {
  id: string;
  time: string;
  side: Outcome;
  price: number;
  amount: number;
}

export interface OrderBookLevel {
  price: number;
  shares: number;
  total: number;
}

export interface PricePoint {
  time: string;
  probability: number;
  volume: number;
}

export const MOCK_MARKETS: Market[] = [
  {
    id: "m1",
    question: "Will BTC trade above $150K before March 2027?",
    description: "This market resolves to YES if the price of Bitcoin (BTC) is strictly greater than $150,000.00 at any point before March 1, 2027, 00:00:00 UTC. Otherwise, it resolves to NO.",
    category: "Crypto",
    outcomes: ['YES', 'NO'],
    endTime: "2027-02-28T23:59:59Z",
    creator: "0x1234...5678",
    collateralToken: "USDC",
    status: 'TRADING',
    probability: 0.64,
    volume: 8400000,
    liquidity: 1200000,
    resolutionSource: "CoinGecko BTC/USD",
    resolutionCriteria: "YES if BTC reaches or exceeds $150,000 before the deadline. NO otherwise."
  },
  {
    id: "m2",
    question: "Will ETH ETF inflows exceed $5B this month?",
    description: "Resolves to YES if net inflows into US Spot Ethereum ETFs surpass $5,000,000,000 in the current calendar month.",
    category: "Crypto",
    outcomes: ['YES', 'NO'],
    endTime: "2026-09-30T23:59:59Z",
    creator: "0x8765...4321",
    collateralToken: "USDC",
    status: 'TRADING',
    probability: 0.42,
    volume: 3200000,
    liquidity: 850000,
    resolutionSource: "Bloomberg ETF Data",
    resolutionCriteria: "Based on official net inflow data reported by major financial data providers."
  },
  {
    id: "m3",
    question: "Will the Fed cut rates at the next meeting?",
    description: "This market asks whether the Federal Open Market Committee (FOMC) will announce a target federal funds rate lower than the current rate at the conclusion of their next scheduled meeting.",
    category: "Finance",
    outcomes: ['YES', 'NO'],
    endTime: "2026-11-04T18:00:00Z",
    creator: "0xabcd...ef01",
    collateralToken: "USDC",
    status: 'TRADING',
    probability: 0.78,
    volume: 15600000,
    liquidity: 3400000,
    resolutionSource: "Federal Reserve Official Press Release",
    resolutionCriteria: "YES if the stated target rate or target range is reduced."
  },
  {
    id: "m4",
    question: "Will Team A win the 2026 championship?",
    description: "Resolves to YES if Team A wins the final match of the 2026 championship.",
    category: "Sports",
    outcomes: ['YES', 'NO'],
    endTime: "2026-12-15T23:59:59Z",
    creator: "0x1122...3344",
    collateralToken: "USDC",
    status: 'OPEN',
    probability: 0.35,
    volume: 520000,
    liquidity: 110000,
    resolutionSource: "Official League Results",
    resolutionCriteria: "YES if Team A is the official champion."
  }
];

export const generateMockPriceHistory = (days: number, currentProb: number): PricePoint[] => {
  const data: PricePoint[] = [];
  const now = new Date();
  let current = currentProb;
  
  for (let i = days; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    // Add some random walk noise
    current = Math.max(0.01, Math.min(0.99, current + (Math.random() - 0.5) * 0.1));
    data.push({
      time: time.toISOString(),
      probability: Number(current.toFixed(2)),
      volume: Math.floor(Math.random() * 50000) + 10000
    });
  }
  
  // Ensure the last point matches the current probability exactly
  data[data.length - 1].probability = currentProb;
  return data;
};

export const getMockOrderBook = (currentProb: number) => {
  const yesProb = Math.round(currentProb * 100);
  
  const asks: OrderBookLevel[] = [
    { price: yesProb + 1, shares: 2450, total: (yesProb + 1) * 24.5 },
    { price: yesProb + 2, shares: 1840, total: (yesProb + 2) * 18.4 },
    { price: yesProb + 3, shares: 3200, total: (yesProb + 3) * 32.0 },
  ];
  
  const bids: OrderBookLevel[] = [
    { price: yesProb - 1, shares: 1500, total: (yesProb - 1) * 15.0 },
    { price: yesProb - 2, shares: 4200, total: (yesProb - 2) * 42.0 },
    { price: yesProb - 3, shares: 1200, total: (yesProb - 3) * 12.0 },
  ];
  
  return { bids, asks };
};

export const MOCK_RECENT_TRADES: Trade[] = [
  { id: "t1", time: new Date(Date.now() - 120000).toISOString(), side: 'YES', price: 0.64, amount: 420 },
  { id: "t2", time: new Date(Date.now() - 180000).toISOString(), side: 'NO', price: 0.36, amount: 180 },
  { id: "t3", time: new Date(Date.now() - 400000).toISOString(), side: 'YES', price: 0.63, amount: 1250 },
  { id: "t4", time: new Date(Date.now() - 800000).toISOString(), side: 'YES', price: 0.63, amount: 800 },
  { id: "t5", time: new Date(Date.now() - 1200000).toISOString(), side: 'NO', price: 0.37, amount: 350 },
];
