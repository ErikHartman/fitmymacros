import CircularSlider from "@fseehawer/react-circular-slider";
import "./components.css";

function Slider(macro) {
  var value = 200;
  var current = 50;
  return (
    <div>
      {" "}
      <CircularSlider
        onChange={(value) => {
          console.log(value);
        }}
        label={macro}
        labelColor="#005a58"
        knobColor="#005a58"
        progressColorFrom="#00bfbd"
        progressColorTo="#009c9a"
        progressSize={24}
        trackColor="#eeeeee"
        trackSize={24}
        data={[...Array(value).keys()]} //...
        dataIndex={current}
      />{" "}
    </div>
  );
}

function Sliders() {
  const protein_slider = Slider("Protein");
  const carb_slider = Slider("Carbohydrates");
  const fat_slider = Slider("Fat");
  return (
    <div className="sliders">
      <div className="slider"> {protein_slider} </div>
      <div className="slider"> {carb_slider} </div>
      <div className="slider"> {fat_slider} </div>
    </div>
  );
}

export default Sliders;
