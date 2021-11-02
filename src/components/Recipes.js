import React from "react";
import "./components.css";

function Recipe(props) {
  let recipe = props.recipe;
  if (recipe === undefined || recipe === null) {
    recipe = {
      title: "Grandmas meatballs",
      url: "",
      kcal: 0,
      protein: 0,
      fat: 0,
      carbohydrate: 0,
    };
  }

  return (
    <>
      <div className="recipe-container">
        <div className="recipe">
          <a className="recipe-title" href={recipe.url}>
            {recipe.title}{" "}
          </a>{" "}
          <div>
            <p>
              {" "}
              Total calories: {recipe.kcal}
              kcal{" "}
            </p>{" "}
            <table className="macro-table">
              <tr>
                <th> Protein </th> <th> Carbohydrates </th> <th> Fat </th>{" "}
              </tr>
              <tr>
                <td> {recipe.protein} </td> <td> {recipe.carbohydrate} </td>{" "}
                <td> {recipe.fat} </td> <td> g </td>{" "}
              </tr>
            </table>{" "}
          </div>{" "}
        </div>
      </div>{" "}
    </>
  );
}

export default Recipe;
