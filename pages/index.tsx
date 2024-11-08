import Link from "next/link";
import {
  APP_DESCRIPTION,
  APP_NAME,
  AUTHOR_NAME,
  AUTHOR_URL,
} from "~~/constants/app";

export default function Home() {
  return (
    <div className="text-foreground bg-background flex flex-col justify-between items-center h-screen">
      <main className="flex flex-col justify-center items-center p-4 grow">
        <h1 className="text-4xl font-bold">{APP_NAME}</h1>
        <h2 className="text-xl mt-1 text-center font-light">
          {APP_DESCRIPTION}
        </h2>
      </main>
      <footer className="flex flex-col justify-center items-center p-4">
        <div className="mt-5 text-center">
          by{" "}
          <Link className="font-semibold" href={AUTHOR_URL} target="_blank">
            @{AUTHOR_NAME}
          </Link>
        </div>
      </footer>
    </div>
  );
}
