import "./App.css";
import React from "react";
import Form from "./components/Form";
import Title from "./components/Title";
import Recipe from "./components/Recipes";

function App() {
  return (
    <div className="App">
      <Title />
      <header className="App-header">
        <Form />
        <Recipe />
      </header>
    </div>
  );
}

export default App;
