import "./App.css";
import Sliders from "./components/Macro_sliders";
import Title from "./components/Title";
import Generate from "./components/Generate";

function App() {
  return (
    <div className="App">
      <Title />
      <header className="App-header">
        <p>Macros</p>
        <Sliders />
        <Generate />
      </header>
    </div>
  );
}

export default App;
