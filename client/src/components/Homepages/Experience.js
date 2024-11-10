import React, { useContext } from 'react'
import { DataContext } from "../context/GlobalContext";

const Experience = () => {
  const state = useContext(DataContext);
  const [experiences] = state.experiences;
  
  return (
    <div className="main-container">
      <h2 className="title">Experience</h2>
      <div className="experience">
        <div className="experience-center">
          {experiences.map((item) => (
            <div className="single-experience" key={item._id}>
              <div className="experience-header">
                <div>
                  <div className="role">{item.role}</div>
                  <div className="company">{item.company}</div>
                </div>
                <div className="duration">{item.duration}</div>
              </div>
              <div className="experience-content">
                <p>{item.description}</p>
              </div>
              <div className="skills-used">
                {item.skillsUsed.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
              <ul className="achievements">
                {item.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Experience;