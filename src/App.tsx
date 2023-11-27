import { signal } from "@preact/signals-react";

import Navbar from "./components/Navbar";

import "./App.css";

const count = signal(0);

function App() {
  return (
    <>
      <Navbar />
      <div>
        <button onClick={() => (count.value += 1)}>count is {count}</button>
      </div>
    </>
  );
}

export default App;
