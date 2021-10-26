import "./App.css";
import CircularSlider from "@fseehawer/react-circular-slider";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hur taggad?</p>
        <CircularSlider
          label="tagg-skala"
          labelColor="#005a58"
          knobColor="#005a58"
          progressColorFrom="#00bfbd"
          progressColorTo="#009c9a"
          progressSize={24}
          trackColor="#eeeeee"
          trackSize={24}
          data={[...Array(100).keys()]} //...
          dataIndex={10}
          onChange={(value) => {
            console.log(value);
          }}
        />
      </header>
    </div>
  );
}

export default App;
