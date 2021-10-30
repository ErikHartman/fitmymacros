import "./App.css";
import React from "react";
import ThemeToggler from "./components/ThemeToggler";
import Form from "./components/Form";
import Title from "./components/Title";
import Recipe from "./components/Recipes";

function App() {
  return (
    <div className="App">
      <ThemeToggler />
      <Title />
      <header className="App-header">
        <Form />
        <Recipe />
      </header>
    </div>
  );
}

export default App;
