"use client"
import { Search, Bell, Wallet as WalletIcon } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { WalletModal } from "@/components/wallet/WalletModal"
import { useMockWallet, useMockBalance } from "@/lib/web3/hooks"
import { useState } from "react"

export function TopBar() {
  const { isConnected, address, disconnect } = useMockWallet()
  const { balance, symbol } = useMockBalance()
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

  return (
    <>
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6">
        <div className="flex-1 max-w-md hidden md:flex items-center relative">
          <Search className="absolute left-3 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search markets, categories..." 
            className="pl-10 bg-secondary/50 border-transparent focus-visible:bg-secondary focus-visible:ring-primary/50" 
          />
        </div>
        
        <div className="flex items-center space-x-4 ml-auto">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
          </Button>

          <div className="hidden sm:flex items-center px-3 py-1.5 rounded-md bg-secondary/50 border border-border">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            <span className="text-xs font-medium text-muted-foreground">Polygon</span>
          </div>

          {isConnected ? (
            <div className="flex items-center space-x-2 bg-secondary/50 p-1 pl-3 rounded-md border border-border">
              <div className="flex flex-col text-right">
                <span className="text-xs font-bold leading-none text-foreground">
                  {balance?.toLocaleString()} {symbol}
                </span>
                <span className="text-[10px] text-muted-foreground mt-0.5">{address}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={disconnect} className="h-8 px-2 text-muted-foreground hover:text-destructive">
                Disconnect
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsWalletModalOpen(true)} className="shadow-sm">
              <WalletIcon size={16} className="mr-2" />
              Connect Wallet
            </Button>
          )}
        </div>
      </header>
      
      <WalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
    </>
  )
}
