import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './ProjectsAdmin.css';
import API_BASE_URL from "../../apiConfig";


const initialState = {
  product_id: "",
  title: "",
  description: "",
  hostedlink: ""
};

const ProjectsAdmin = () => {
  const [product, setProducts] = useState(initialState);
  const [images, setImages] = useState(false);
  const [message, setMessage] = useState("");
  const [messageCond, setMessageCond] = useState(false);
  const [projectData, setProjectData] = useState([]);

  // Upload image functionality
  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const file = e.target.files[0];
      console.log("Uploaded file:", file); // Debug log

      if (!file) return alert("No files exist");

      if (file.size > 1024 * 1024) {
        return alert("Size is too big!");
      }
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return alert("Incorrect file format!");
      }

      let formData = new FormData();
      formData.append("files", file);
      const res = await axios.post('/upload', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload response:", res.data); // Debug log
      setImages(res.data);
    } catch (error) {
      console.log("Upload error:", error); // Debug log
    }
  };

  // Delete image
  const handleDestroy = async () => {
    try {
      console.log("Destroying image with public_id:", images.public_id); // Debug log
      await axios.post("/destroy", { public_id: images.public_id });
      setImages(false);
    } catch (error) {
      console.log("Destroy error:", error.response.data.msg); // Debug log
    }
  };

  // Handle change input
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to:`, value); // Debug log

    setProducts({ ...product, [name]: value });
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting product:", { ...product, images }); // Debug log
      
      const res = await axios.post('${API_BASE_URL}/project', { ...product, images });
      console.log("Submit response:", res.data); // Debug log
      setMessage(res.data.msg);
      setTimeout(() => {
        setMessage("");
      }, 2000);

      setProducts(initialState);
      setImages(false);
      fetchProjects(); // Refresh project list after submission
    } catch (error) {
      console.log("Submit error:", error); // Debug log
    }
  };

  const styleUpload = {
    display: images ? 'block' : 'none'
  };

  // Fetching the data
  const fetchProjects = async () => {
    try {
      const res = await axios.get("${API_BASE_URL}/project");
      console.log("Fetched project data:", res.data); // Debug log

      // Ensure that the response is an array
      const projectArray = Array.isArray(res.data.data) ? res.data.data : [];
      setProjectData(projectArray);
    } catch (error) {
      console.log("Fetch data error:", error); // Debug log
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProjects();
  }, []);

  // Delete functionality
  const deleteProject = async (id) => {
    console.log("Deleting project with id:", id); // Debug log

    try {
      const res = await axios.delete(`${API_BASE_URL}/project/${id}`);
      console.log("Delete response:", res.data); // Debug log
      setMessageCond(true);
      setMessage(res.data.msg);
      setTimeout(() => {
        setMessageCond(false);
        setMessage("");
      }, 2000);

      // Update local state
      setProjectData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Delete error:", error); // Debug log
    }
  };

  return (
    <div className="projects-admin-container">
      <div className="projects-form-section">
        <form onSubmit={handleSubmit} className="projects-form">
          <h2 className="projects-form-title">Add New Project</h2>
          
          <div className="projects-form-group">
            <label htmlFor="project-id">Project ID</label>
            <input
              type="text"
              name="product_id"
              id="project-id"
              value={product.product_id}
              onChange={handleChangeInput}
              required
              className="projects-form-input"
            />
          </div>

          <div className="projects-form-group">
            <label htmlFor="project-title">Project Title</label>
            <input
              type="text"
              name="title"
              id="project-title"
              value={product.title}
              onChange={handleChangeInput}
              required
              className="projects-form-input"
            />
          </div>

          <div className="projects-form-group">
            <label htmlFor="project-description">Description</label>
            <textarea
              name="description"
              id="project-description"
              value={product.description}
              onChange={handleChangeInput}
              required
              className="projects-form-textarea"
              rows="4"
            />
          </div>

          <div className="projects-form-group">
            <label htmlFor="project-hostedlink">Project URL</label>
            <input
              type="url"
              name="hostedlink"
              id="project-hostedlink"
              value={product.hostedlink}
              onChange={handleChangeInput}
              required
              className="projects-form-input"
              placeholder="https://example.com"
            />
          </div>

          <div className="projects-upload-section">
            <input
              type="file"
              name="file"
              id="projects-file-up"
              onChange={handleUpload}
              className="projects-file-input"
            />
            
            {images && (
              <div className="projects-uploaded-image-preview">
                <img src={images.url} alt="Uploaded" />
                <button 
                  type="button" 
                  onClick={handleDestroy} 
                  className="projects-remove-image-btn"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          
          <button type="submit" className="projects-submit-btn">
            Add Project
          </button>
        </form>
      </div>

      <div className="projects-list-section">
        <h2 className="projects-section-title">Existing Projects</h2>
        
        <div className="projects-grid">
          {projectData.length > 0 ? (
            projectData.map((project) => (
              <div key={project._id} className="projects-card">
                <div className="projects-card-actions">
                  <Link 
                    to={`/editProject/${project._id}`} 
                    className="projects-edit-btn"
                  >
                    <i className="fas fa-edit"></i>
                  </Link>
                  <button 
                    onClick={() => deleteProject(project._id)} 
                    className="projects-delete-btn"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>

                <div className="projects-card-image">
                  <img 
                    src={project.images?.url || 'fallback-image.png'} 
                    alt={project.title} 
                  />
                </div>

                <div className="projects-card-content">
                  <h3 className="projects-title">{project.title}</h3>
                  <p className="projects-description">{project.description}</p>
                  
                  <div className="projects-links">
                    <a 
                      href={project.hostedlink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="projects-view-btn"
                    >
                      View Project
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="projects-no-projects">No projects found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsAdmin;