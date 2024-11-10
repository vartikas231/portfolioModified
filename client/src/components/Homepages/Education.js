import React, { useContext } from "react";
import { DataContext } from "../context/GlobalContext";
import "./Education.css"; // Make sure to create this CSS file

const Education = () => {
  const state = useContext(DataContext);
  const [education] = state.education;
  
  return (
    <div className="main-container">
      <div className="education">
        <h2 className="title">Education</h2>

        <div className="education-center">
          {education.map((item, index) => (
            <div className="single-education" key={item._id}>
              <div className="education-indicator">{index + 1}</div>
              <div className="education-content">
                <div className="education-header">
                  <span className="education-title">{item.education}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;