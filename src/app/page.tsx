import { MOCK_MARKETS } from "@/lib/mock/market-data"
import { MarketCard } from "@/components/markets/MarketCard"
import { Search, TrendingUp, Clock, Zap } from "lucide-react"

export default function Home() {
  const trendingMarkets = MOCK_MARKETS.slice(0, 2)
  const allMarkets = MOCK_MARKETS

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-secondary border border-border p-8 md:p-12 lg:p-16 flex flex-col items-start justify-center min-h-[300px]">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-accent/10 rounded-full blur-[80px]"></div>
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            Trade on what <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">happens next.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Turn your conviction about the future into a position. The most accurate, transparent, and decentralized prediction market.
          </p>
          
          <div className="relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input 
              type="text" 
              placeholder="Search markets..." 
              className="w-full h-14 pl-12 pr-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary shadow-lg text-lg"
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section>
        <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
          {["All", "Crypto", "Politics", "Sports", "Technology", "Finance", "World", "Culture"].map((category, i) => (
            <button 
              key={category} 
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                i === 0 
                  ? "bg-foreground text-background" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Trending Markets */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="text-primary" size={24} />
          <h2 className="text-2xl font-bold">Trending Markets</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trendingMarkets.map(market => (
            <div key={market.id} className="h-[280px]">
              <MarketCard market={market} />
            </div>
          ))}
        </div>
      </section>

      {/* All Markets Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Zap className="text-accent" size={24} />
            <h2 className="text-2xl font-bold">Active Markets</h2>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span className="flex items-center cursor-pointer hover:text-foreground">
              <Clock size={16} className="mr-1" /> Sort by: Volume
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {allMarkets.map(market => (
            <div key={market.id} className="h-[280px]">
              <MarketCard market={market} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
