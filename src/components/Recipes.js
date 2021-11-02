import React from "react";
import "./components.css";

function Recipe(props) {
  let recipe = props.recipe;
  if (recipe === undefined || recipe === null) {
    recipe = {
      title: "Grandmas meatballs",
      url: "https://github.com/ErikHartman",
      kcal: 0,
      protein: 0,
      fat: 0,
      carbohydrate: 0,
      ingredients: "Love, 1 tbsp",
    };
  }
  // Probably need a parse ingredients function and a parse instructions function

  return (
    <>
      <div className="recipe-container">
        <div className="recipe">
          <a className="recipe-title" href={recipe.url}>
            {recipe.title}
          </a>
          <div>
            <p> Total calories: {recipe.kcal} kcal </p>
            <table className="macro-table">
              <tbody>
                <tr>
                  <th>Protein</th>
                  <th>Carbohydrates</th>
                  <th>Fat</th>
                </tr>
                <tr>
                  <td>{recipe.protein}</td>
                  <td>{recipe.carbohydrate}</td>
                  <td>{recipe.fat}</td>
                  <td>g</td>
                </tr>
              </tbody>
            </table>{" "}
            <div className="ingredients-and-instructions-div">
              <table className="macro-table ingredients-table">
                <tbody>
                  <tr>
                    <th>Ingredients</th>
                  </tr>
                  <tr>
                    <td>{recipe.ingredients}</td>
                  </tr>
                </tbody>
              </table>{" "}
              <p>1. Make'a de meataballsa</p>
            </div>
          </div>{" "}
        </div>
      </div>{" "}
    </>
  );
}

export default Recipe;
