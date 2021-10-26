import "./components.css";

import { AwesomeButton } from "react-awesome-button";

function Generate() {
  return (
    <div>
      <AwesomeButton
        className="generate-button"
        onPress={() => {
          console.log("hello");
        }}
      >
        Generate
      </AwesomeButton>
    </div>
  );
}

export default Generate;
