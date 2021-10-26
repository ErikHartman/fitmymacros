import React from "react";
import "./components.css";

import { AwesomeButtonProgress } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";

function Generate() {
  return (
    <AwesomeButtonProgress
      cssModule={AwesomeButtonStyles}
      type="secondary"
      size="large"
      action={(element, next) => console.log(next)}
    >
      Generate
    </AwesomeButtonProgress>
  );
}

export default Generate;
