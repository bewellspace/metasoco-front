import { connectorsForWallets, Chain } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { chain, configureChains, createClient } from "wagmi";
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from "wagmi/providers/public";

export const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }),
    publicProvider(),
  ]
);

export const connectors = connectorsForWallets([
  {
    groupName: "",
    wallets: [metaMaskWallet({ chains }), walletConnectWallet({ chains })],
  },
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
});
