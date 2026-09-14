import Link from "next/link"
import { LayoutDashboard, TrendingUp, PlusCircle, Activity, Briefcase } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-bold text-xl">P</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">PredictEx</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <Link href="/" className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
          <LayoutDashboard size={20} />
          <span>Markets</span>
        </Link>
        <Link href="/" className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
          <TrendingUp size={20} />
          <span>Trending</span>
        </Link>
        <Link href="/portfolio" className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
          <Briefcase size={20} />
          <span>Portfolio</span>
        </Link>
        <Link href="/" className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
          <Activity size={20} />
          <span>Activity</span>
        </Link>
        <div className="pt-4 pb-2">
          <div className="border-t border-border" />
        </div>
        <Link href="/create" className="flex items-center space-x-3 px-3 py-2 rounded-md text-primary hover:bg-primary/10 transition-colors font-medium">
          <PlusCircle size={20} />
          <span>Create Market</span>
        </Link>
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Settings</Link>
          <Link href="/" className="hover:text-foreground">Help & Support</Link>
        </div>
      </div>
    </aside>
  )
}
