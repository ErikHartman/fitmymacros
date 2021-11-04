import React from "react";
import "./components.css";

function Recipe(props) {
  let recipe = props.recipe;
  console.log(recipe);
  if (recipe === undefined || recipe === null) {
    recipe = {
      title: "Grandmas meatballs",
      url: "https://github.com/ErikHartman",
      kcal: 0,
      protein: 0,
      fat: 0,
      carbohydrates: 0,
      ingredients: "Love, 1, tbsp, -,-,-,-,-",
      instructions: "1. Make em \n 2. Eat em",
    };
  }
  let ingredients = recipe.ingredients.split("[").slice(3);
  console.log(ingredients);
  let ingredients_for_table = [];

  for (let ingredient of ingredients) {
    ingredient = ingredient.replace(/[\]']+/g, "");
    let split_ingredient = ingredient.split(",");
    let formatted_ingredient = {
      what: split_ingredient[0],
      qty: split_ingredient[1] + split_ingredient[2] + split_ingredient[3],
      kcal: split_ingredient[4],
      carbs: split_ingredient[5],
      protein: split_ingredient[6],
      fat: split_ingredient[7],
    };
    ingredients_for_table.push(formatted_ingredient);
  }

  return (
    <>
      <div className="recipe-container">
        <div className="recipe">
          <a className="recipe-title" href={recipe.url}>
            {" "}
            {recipe.title}{" "}
          </a>{" "}
          <div>
            <p>
              {" "}
              Total calories: {recipe.kcal}
              kcal{" "}
            </p>{" "}
            <table className="macro-table">
              <tbody>
                <tr>
                  <th> Protein </th> <th> Carbohydrates </th> <th> Fat </th>{" "}
                </tr>{" "}
                <tr>
                  <td> {recipe.protein} </td> <td> {recipe.carbohydrates} </td>{" "}
                  <td> {recipe.fat} </td> <td> g </td>{" "}
                </tr>{" "}
              </tbody>{" "}
            </table>{" "}
            <div className="ingredients-and-instructions-div">
              <table className="macro-table ingredients-table">
                <tbody>
                  <tr>
                    <th> ingredient </th> <th> qty </th> <th> kcal </th>{" "}
                    <th> carbs </th> <th> protein </th> <th> fat(g) </th>{" "}
                  </tr>
                  {ingredients_for_table.map((item, i) => (
                    <tr>
                      <td> {item.what} </td> <td> {item.qty} </td>{" "}
                      <td> {item.kcal} </td> <td> {item.carbs} </td>{" "}
                      <td> {item.protein} </td> <td> {item.fat} </td>{" "}
                    </tr>
                  ))}{" "}
                </tbody>{" "}
              </table>{" "}
              <table className="macro-table">
                <tbody>
                  <tr>
                    <th> Instructions </th>{" "}
                  </tr>{" "}
                  {recipe.instructions.split("\n").map((item, i) => (
                    <tr>
                      <td> {item} </td>{" "}
                    </tr>
                  ))}{" "}
                </tbody>{" "}
              </table>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}

export default Recipe;
