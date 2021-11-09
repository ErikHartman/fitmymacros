import CircularSlider from "@fseehawer/react-circular-slider";
import React from "react";
import "./components.css";
import "./mobile.css";
import Recipe from "./Recipes";
import Papa from "papaparse";

async function getData() {
  const response = await fetch("database/recipes.csv");
  const data = await response.text();
  var results = Papa.parse(data, {
    header: true,
  });
  return results.data;
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      kcal: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      recipeIndex: 0,
      wantedIngredients: [],
      all_data: getData(),
    };

    this.changeProtein = this.changeProtein.bind(this);
    this.changeFat = this.changeFat.bind(this);
    this.changeCarbs = this.changeCarbs.bind(this);
    this.queryDatabase = this.queryDatabase.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.addIngredientToList = this.addIngredientToList.bind(this);
    this.removeIngredientFromList = this.removeIngredientFromList.bind(this);
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

  next() {
    let index = this.state.recipeIndex;
    if (index < this.state.recipes.length - 1) {
      index++;
    }
    this.setState({ recipeIndex: index });
  }

  previous() {
    let index = this.state.recipeIndex;
    if (index > 0) {
      index--;
    }

    this.setState({ recipeIndex: index });
  }

  addIngredientToList(event) {
    event.preventDefault();
    if (this.ingredient.value.length > 1) {
      var ingredientList = [...this.state.wantedIngredients];
      ingredientList.push(this.ingredient.value.toLowerCase());
      this.setState({ wantedIngredients: ingredientList });
      console.log(ingredientList);
    }
  }

  removeIngredientFromList(index) {
    let wantedIngredients = this.state.wantedIngredients;
    wantedIngredients.splice(index, 1);
    this.setState({
      wantedIngredients: wantedIngredients,
    });
  }

  queryDatabase(event) {
    event.preventDefault();

    this.state.all_data.then((data) => {
      var kcal = this.state.kcal;
      var protein = this.state.protein;
      var fat = this.state.fat;
      var carbs = this.state.carbs;
      var wanted_ingredients = this.state.wantedIngredients;
      var subset_recipes = data.filter(function (all_data) {
        var includes = true;
        for (var i of wanted_ingredients) {
          if (
            all_data.ingredients !== undefined &&
            !all_data.ingredients.toLowerCase().includes(i)
          ) {
            includes = false;
          }
        }
        return (
          includes &&
          all_data.kcal >= kcal - 100 &&
          all_data.kcal <= kcal + 100 &&
          all_data.protein >= protein - 20 &&
          all_data.protein <= protein + 20 &&
          all_data.carbohydrates >= carbs - 20 &&
          all_data.carbohydrates <= carbs + 20 &&
          all_data.fat >= fat - 20 &&
          all_data.fat <= fat + 20
        );
      });
      subset_recipes = subset_recipes.sort(function (a, b) {
        return (
          (Math.abs(protein - a.protein) - Math.abs(protein - b.protein)) * 2 +
          (Math.abs(carbs - a.carbohydrates) -
            Math.abs(carbs - b.carbohydrate)) +
          (Math.abs(fat - a.fat) - Math.abs(fat - b.fat))
        );
      });

      this.setState({ recipes: subset_recipes, recipeindex: 0 });
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
                labelColor="#70db7e"
                knobColor="#70db7e"
                progressColorFrom="#00bfbd"
                progressColorTo="#70db7e"
                progressSize={24}
                trackColor="#333333"
                trackSize={24}
                name="protein-slider"
                data={[...Array(150).keys()]}
                dataIndex={10}
              />
            </div>
            <div className="slider">
              <CircularSlider
                onChange={this.changeCarbs}
                label="Carbohydrates"
                labelColor="#d66797"
                knobColor="#d66797"
                progressColorFrom="#00bfbd"
                progressColorTo="#d66797"
                progressSize={24}
                trackColor="#333333"
                trackSize={24}
                name="carb-slider"
                data={[...Array(150).keys()]}
                dataIndex={10}
              />
            </div>
            <div className="slider">
              <CircularSlider
                onChange={this.changeFat}
                label="Fat"
                labelColor="#e6dc6e"
                knobColor="#e6dc6e"
                progressColorFrom="#00bfbd"
                progressColorTo="#e6dc6e"
                progressSize={24}
                trackColor="#333333"
                trackSize={24}
                name="fat-slider"
                data={[...Array(150).keys()]}
                dataIndex={10}
              />
            </div>
          </div>
          <div className="things-i-want">
            <div>
              <p>Things I want in my recipe:</p>
            </div>
            <div>
              <input
                className="ingredients-input"
                type="text"
                value={this.state.value}
                ref={(ip) => {
                  this.ingredient = ip;
                }}
              />
              <button
                className="add-ingredient"
                onClick={this.addIngredientToList}
              >
                add
              </button>
            </div>
            {this.state.wantedIngredients.map((item, index) => {
              return (
                <span
                  className="ingredient"
                  onClick={this.removeIngredientFromList.bind(undefined, index)}
                  key={index}
                >
                  x {item}
                </span>
              );
            })}
          </div>
          <button className="generate-button" onClick={this.queryDatabase}>
            Generate
          </button>
        </form>
        <div className="next-previous-buttons">
          <button className="previous" onClick={this.previous}>
            <i className="arrow left"> </i> Previous
          </button>
          <button className="next" onClick={this.next}>
            Next <i className="arrow right"> </i>
          </button>
        </div>
        <Recipe recipe={this.state.recipes[this.state.recipeIndex]} />
      </>
    );
  }
}

export default Form;
// https://codepen.io/tfbrown/pen/zjXvZy
// The kcal value should sum the protein, fat and carb values
// when generate is clicked it should generate recipes with the specifications
