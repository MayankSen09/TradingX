"use client"
import { MOCK_PORTFOLIO_METRICS, MOCK_POSITIONS, MOCK_PORTFOLIO_HISTORY } from "@/lib/mock/portfolio-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { format } from "date-fns"
import Link from "next/link"

export default function Portfolio() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
        <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
          Deposit / Withdraw
        </Button>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-panel border-border/50">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Value</p>
            <div className="text-3xl font-bold text-foreground">{formatCurrency(MOCK_PORTFOLIO_METRICS.totalValue)}</div>
          </CardContent>
        </Card>
        <Card className="glass-panel border-border/50">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-1">Unrealized P&L</p>
            <div className="text-3xl font-bold text-success">+{formatCurrency(MOCK_PORTFOLIO_METRICS.unrealizedPnL)}</div>
          </CardContent>
        </Card>
        <Card className="glass-panel border-border/50">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-1">Realized P&L</p>
            <div className="text-3xl font-bold text-success">+{formatCurrency(MOCK_PORTFOLIO_METRICS.realizedPnL)}</div>
          </CardContent>
        </Card>
        <Card className="glass-panel border-border/50">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-1">Available Balance</p>
            <div className="text-3xl font-bold text-foreground">{formatCurrency(MOCK_PORTFOLIO_METRICS.availableBalance)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="glass-panel border-border/50">
        <CardHeader>
          <CardTitle>Performance (30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_PORTFOLIO_HISTORY} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} opacity={0.5} />
                <XAxis 
                  dataKey="time" 
                  tickFormatter={(val) => format(new Date(val), "MMM d")}
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={30}
                />
                <YAxis 
                  tickFormatter={(val) => `$${(val / 1000).toFixed(1)}k`}
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={['auto', 'auto']}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '0.5rem' }}
                  labelFormatter={(label: any) => format(new Date(label), "MMM d, yyyy")}
                  formatter={(value: any) => [formatCurrency(value as number), "Value"]}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--primary)" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: 'var(--primary)', stroke: 'var(--background)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Positions Table */}
      <Card className="glass-panel border-border/50 overflow-hidden">
        <CardHeader>
          <CardTitle>Open Positions</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
              <tr>
                <th className="px-6 py-4 font-medium">Market</th>
                <th className="px-6 py-4 font-medium">Side</th>
                <th className="px-6 py-4 font-medium text-right">Shares</th>
                <th className="px-6 py-4 font-medium text-right">Avg Price</th>
                <th className="px-6 py-4 font-medium text-right">Current</th>
                <th className="px-6 py-4 font-medium text-right">Value</th>
                <th className="px-6 py-4 font-medium text-right">P&L</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_POSITIONS.map((position) => {
                const value = position.shares * position.currentPrice
                const cost = position.shares * position.avgPrice
                const pnl = value - cost
                const isPositive = pnl >= 0

                return (
                  <tr key={position.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/market/${position.marketId}`} className="font-medium hover:text-primary transition-colors line-clamp-1">
                        {position.marketQuestion}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={position.side === "YES" ? "yes" : "no"} className="font-bold">
                        {position.side}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">{position.shares.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-muted-foreground">{Math.round(position.avgPrice * 100)}¢</td>
                    <td className="px-6 py-4 text-right font-medium">{Math.round(position.currentPrice * 100)}¢</td>
                    <td className="px-6 py-4 text-right font-bold text-foreground">{formatCurrency(value)}</td>
                    <td className={`px-6 py-4 text-right font-bold ${isPositive ? 'text-success' : 'text-no'}`}>
                      {isPositive ? '+' : ''}{formatCurrency(pnl)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
