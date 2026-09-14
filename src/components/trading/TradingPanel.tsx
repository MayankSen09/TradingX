"use client"

import { useState } from "react"
import { Market } from "@/lib/mock/market-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"
import { Input } from "@/components/ui/Input"
import { Modal } from "@/components/ui/Modal"

export function TradingPanel({ market }: { market: Market }) {
  const [side, setSide] = useState<"BUY" | "SELL">("BUY")
  const [outcome, setOutcome] = useState<"YES" | "NO">("YES")
  const [amountStr, setAmountStr] = useState("100")
  const [isConfirming, setIsConfirming] = useState(false)

  const isYesProb = Math.round(market.probability * 100)
  const isNoProb = 100 - isYesProb

  const price = outcome === "YES" ? isYesProb : isNoProb
  const amount = parseFloat(amountStr) || 0
  
  // Basic AMM math mock
  const estimatedShares = amount > 0 ? (amount / (price / 100)).toFixed(2) : "0.00"
  const potentialPayout = amount > 0 ? (parseFloat(estimatedShares) * 1).toFixed(2) : "0.00"
  const potentialProfit = amount > 0 ? (parseFloat(potentialPayout) - amount).toFixed(2) : "0.00"

  const handleTrade = () => {
    setIsConfirming(true)
  }

  const confirmTrade = () => {
    setIsConfirming(false)
    // In a real app, this would trigger a web3 transaction
    alert("Trade executed (Mock)!")
  }

  return (
    <>
      <Card className="w-full glass-panel sticky top-24">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Trade</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={side} onValueChange={(v) => setSide(v as "BUY" | "SELL")} className="mb-6">
            <TabsList className="w-full bg-secondary/50">
              <TabsTrigger value="BUY" className="w-1/2 data-[state=active]:bg-background">Buy</TabsTrigger>
              <TabsTrigger value="SELL" className="w-1/2 data-[state=active]:bg-background">Sell</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex space-x-3 mb-6">
            <Button 
              variant={outcome === "YES" ? "yes" : "outline"} 
              className={`flex-1 h-14 border-border ${outcome === "YES" ? '' : 'bg-secondary/30 hover:bg-yes/10 hover:text-yes hover:border-yes/50'}`}
              onClick={() => setOutcome("YES")}
            >
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg leading-tight">YES</span>
                <span className="text-xs font-normal opacity-80">{isYesProb}¢</span>
              </div>
            </Button>
            <Button 
              variant={outcome === "NO" ? "no" : "outline"} 
              className={`flex-1 h-14 border-border ${outcome === "NO" ? '' : 'bg-secondary/30 hover:bg-no/10 hover:text-no hover:border-no/50'}`}
              onClick={() => setOutcome("NO")}
            >
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg leading-tight">NO</span>
                <span className="text-xs font-normal opacity-80">{isNoProb}¢</span>
              </div>
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="text-muted-foreground">Balance: $4,280.00</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input 
                  type="number" 
                  value={amountStr} 
                  onChange={(e) => setAmountStr(e.target.value)}
                  className="pl-7 bg-background border-border h-12 text-lg font-medium"
                  placeholder="0.00"
                />
              </div>
              <div className="flex space-x-2 mt-2">
                {[10, 50, 100, 500].map(val => (
                  <Button 
                    key={val} 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 bg-secondary/30 border-border h-8 text-xs hover:bg-secondary"
                    onClick={() => setAmountStr(val.toString())}
                  >
                    ${val}
                  </Button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Shares</span>
                <span className="font-medium text-foreground">{estimatedShares}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Potential Return</span>
                <span className="font-medium text-success">${potentialPayout}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fees</span>
                <span className="font-medium text-foreground">$0.00</span>
              </div>
            </div>

            <Button 
              className={`w-full h-12 text-lg font-bold mt-6 shadow-sm`}
              onClick={handleTrade}
              disabled={amount <= 0}
            >
              {side} {outcome}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isConfirming} onClose={() => setIsConfirming(false)} title="Confirm Order">
        <div className="space-y-4 pb-4">
          <div className="p-4 bg-secondary/50 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{market.question}</h3>
            <div className="flex items-center space-x-2 text-sm">
              <span className={`font-bold ${outcome === "YES" ? "text-yes" : "text-no"}`}>{side} {outcome}</span>
              <span className="text-muted-foreground">@ {price}¢</span>
            </div>
          </div>
          
          <div className="space-y-3 p-4 bg-background rounded-lg border border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Cost</span>
              <span className="font-bold text-foreground">${amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Est. Shares Received</span>
              <span className="font-bold text-foreground">{estimatedShares}</span>
            </div>
            <div className="flex justify-between text-sm pt-3 border-t border-border">
              <span className="text-muted-foreground">Potential Profit</span>
              <span className="font-bold text-success">+${potentialProfit}</span>
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full h-12" onClick={confirmTrade}>
              Confirm {side} {outcome}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
