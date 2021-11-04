import React from "react";
import "./components.css";
import { GoMarkGithub } from "react-icons/go";
function Footer() {
  return (
    <div className="footer">
      <a href="https://github.com/ErikHartman">
        <GoMarkGithub className="github" size={70} />
      </a>
    </div>
  );
}

export default Footer;
