import {
  connectorsForWallets,
  Chain,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { chain, configureChains, createClient } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const getChain = () => {
  return process.env.NEXT_PUBLIC_CHAIN === "goerli"
    ? chain.goerli
    : chain.mainnet;
};

export const { chains, provider } = configureChains(
  [getChain()],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }),
    // publicProvider(),
  ]
);

export const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: [metaMaskWallet({ chains }), walletConnectWallet({ chains })],
  },
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
