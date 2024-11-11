import {
  ConnectModal,
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { FC, useState } from "react";

interface IMersuiWidget {
  recipientAddress: string;
}

export const MersuiWidget: FC<IMersuiWidget> = ({ recipientAddress }) => {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [digest, setDigest] = useState<string>("");

  function performTransaction() {
    const tx = new Transaction();

    // @todo: get price feed data for SUI/USD from the sponsored feed
    // https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744
    // and use it to calculate the amount of SUI to send.

    const coin = tx.splitCoins(tx.gas, [
      // @todo: make the amount dynamic.
      tx.pure.u64(BigInt(parseFloat("1.0") * 1_000_000_000)),
    ]);
    tx.transferObjects([coin], tx.pure.address(recipientAddress));

    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onSuccess: (result) => {
          console.log("executed transaction", result);
          setDigest(result.digest);
        },
      }
    );
  }

  if (currentAccount) {
    return (
      <div>
        <button onClick={() => performTransaction()}>Pay</button>
      </div>
    );
  }

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
