import { APP_DESCRIPTION, APP_NAME } from "~~/constants/app";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">{APP_NAME}</h1>
        <h2 className="text-xl">{APP_DESCRIPTION}</h2>
      </main>
    </div>
  );
}
