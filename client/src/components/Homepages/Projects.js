import React, { useContext } from 'react'


import {DataContext} from '../context/GlobalContext';



const Projects = () => {

const state=useContext(DataContext);
const [projects]=state.projects


  return (
    <div className="main-container">
      <div className="projects" id="projects">
        <h2 className="title">Projects</h2>

        <div className="projects-center">
          {projects.map((item) => (
            
            <div className="single-project" key={item._id}>
               
              <div className="single-project-img">
                {/*  */}
                {/* yaha pr url nhi pohonch rha  */}
                {/*  */}
                {/* console.log(item); */}
                <img src={item.images.url} alt="not found" />
              </div>
              <div className="single-project-info">
                <h3>{item.title}</h3>
                <p>
                  {item.description}
                  {/* console.log(item.images.url); */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects




