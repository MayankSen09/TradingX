import { http, createConfig } from 'wagmi'
import { polygon, polygonAmoy } from 'wagmi/chains'

export const config = createConfig({
  chains: [polygon, polygonAmoy],
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
  },
})
