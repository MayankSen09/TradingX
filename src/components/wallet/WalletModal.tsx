"use client"
import { Modal } from "@/components/ui/Modal"
import { Button } from "@/components/ui/Button"
import { useMockWallet } from "@/lib/web3/hooks"
import { ExternalLink } from "lucide-react"

export function WalletModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { connect } = useMockWallet()

  const handleConnect = () => {
    connect()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Connect Wallet">
      <div className="flex flex-col space-y-3 pb-4">
        <p className="text-sm text-muted-foreground mb-2">
          Connect your Web3 wallet to start trading on PredictEx.
        </p>
        
        <Button 
          variant="outline" 
          className="justify-between h-14 bg-secondary/30 hover:bg-secondary border-border"
          onClick={handleConnect}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">M</div>
            <span className="font-semibold text-foreground">MetaMask</span>
          </div>
          <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-md">Popular</span>
        </Button>

        <Button 
          variant="outline" 
          className="justify-between h-14 bg-secondary/30 hover:bg-secondary border-border"
          onClick={handleConnect}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold">W</div>
            <span className="font-semibold text-foreground">WalletConnect</span>
          </div>
        </Button>

        <Button 
          variant="outline" 
          className="justify-between h-14 bg-secondary/30 hover:bg-secondary border-border"
          onClick={handleConnect}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-600 font-bold">C</div>
            <span className="font-semibold text-foreground">Coinbase Wallet</span>
          </div>
        </Button>

        <div className="mt-4 text-center">
          <a href="#" className="text-xs text-primary hover:underline inline-flex items-center transition-all">
            What is a Web3 wallet? <ExternalLink size={12} className="ml-1" />
          </a>
        </div>
      </div>
    </Modal>
  )
}
