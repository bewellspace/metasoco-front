import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import theme from "src/theme";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { GlobalStyles } from "src/components/GlobalStyles";
import Header from "src/components/Layout/Header";
import Footer from "src/components/Layout/Footer";
import { chains, wagmiClient } from "src/connectors";
import { WagmiConfig, useContractRead, useContract } from "wagmi";

function AppContent(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>ETHMergeArt</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <RainbowKitProvider
        modalSize="compact"
        chains={chains}
        initialChain={420}
        theme={lightTheme({
          borderRadius: "small",
          accentColor: "#2ab0f5",
          accentColorForeground: "white",
          fontStack: "system",
        })}
      >
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <GlobalStyles />
          <Header navbarOpened={false} toggleNavbar={console.log} />
          <Component {...pageProps} />
          <Footer />
        </MantineProvider>
      </RainbowKitProvider>
    </>
  );
}

export default function App(props: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <AppContent {...props} />
    </WagmiConfig>
  );
}
