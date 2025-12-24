import React from "react";
import Tilt from "react-parallax-tilt";

import Brain from "./brain.jpg";
import "./logo.css";

function Logo() {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 160, width: 150 }}
      >
        <div className="Tilt-inner pa3">
          <img
            src={Brain}
            style={{ paddingTop: "5px" }}
            alt="artificialBrianLogo"
          />
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
