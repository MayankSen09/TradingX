"use client"
import { getMockOrderBook } from "@/lib/mock/market-data"

export function OrderBook({ probability }: { probability: number }) {
  const { bids, asks } = getMockOrderBook(probability)
  
  return (
    <div className="w-full text-sm">
      <div className="flex justify-between text-muted-foreground pb-2 border-b border-border/50 text-xs uppercase tracking-wider mb-2">
        <span className="w-1/3">Price</span>
        <span className="w-1/3 text-right">Shares</span>
        <span className="w-1/3 text-right">Total ($)</span>
      </div>
      
      {/* Asks (Sell Orders - NO side usually grouped but here we show order book for YES) */}
      <div className="space-y-1 mb-4 flex flex-col-reverse">
        {asks.map((ask, i) => (
          <div key={`ask-${i}`} className="flex justify-between relative py-1 hover:bg-no/10 group cursor-pointer">
            {/* Depth bar visualization */}
            <div 
              className="absolute right-0 top-0 bottom-0 bg-no/10 z-0 group-hover:bg-no/20 transition-colors" 
              style={{ width: `${Math.min(100, ask.shares / 50)}%` }}
            />
            <span className="w-1/3 text-no font-medium relative z-10">{ask.price}¢</span>
            <span className="w-1/3 text-right text-foreground relative z-10">{ask.shares.toLocaleString()}</span>
            <span className="w-1/3 text-right text-foreground relative z-10">{ask.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        ))}
      </div>
      
      {/* Spread indicator */}
      <div className="flex justify-between items-center py-2 border-y border-border/50 text-muted-foreground text-xs my-2">
        <span>Spread</span>
        <span className="font-medium bg-secondary px-2 py-0.5 rounded">{asks[0].price - bids[0].price}¢</span>
      </div>
      
      {/* Bids (Buy Orders) */}
      <div className="space-y-1">
        {bids.map((bid, i) => (
          <div key={`bid-${i}`} className="flex justify-between relative py-1 hover:bg-yes/10 group cursor-pointer">
            <div 
              className="absolute right-0 top-0 bottom-0 bg-yes/10 z-0 group-hover:bg-yes/20 transition-colors" 
              style={{ width: `${Math.min(100, bid.shares / 50)}%` }}
            />
            <span className="w-1/3 text-yes font-medium relative z-10">{bid.price}¢</span>
            <span className="w-1/3 text-right text-foreground relative z-10">{bid.shares.toLocaleString()}</span>
            <span className="w-1/3 text-right text-foreground relative z-10">{bid.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
