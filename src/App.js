import "./App.css";
import React from "react";

import Form from "./components/Form";
import Title from "./components/Title";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Title />
        <Form />
      </header>
      <Footer />
    </div>
  );
}

export default App;
