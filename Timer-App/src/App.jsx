import Stopwatch from "./Stopwatch.jsx"

function App() {
  return (
    <div className="app">
      <h1 className="main-heading">Stopwatch</h1>
      <div className="stopwatch-container">
        <Stopwatch />
        <Stopwatch />
        <Stopwatch />
        <Stopwatch />
        {/* <Stopwatch />
        <Stopwatch /> */}
      </div>
    </div>
  );
}


export default App
