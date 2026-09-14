"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { CalendarIcon, Link as LinkIcon, HelpCircle } from "lucide-react"

export default function CreateMarket() {
  const [question, setQuestion] = useState("")
  const [category, setCategory] = useState("Crypto")
  const [source, setSource] = useState("")

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Create Market</h1>
        <p className="text-muted-foreground">Propose a new prediction market to the community.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-panel border-border/50">
            <CardHeader>
              <CardTitle>Market Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Question</label>
                <Input 
                  placeholder="e.g. Will BTC exceed $150,000 before January 1, 2027?" 
                  className="bg-secondary/30"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Category</label>
                <div className="flex flex-wrap gap-2">
                  {["Crypto", "Politics", "Sports", "Technology", "Finance", "World", "Culture"].map(cat => (
                    <Badge 
                      key={cat} 
                      variant={category === cat ? "default" : "outline"}
                      className={`cursor-pointer px-3 py-1 ${category === cat ? "bg-primary text-primary-foreground border-transparent" : "hover:bg-secondary border-border"}`}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description & Rules</label>
                <textarea 
                  className="flex w-full rounded-md border border-border bg-secondary/30 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[120px]"
                  placeholder="Clearly define how the market will be resolved, what edge cases might occur, and any other relevant rules..."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-border/50">
            <CardHeader>
              <CardTitle>Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Resolution Date</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input type="date" className="pl-10 bg-secondary/30" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Resolution Source (Oracle)</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input 
                      placeholder="e.g. CoinGecko API" 
                      className="pl-10 bg-secondary/30"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-border/50">
            <CardHeader>
              <CardTitle>Initial Liquidity</CardTitle>
              <CardDescription>Provide initial liquidity to start the market.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Amount (USDC)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input type="number" placeholder="1000.00" className="pl-8 bg-secondary/30" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Minimum 500 USDC required to create a market.</p>
              </div>
              <Button className="w-full mt-4 h-12 shadow-sm">
                Create Market
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview Sidebar */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg flex items-center">
            <HelpCircle size={18} className="mr-2 text-primary" />
            Market Preview
          </h3>
          
          <Card className="border-primary/30 shadow-xl bg-card/80">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="secondary" className="text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/80">
                  {category}
                </Badge>
              </div>
              
              <h3 className="font-semibold text-foreground text-base leading-snug mb-6">
                {question || "Market question will appear here..."}
              </h3>
              
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] text-muted-foreground font-medium mb-1">YES</span>
                    <div className="bg-yes/10 text-yes border border-yes/20 rounded font-bold px-3 py-1 inline-flex items-center justify-center">
                      50¢
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] text-muted-foreground font-medium mb-1">NO</span>
                    <div className="bg-no/10 text-no border border-no/20 rounded font-bold px-3 py-1 inline-flex items-center justify-center">
                      50¢
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground font-medium border-t border-border/50 pt-3 mt-4">
                  <span>Vol: $0.00</span>
                  <span>Source: {source || "TBD"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-sm text-primary-foreground/90">
            <h4 className="font-bold mb-2 text-primary flex items-center">Guidelines</h4>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Questions must be objectively verifiable.</li>
              <li>Include strict resolution criteria.</li>
              <li>Avoid subjective or opinion-based conditions.</li>
              <li>Creators earn a percentage of market trading fees.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
