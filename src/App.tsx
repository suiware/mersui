import { MerSuiWidget } from "../lib/main";
import "./App.css";

function App() {
  return (
    <>
      <h1 className="text-4xl">MerSui Widget</h1>
      <div className="card">
        <MerSuiWidget
          recipientAddress={import.meta.env.VITE_RECIPIENT_ADDRESS}
          buttonLabel="Support"
        />
      </div>
    </>
  );
}

export default App;
