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
    <div className="recipe-container">
      {recipeList.map((val) => {
        return <h1 className="recipe-title">{val.title}</h1>;
      })}
    </div>
  );
}

export default Recipe;
