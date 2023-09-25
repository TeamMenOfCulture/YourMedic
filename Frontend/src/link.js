import React from "react";
import { Link } from "react-router-dom";

const ButtonPage = () => {
  return (
    <div>
      <h1>Button Page</h1>
      <p>Click on the buttons to navigate to other components:</p>

      <div>
        <Link to="/">
          <button>Talk to Disha</button>
        </Link>
      </div>

      <div>
        <Link to="/component2">
          <button>Go to Component 2</button>
        </Link>
      </div>

      <div>
        <Link to="/component3">
          <button>Go to Component 3</button>
        </Link>
      </div>
    </div>
  );
};

export default ButtonPage;
