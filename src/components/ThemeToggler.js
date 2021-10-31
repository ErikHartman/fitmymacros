import "./themeToggler.css";
import React from "react";

class ThemeToggler extends React.Component {
  switchTheme = (e) => {
    if (e.target.checked) {
      document.body.style.background = "white";
    } else {
      document.body.style.background = "#282c34";
    }
  };

  render() {
    return (
      <div className="theme-switch-wrapper">
        <label className="theme-switch" for="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            onClick={this.switchTheme}
          ></input>
          <div className="theme-slider round"></div>
        </label>
      </div>
    );
  }
}

export default ThemeToggler;
