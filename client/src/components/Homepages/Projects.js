import React, { useContext } from 'react'
import { DataContext } from '../context/GlobalContext';

const Projects = () => {
  const state = useContext(DataContext);
  
  // Add logging to understand the structure
  console.log('Full state:', state);
  console.log('Projects:', state.projects);

  // Defensive programming
  const projects = Array.isArray(state.projects) 
    ? state.projects 
    : (state.projects ? [state.projects] : []);

  return (
    <div className="main-container">
      <div className="projects" id="projects">
        <h2 className="title">Projects</h2>

        <div className="projects-center">
          {projects.length === 0 ? (
            <div>No projects found</div>
          ) : (
            projects.map((item) => {
              // Add additional checks
              console.log('Current project item:', item);
              
              return (
                <div className="single-project" key={item._id}>
                  <div className="single-project-img">
                    <img 
                      src={item.images?.url || 'default-image-url'} 
                      alt={item.title || "Project Image"} 
                    />
                  </div>
                  <div className="single-project-info">
                    <h3>{item.title || 'Untitled Project'}</h3>
                    <p>{item.description || 'No description available'}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects