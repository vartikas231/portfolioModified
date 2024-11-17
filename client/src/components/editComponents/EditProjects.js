import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./edit.css"
import axios from "axios";

const initialState = {
  product_id: "",
  title: "",
  description: "",
  hostedlink: ""

};

const EditProjects = () => {
  const [product, setProducts] = useState(initialState);
  const [images, setImages] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch project data when component mounts
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:2000/project/${id}`);
        
        if (response.data) {
          const { product_id, title, description, images ,hostedlink } = response.data;
          setProducts({
            product_id,
            title,
            description,
            hostedlink
          });
          setImages(images);
        }
      } catch (error) {
        setMessage(error.response?.data?.msg || "Error fetching project");
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchProject();
    }
  }, [id]);

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        setMessage("No files exist");
        return;
      }
  
      if (file.size > 1024 * 1024) {
        setMessage("Size is too big!");
        return;
      }
  
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        setMessage("Incorrect file format!");
        return;
      }
  
      let formData = new FormData();
      formData.append("file", file);
  
      setLoading(true);
      const response = await axios.post("http://localhost:2000/upload", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setImages(response.data);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!images.public_id) return;
      
      setLoading(true);
      await axios.post("http://localhost:2000/destroy", { public_id: images.public_id });
      setLoading(false);
      setImages(false);
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.msg || "Error deleting image");
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProducts(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!images) {
        setMessage("Please upload an image");
        return;
      }
  
      setLoading(true);
      const response = await axios.put(`http://localhost:2000/project/${id}`, {
        product_id: product.product_id,
        title: product.title,
        description: product.description,
        hostedlink:product.hostedlink,
        images: images
      });
  
      setMessage(response.data.msg);
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Error updating project");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="edit">
      <div className="main-container">
        <div className="same-container">
          <div className="same-form">
            <form onSubmit={handleSubmit}>
              {message && <h3 className="updated">{message}</h3>}
              <h4>Project Components</h4>
              
              <div className="form-group">
                <label htmlFor="product-id">Id</label>
                <input
                  type="text"
                  name="product_id"
                  required
                  id="product-id"
                  value={product.product_id}
                  onChange={handleChangeInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  id="title"
                  value={product.title}
                  onChange={handleChangeInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="hostedlink">Hosted Link</label>
                <input
                  type="text"
                  name="hostedlink"
                  required
                  id="hostedlink"
                  value={product.hostedlink}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChangeInput}
                  required
                  id="description"
                  cols="30"
                  rows="3"
                />
              </div>


              <div className="upload">
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  onChange={handleUpload}
                  disabled={loading}
                />

                {images && (
                  <div id="file_img">
                    <img src={images.url} alt="" />
                    <button 
                      type="button" 
                      onClick={handleDestroy} 
                      disabled={loading}
                    >X</button>
                  </div>
                )}
              </div>

              <div className="btns">
                <button 
                  type="submit" 
                  className="submit-btn" 
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Project'}
                </button>
                <Link to="/admin">
                  <button type="button" className="cancel-btn">Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjects;