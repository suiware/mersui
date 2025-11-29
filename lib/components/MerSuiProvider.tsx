import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import "@mysten/dapp-kit/dist/index.css";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";
import "./MerSuiProvider.css";

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl("localnet") },
  devnet: { url: getFullnodeUrl("devnet") },
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});
const queryClient = new QueryClient();

export interface IMerSuiProvider {
  network?: "localnet" | "devnet" | "testnet" | "mainnet";
}

export const MerSuiProvider: FC<PropsWithChildren<IMerSuiProvider>> = ({
  children,
  network = "mainnet",
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} network={network}>
        <WalletProvider autoConnect={true}>{children}</WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};
