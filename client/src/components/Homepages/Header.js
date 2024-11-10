import React from "react";
import "../../App.css";

const Header = () => {
  return (
    <React.Fragment>
      <div className="header">
          </div>
          <div className="cv">
            <span>
              <b>Cv:</b>
              <a href="/#" target="_blank" rel="noreferrer">
                <i className="fas fa-file-pdf"></i>
              </a>
            </span>
          </div>
    </React.Fragment>
  );
};

export default Header;