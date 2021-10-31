import React from "react";
import "./components.css";

function Recipe(props) {
  let recipeList = props.recipeList;

  if (recipeList === null) {
    recipeList = [];
  }
  return (
    <>
      <div className="next-previous-buttons">
        <button className="previous">
          <i className="arrow left"> </i> Previous{" "}
        </button>{" "}
        <button className="next">
          Next <i className="arrow right"> </i>{" "}
        </button>{" "}
      </div>{" "}
      <div className="recipe-container">
        {" "}
        {recipeList.map((val) => {
          return (
            <div className="recipe">
              <a className="recipe-title" href={val.url}>
                {" "}
                {val.title}{" "}
              </a>{" "}
              <div>
                <p>
                  {" "}
                  Total calories: {val.kcal}
                  kcal{" "}
                </p>{" "}
                <table className="macro-table">
                  <tr>
                    <th> Protein </th> <th> Carbohydrates </th> <th> Fat </th>{" "}
                  </tr>
                  <tr>
                    <td> {val.protein} </td> <td> {val.carbohydrate} </td>{" "}
                    <td> {val.fat} </td> <td> g </td>{" "}
                  </tr>
                </table>{" "}
              </div>{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
    </>
  );
}

export default Recipe;
