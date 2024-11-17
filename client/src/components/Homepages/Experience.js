import React, { useContext } from 'react';
import { DataContext } from "../context/GlobalContext";

const Experience = () => {
  const state = useContext(DataContext);
  const [experiences] = state.experience;

  // Check if experiences is an array and has items
  if (!Array.isArray(experiences) || experiences.length === 0) {
    return (
      <div className="main-container">
        <h2 className="title">Experience</h2>
        <p>No experiences found.</p>
      </div>
    );
  }

  return (
    <div className="main-container">
      <h2 className="title">Experience</h2>
      <div className="experience">
        <div className="experience-center">
          {experiences.map(({ _id, role, company, duration, description, skillsUsed, achievements }) => (
            <div className="single-experience" key={_id}>
              <div className="experience-header">
                <div>
                  <div className="role">{role}</div>
                  <div className="company">{company}</div>
                </div>
                <div className="duration">{duration}</div>
              </div>
              <div className="experience-content">
                <p>{description}</p>
              </div>
              <div className="skills-used">
                {skillsUsed.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
              <ul className="achievements">
                {achievements.map((achievement, index) => (
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