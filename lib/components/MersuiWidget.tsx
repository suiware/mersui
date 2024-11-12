import {
  ConnectModal,
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

interface IMersuiWidget {
  recipientAddress: string;
}

const fetchSuiPrice = async () => {
  const response = await fetch(
    "https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744"
  );
  const data = await response.json();
  console.log(data);
  return data.parsed[0].price;
};

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

  useEffect(() => {
    if (currentAccount) {
      fetchSuiPrice().then((price) => {
        console.log("price", price);
      });
    }
  }, [currentAccount]);

  if (currentAccount) {
    return (
      <div>
        <MersuiButton onClick={() => performTransaction()}>
          Mersui $3
        </MersuiButton>
      </div>
    );
  }

  return (
    <ConnectModal
      trigger={
        <MersuiButton disabled={!!currentAccount}>Mersui $3</MersuiButton>
      }
    />
  );
};

interface IMersuiButton {
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const MersuiButton: FC<PropsWithChildren<IMersuiButton>> = ({
  children,
  disabled,
  onClick,
}) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <button
        disabled={disabled}
        className="px-6 py-2 text-gray-700 font-bold text-lg bg-yellow-400 rounded-full shadow-md hover:text-gray-700 hover:bg-yellow-300 border-none"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};
