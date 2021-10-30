import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./components.css";

function Recipe() {
  const [recipeList, setRecipeList] = useState(Array);

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get").then((data) => {
      setRecipeList(data.data);
    });
  }, []);

  return (
    <>
      <div className="next-previous-buttons">
        <button className="previous">
          <i class="arrow left"></i> Previous
        </button>
        <button className="next">
          Next <i class="arrow right"></i>
        </button>
      </div>
      <div className="recipe-container">
        {recipeList.map((val) => {
          return (
            <div className="recipe">
              <h2 className="recipe-title">{val.title}</h2>
              <div>
                <p>Total calories: {val.kcal}</p>
                <p>Total fat: {val.fat}</p>
                <p>Total protein: {val.protein}</p>
                <p>Total carbohydrates: {val.carbohydrate}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Recipe;
