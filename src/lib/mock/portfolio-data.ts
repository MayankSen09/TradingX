export interface PortfolioMetrics {
  totalValue: number;
  unrealizedPnL: number;
  realizedPnL: number;
  availableBalance: number;
}

export interface Position {
  id: string;
  marketId: string;
  marketQuestion: string;
  side: 'YES' | 'NO';
  shares: number;
  avgPrice: number;
  currentPrice: number;
  status: 'OPEN' | 'CLOSED' | 'CLAIMABLE';
}

export const MOCK_PORTFOLIO_METRICS: PortfolioMetrics = {
  totalValue: 12480.50,
  unrealizedPnL: 1240.25,
  realizedPnL: 840.00,
  availableBalance: 4280.00,
};

export const MOCK_POSITIONS: Position[] = [
  {
    id: "p1",
    marketId: "m1",
    marketQuestion: "Will BTC trade above $150K before March 2027?",
    side: 'YES',
    shares: 1000,
    avgPrice: 0.52,
    currentPrice: 0.64,
    status: 'OPEN'
  },
  {
    id: "p2",
    marketId: "m3",
    marketQuestion: "Will the Fed cut rates at the next meeting?",
    side: 'YES',
    shares: 2500,
    avgPrice: 0.65,
    currentPrice: 0.78,
    status: 'OPEN'
  },
  {
    id: "p3",
    marketId: "m2",
    marketQuestion: "Will ETH ETF inflows exceed $5B this month?",
    side: 'NO',
    shares: 500,
    avgPrice: 0.40,
    currentPrice: 0.58,
    status: 'OPEN'
  }
];

export const MOCK_PORTFOLIO_HISTORY = Array.from({ length: 30 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    time: date.toISOString(),
    value: 10000 + (Math.sin(i / 5) * 1000) + (i * 50) + (Math.random() * 200 - 100)
  };
});
