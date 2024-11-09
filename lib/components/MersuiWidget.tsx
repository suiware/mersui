import {
  ConnectButton,
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import "@mysten/dapp-kit/dist/index.css";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./MersuiWidget.css";

// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl("localnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});
const queryClient = new QueryClient();

export const MersuiWidget = () => {
  // const currentAccount = useCurrentAccount();

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="localnet">
        <WalletProvider>
          <ConnectButton connectText="Say Mersui" />{" "}
          {/* <ConnectModal
            trigger={
              <button
                disabled={!!currentAccount}
                className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-100 disabled:text-gray-400"
              >
                Say MerSui
              </button>
            }
          /> */}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};
