import { MOCK_MARKETS, MOCK_RECENT_TRADES, generateMockPriceHistory } from "@/lib/mock/market-data"
import { TradingPanel } from "@/components/trading/TradingPanel"
import { OrderBook } from "@/components/trading/OrderBook"
import { RecentTrades } from "@/components/trading/RecentTrades"
import { PriceChart } from "@/components/trading/PriceChart"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { format } from "date-fns"
import { ArrowLeft, ExternalLink, Info, Activity } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function MarketDetail({ params }: { params: { id: string } }) {
  const market = MOCK_MARKETS.find(m => m.id === params.id)
  
  if (!market) {
    // If not found in mock, fallback to the first one just for the demo
    return notFound()
  }

  const priceHistory = generateMockPriceHistory(30, market.probability)
  const isYesProb = Math.round(market.probability * 100)

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} className="mr-2" />
        Back to Markets
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content (Left / Center) */}
        <div className="flex-1 space-y-6 min-w-0">
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="secondary" className="bg-secondary/80 uppercase tracking-wider">{market.category}</Badge>
            <Badge variant="outline" className="border-border text-muted-foreground flex items-center">
              <Activity size={12} className="mr-1" />
              Vol: ${(market.volume / 1000000).toFixed(1)}M
            </Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {market.question}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm mt-4">
            <div className="flex items-center text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-md border border-border/50">
              <span className="mr-2">Resolves:</span>
              <span className="text-foreground font-medium">{format(new Date(market.endTime), "MMM d, yyyy")}</span>
            </div>
            <div className="flex items-center text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-md border border-border/50">
              <span className="mr-2">Oracle:</span>
              <span className="text-primary font-medium flex items-center hover:underline cursor-pointer">
                {market.resolutionSource}
                <ExternalLink size={12} className="ml-1" />
              </span>
            </div>
          </div>

          {/* Chart Section */}
          <Card className="mt-8 overflow-hidden border-border/50 bg-card/40">
            <CardContent className="p-6">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Probability</p>
                  <div className="text-4xl font-bold text-yes drop-shadow-sm">
                    {isYesProb}%
                  </div>
                </div>
              </div>
              <PriceChart data={priceHistory} />
            </CardContent>
          </Card>

          {/* Details & Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="border-border/50 bg-card/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Info size={18} className="mr-2 text-primary" />
                  Resolution Rules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>{market.description}</p>
                  <div className="p-3 bg-secondary/50 rounded-lg border border-border/50 text-foreground">
                    <span className="font-semibold text-primary">Criteria:</span> {market.resolutionCriteria}
                  </div>
                  <p className="text-xs italic opacity-80 mt-4">
                    Prediction markets involve financial risk. Prices represent market-implied probabilities and are not guaranteed predictions.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {/* Order Book */}
              <Card className="border-border/50 bg-card/40">
                <CardHeader className="pb-3 border-b border-border/30">
                  <CardTitle className="text-lg">Order Book</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <OrderBook probability={market.probability} />
                </CardContent>
              </Card>

              {/* Recent Trades */}
              <Card className="border-border/50 bg-card/40">
                <CardHeader className="pb-3 border-b border-border/30">
                  <CardTitle className="text-lg">Recent Trades</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <RecentTrades trades={MOCK_RECENT_TRADES} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Trading Panel (Right) */}
        <div className="lg:w-[400px] flex-shrink-0">
          <TradingPanel market={market} />
        </div>
      </div>
    </div>
  )
}
