import "./App.css";
import Sliders from "./components/Macro_sliders";
import Title from "./components/Title";
import Generate from "./components/Generate";
import Recipe from "./components/CSVtoTable";

function App() {
  return (
    <div className="App">
      <Title />
      <header className="App-header">
        <p>Macros</p>
        <Sliders />
        <Generate />
        <Recipe />
      </header>
    </div>
  );
}

export default App;
