"use client"
import { useState } from "react"
import { format } from "date-fns"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"
import { PricePoint } from "@/lib/mock/market-data"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs"

export function PriceChart({ data }: { data: PricePoint[] }) {
  const [timeframe, setTimeframe] = useState("1M")

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-xl glass-panel">
          <p className="text-muted-foreground text-xs mb-1">{format(new Date(label), "MMM d, h:mm a")}</p>
          <p className="text-yes font-bold text-lg">{Math.round(payload[0].value * 100)}¢</p>
          <p className="text-muted-foreground text-xs mt-1">Vol: {payload[0].payload.volume.toLocaleString()}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <Tabs value={timeframe} onValueChange={setTimeframe}>
          <TabsList className="bg-secondary/50">
            {["1H", "1D", "1W", "1M", "ALL"].map((tf) => (
              <TabsTrigger key={tf} value={tf} className="text-xs px-3">
                {tf}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <div className="flex items-center space-x-2 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-yes mr-1.5 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-muted-foreground">YES</span>
          </div>
        </div>
      </div>

      <div className="h-[400px] w-full -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorYes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--yes)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--yes)" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
              tickFormatter={(val) => `${Math.round(val * 100)}¢`}
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 1]}
              ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--muted-foreground)', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area 
              type="monotone" 
              dataKey="probability" 
              stroke="var(--yes)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorYes)" 
              activeDot={{ r: 6, fill: 'var(--yes)', stroke: 'var(--background)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
