import CircularSlider from "@fseehawer/react-circular-slider";
import React from "react";
import "./components.css";
import Axios from "axios";
import Recipe from "./Recipes";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      kcal: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
    };

    this.changeProtein = this.changeProtein.bind(this);
    this.changeFat = this.changeFat.bind(this);
    this.changeCarbs = this.changeCarbs.bind(this);
    this.queryDatabase = this.queryDatabase.bind(this);
  }
  changeProtein(e) {
    var p = e;
    this.setState({
      protein: p,
      kcal: p * 4 + this.state.fat * 9 + this.state.carbs * 4,
    });
  }

  changeFat(e) {
    var f = e;
    this.setState({
      fat: f,
      kcal: f * 9 + this.state.protein * 4 + this.state.carbs * 4,
    });
  }
  changeCarbs(e) {
    var c = e;
    this.setState({
      carbs: c,
      kcal: c * 4 + this.state.fat * 9 + this.state.protein * 4,
    });
  }

  queryDatabase(event) {
    event.preventDefault();

    Axios.get("http://localhost:3002/api/get").then((data) => {
      let all_data = data.data;
      var kcal = this.state.kcal;
      var protein = this.state.protein;
      var fat = this.state.fat;
      var carbs = this.state.carbs;
      var subset_recipes = all_data.filter(function (all_data) {
        return (
          all_data.kcal >= kcal - 200 &&
          all_data.kcal <= kcal + 200 &&
          all_data.protein >= protein - 20 &&
          all_data.protein <= protein + 20 &&
          all_data.carbohydrate >= carbs - 20 &&
          all_data.carbohydrate <= carbs + 20 &&
          all_data.fat >= fat - 20 &&
          all_data.fat <= fat + 20
        );
      });

      this.setState({ recipes: subset_recipes });
    });
  }

  render() {
    return (
      <>
        <form>
          <label className="kcal"> kcal: {this.state.kcal} </label> <br />
          <div className="sliders">
            <div className="slider">
              <CircularSlider
                onChange={this.changeProtein}
                label="Protein"
                labelColor="#005a58"
                knobColor="#005a58"
                progressColorFrom="#00bfbd"
                progressColorTo="#009c9a"
                progressSize={24}
                trackColor="#eeeeee"
                trackSize={24}
                name="protein-slider"
                data={[...Array(250).keys()]}
              />{" "}
            </div>{" "}
            <div className="slider">
              <CircularSlider
                onChange={this.changeCarbs}
                label="Carbohydrates"
                labelColor="#005a58"
                knobColor="#005a58"
                progressColorFrom="#00bfbd"
                progressColorTo="#009c9a"
                progressSize={24}
                trackColor="#eeeeee"
                trackSize={24}
                name="carb-slider"
                data={[...Array(250).keys()]}
              />{" "}
            </div>{" "}
            <div className="slider">
              <CircularSlider
                onChange={this.changeFat}
                label="Fat"
                labelColor="#005a58"
                knobColor="#005a58"
                progressColorFrom="#00bfbd"
                progressColorTo="#009c9a"
                progressSize={24}
                trackColor="#eeeeee"
                trackSize={24}
                name="fat-slider"
                data={[...Array(250).keys()]}
              />{" "}
            </div>{" "}
          </div>{" "}
          <button className="generate-button" onClick={this.queryDatabase}>
            Generate{" "}
          </button>{" "}
        </form>
        <Recipe recipeList={this.state.recipes} />
      </>
    );
  }
}

export default Form;
// https://codepen.io/tfbrown/pen/zjXvZy
// The kcal value should sum the protein, fat and carb values
// when generate is clicked it should generate recipes with the specifications
