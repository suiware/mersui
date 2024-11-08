import Link from "next/link";
import {
  APP_DESCRIPTION,
  APP_NAME,
  AUTHOR_NAME,
  AUTHOR_URL,
} from "~~/constants/app";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">{APP_NAME}</h1>
        <h2 className="text-xl mt-1">{APP_DESCRIPTION}</h2>

        <div className="mt-5 text-center">
          by{" "}
          <Link className="text-indigo-500" href={AUTHOR_URL} target="_blank">
            @{AUTHOR_NAME}
          </Link>
        </div>
      </main>
    </div>
  );
}
