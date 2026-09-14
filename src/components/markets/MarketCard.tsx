"use client"
import Link from "next/link"
import { Market } from "@/lib/mock/market-data"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { generateMockPriceHistory } from "@/lib/mock/market-data"
import { motion } from "framer-motion"

export function MarketCard({ market }: { market: Market }) {
  const isYesProb = Math.round(market.probability * 100)
  const isNoProb = 100 - isYesProb
  
  // Use a short history for the sparkline (7 days)
  const history = generateMockPriceHistory(7, market.probability)
  
  const formattedVolume = market.volume >= 1000000 
    ? `$${(market.volume / 1000000).toFixed(1)}M` 
    : `$${(market.volume / 1000).toFixed(0)}k`

  const formattedLiquidity = market.liquidity >= 1000000
    ? `$${(market.liquidity / 1000000).toFixed(1)}M`
    : `$${(market.liquidity / 1000).toFixed(0)}k`

  return (
    <Link href={`/market/${market.id}`} className="block h-full">
      <motion.div 
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="h-full"
      >
        <Card className="hover:border-primary/30 transition-colors group h-full flex flex-col cursor-pointer bg-card/60 overflow-hidden relative">
        <CardContent className="p-5 flex-1 flex flex-col relative overflow-hidden">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>

          <div className="flex justify-between items-start mb-3">
            <Badge variant="secondary" className="text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/80">
              {market.category}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-foreground text-base leading-snug line-clamp-3 mb-4 group-hover:text-primary transition-colors flex-1">
            {market.question}
          </h3>
          
          <div className="flex items-end justify-between mt-auto">
            <div className="space-y-3 flex-1 pr-4">
              <div className="flex space-x-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground font-medium mb-1">YES</span>
                  <div className="bg-yes/10 text-yes border border-yes/20 rounded font-bold px-3 py-1 inline-flex items-center shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                    {isYesProb}¢
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground font-medium mb-1">NO</span>
                  <div className="bg-no/10 text-no border border-no/20 rounded font-bold px-3 py-1 inline-flex items-center shadow-[0_0_10px_rgba(244,63,94,0.1)]">
                    {isNoProb}¢
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 text-xs text-muted-foreground font-medium">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground/70 uppercase">Vol</span>
                  <span>{formattedVolume}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground/70 uppercase">Liq</span>
                  <span>{formattedLiquidity}</span>
                </div>
              </div>
            </div>
            
            <div className="w-24 h-16 opacity-60 group-hover:opacity-100 transition-opacity">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <Line 
                    type="monotone" 
                    dataKey="probability" 
                    stroke="var(--yes)" 
                    strokeWidth={2} 
                    dot={false}
                    isAnimationActive={false} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    </Link>
  )
}
