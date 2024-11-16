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
  DEFAULT_AMOUNT_USD,
  DEFAULT_BUTTON_LABEL,
  PYTH_SPONSORED_FEED,
  TRANSACTION_AMOUNT_FALLBACK,
} from "../constants";

interface IMerSuiWidget {
  recipientAddress: string;
  amount?: number;
  buttonLabel?: string;
  containerClassName?: string;
  buttonClassName?: string;
  statusClassName?: string;
}

export const MerSuiWidget: FC<IMerSuiWidget> = ({
  recipientAddress,
  amount = DEFAULT_AMOUNT_USD,
  buttonLabel,
  containerClassName,
  buttonClassName,
  statusClassName,
}) => {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [, setDigest] = useState<string>("");
  const [transactionAmount, setTransactionAmount] = useState<bigint>(
    TRANSACTION_AMOUNT_FALLBACK
  );
  const [status, setStatus] = useState<"success" | "error" | "loading">(
    "loading"
  );

  function performTransaction() {
    const tx = new Transaction();

    const coin = tx.splitCoins(tx.gas, [tx.pure.u64(transactionAmount)]);
    tx.transferObjects([coin], tx.pure.address(recipientAddress));

    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onError: (error) => {
          console.error("trx error", error);
          setStatus("error");
        },
        onSuccess: (result) => {
          console.log("trx success", result.digest);
          setDigest(result.digest);
          setStatus("success");
        },
      }
    );
  }

  useEffect(() => {
    if (currentAccount) {
      fetchSuiPrice().then((priceObj: IPythPrice) => {
        setTransactionAmount(calculateAmount(priceObj, amount));
      });
    }
  }, [currentAccount, amount]);

  if (currentAccount) {
    return (
      <MerSuiButton
        onClick={() => performTransaction()}
        connected={true}
        status={status}
        containerClassName={containerClassName}
        buttonClassName={buttonClassName}
        statusClassName={statusClassName}
      >
        {buttonLabel || DEFAULT_BUTTON_LABEL} ${amount}
      </MerSuiButton>
    );
  }

  return (
    <ConnectModal
      trigger={
        <MerSuiButton
          disabled={!!currentAccount}
          containerClassName={containerClassName}
          buttonClassName={buttonClassName}
          statusClassName={statusClassName}
        >
          {buttonLabel || DEFAULT_BUTTON_LABEL} ${amount}
        </MerSuiButton>
      }
    />
  );
};

interface IMerSuiButton {
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  connected?: boolean;
  status?: "success" | "error" | "loading";
  containerClassName?: string;
  buttonClassName?: string;
  statusClassName?: string;
}

const MerSuiButton: FC<PropsWithChildren<IMerSuiButton>> = ({
  disabled,
  onClick,
  children,
  connected,
  status,
  containerClassName,
  buttonClassName,
  statusClassName,
}) => {
  return (
    <div
      className={c(
        "flex flex-col items-center justify-center px-4 py-1 rounded-md",
        containerClassName
      )}
    >
      <button
        disabled={disabled}
        className={c(
          "px-6 py-2 text-gray-700 font-bold text-lg bg-yellow-400 rounded-full shadow-md hover:text-gray-700 hover:bg-yellow-300 mt-2",
          {
            "border border-transparent": !connected,
            "border border-dashed border-yellow-400 animate-border": connected,
          },
          buttonClassName
        )}
        onClick={onClick}
      >
        {children}
      </button>
      <div
        className={c("text-sm h-3", {
          invisible: status === "loading",
        })}
      >
        {status === "success" ? (
          <span
            className={c("text-green-600", `status-${status}`, statusClassName)}
          >
            success
          </span>
        ) : status === "error" ? (
          <span
            className={c("text-red-600", `status-${status}`, statusClassName)}
          >
            error
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

interface IPythPrice {
  price: string;
  expo: number;
}

const fetchSuiPrice = async () => {
  const response = await fetch(
    `https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=${PYTH_SPONSORED_FEED}`
  );
  const data = await response.json();
  // @todo Handle unexpected response.
  return data.parsed[0].price as IPythPrice;
};

const calculateAmount = (price: IPythPrice, amount: number): bigint => {
  if (!price?.price) {
    return TRANSACTION_AMOUNT_FALLBACK;
  }

  return BigInt(
    Math.round(
      (amount / (parseFloat(price.price) / 10 ** Math.abs(price.expo))) *
        1_000_000_000
    )
  );
};
