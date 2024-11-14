import { MersuiWidget } from "../lib/main";
import "./App.css";

function App() {
  return (
    <>
      <h1 className="text-4xl">Mersui Widget</h1>
      <div className="card">
        <MersuiWidget
          recipientAddress={import.meta.env.VITE_TARGET_ADDRESS}
          buttonLabel="Support"
        />
      </div>
    </>
  );
}

export default App;
