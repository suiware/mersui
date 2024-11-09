import { ConnectModal, useCurrentAccount } from "@mysten/dapp-kit";

export const MersuiWidget = () => {
  const currentAccount = useCurrentAccount();

  return (
    <ConnectModal
      trigger={
        <button
          disabled={!!currentAccount}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-100 disabled:text-gray-400"
        >
          Say MerSui
        </button>
      }
    />
  );
};
