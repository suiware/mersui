import {
  ConnectModal,
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import c from "clsx";
import {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import {
  AMOUNT_USD,
  BUTTON_LABEL,
  PYTH_SPONSORED_FEED,
  TRANSACTION_AMOUNT_FALLBACK,
} from "../constants";

interface IMersuiWidget {
  recipientAddress: string;
}

interface IPrice {
  price: string;
  expo: number;
}

const fetchSuiPrice = async () => {
  const response = await fetch(
    `https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=${PYTH_SPONSORED_FEED}`
  );
  const data = await response.json();
  // @todo Handle wrong response.
  return data.parsed[0].price as IPrice;
};

export const MersuiWidget: FC<IMersuiWidget> = ({ recipientAddress }) => {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [_, setDigest] = useState<string>("");
  const [transactionAmount, setTransactionAmount] = useState<bigint>(
    TRANSACTION_AMOUNT_FALLBACK
  );
  const [status, setStatus] = useState<"success" | "error" | "loading">(
    "loading"
  );

  function performTransaction() {
    const tx = new Transaction();

    const coin = tx.splitCoins(tx.gas, [
      // @todo: make the amount dynamic.
      tx.pure.u64(transactionAmount),
    ]);
    tx.transferObjects([coin], tx.pure.address(recipientAddress));

    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onError: (error) => {
          console.log("error", error);
          setStatus("error");
        },
        onSuccess: (result) => {
          console.log("executed transaction", result);
          setDigest(result.digest);
          setStatus("success");
        },
      }
    );
  }

  useEffect(() => {
    if (currentAccount) {
      fetchSuiPrice().then((priceObj: IPrice) => {
        setTransactionAmount(
          BigInt(
            Math.round(
              (parseFloat(priceObj.price) /
                10 ** Math.abs(priceObj.expo) /
                AMOUNT_USD) *
                1_000_000_000
            )
          )
        );
      });
    }
  }, [currentAccount]);

  if (currentAccount) {
    return (
      <div>
        <MersuiButton
          onClick={() => performTransaction()}
          connected={true}
          status={status}
        >
          {BUTTON_LABEL} ${AMOUNT_USD}
        </MersuiButton>
      </div>
    );
  }

  return (
    <ConnectModal
      trigger={
        <MersuiButton disabled={!!currentAccount}>
          {BUTTON_LABEL} ${AMOUNT_USD}
        </MersuiButton>
      }
    />
  );
};

interface IMersuiButton {
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  connected?: boolean;
  status?: "success" | "error" | "loading";
}

const MersuiButton: FC<PropsWithChildren<IMersuiButton>> = ({
  disabled,
  onClick,
  children,
  connected,
  status,
}) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-2 rounded-md border border-red-500">
      <button
        disabled={disabled}
        className={c(
          "px-6 py-2 text-gray-700 font-bold text-lg bg-yellow-400 rounded-full shadow-md hover:text-gray-700 hover:bg-yellow-300 mt-2",
          {
            "border border-transparent": !connected,
            "border border-dashed border-yellow-400 animate-border": connected,
          }
        )}
        onClick={onClick}
      >
        {children}
      </button>
      <div className="text-sm visible h-3">
        {status === "success" ? (
          <span className="text-green-600">success</span>
        ) : status === "error" ? (
          <span className="text-red-600">error</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
