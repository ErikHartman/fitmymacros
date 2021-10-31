import "./App.css";
import React from "react";
import ThemeToggler from "./components/ThemeToggler";
import Form from "./components/Form";
import Title from "./components/Title";

function App() {
  return (
    <div className="App">
      <ThemeToggler />
      <Title />
      <header className="App-header">
        <Form />
      </header>{" "}
    </div>
  );
}

export default App;
