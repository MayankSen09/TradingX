"use client"
import { format } from "date-fns"
import { Trade } from "@/lib/mock/market-data"

export function RecentTrades({ trades }: { trades: Trade[] }) {
  return (
    <div className="w-full text-sm">
      <div className="flex justify-between text-muted-foreground pb-2 border-b border-border/50 text-xs uppercase tracking-wider mb-2">
        <span className="w-1/4">Time</span>
        <span className="w-1/4">Side</span>
        <span className="w-1/4 text-right">Price</span>
        <span className="w-1/4 text-right">Amount ($)</span>
      </div>
      
      <div className="space-y-1">
        {trades.map((trade) => (
          <div key={trade.id} className="flex justify-between py-1.5 border-b border-border/20 last:border-0 hover:bg-secondary/30">
            <span className="w-1/4 text-muted-foreground">{format(new Date(trade.time), "HH:mm:ss")}</span>
            <span className={`w-1/4 font-medium ${trade.side === "YES" ? "text-yes" : "text-no"}`}>
              {trade.side}
            </span>
            <span className="w-1/4 text-right text-foreground">{Math.round(trade.price * 100)}¢</span>
            <span className="w-1/4 text-right text-foreground">{trade.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
