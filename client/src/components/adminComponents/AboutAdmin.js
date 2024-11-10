import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./admin.css";
import axios from "axios";

const AboutAdmin = () => {
  const [about, setAbout] = useState("");
  const [aboutData, setAboutData] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch about data
  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`http://localhost:2000/about`);
      setAboutData(res.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch about data");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setAbout(e.target.value);
  };

  // Submit about
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!about.trim()) {
      setMessage("Please enter some text");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      setIsLoading(true);
      const postAbout = { about };
      const response = await axios.post(`http://localhost:2000/about`, postAbout);
      
      // Update UI immediately
      setAboutData([...aboutData, response.data]);
      setAbout("");
      setMessage("Successfully added!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to add about text");
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete about
  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:2000/about/${id}`);
      
      // Update UI immediately
      setAboutData(aboutData.filter(item => item._id !== id));
      setMessage("Successfully deleted!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to delete item");
      console.error("Delete error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="same-component">
      {/* Form Section */}
      <div className="same-form">
        <form onSubmit={handleSubmit}>
          <h4>About Component</h4>
          <label htmlFor="about">About</label>
          <input
            id="about"
            type="text"
            value={about}
            onChange={handleInputChange}
            placeholder="Enter about text..."
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? 'Adding...' : 'Add Item'}
          </button>
        </form>
      </div>

      {/* Display Section */}
      <div className="same-item">
        {aboutData.length === 0 && !isLoading && (
          <p className="no-data">No about items found</p>
        )}
        
        {aboutData.map((item) => (
          <div className="about-info" key={item._id}>
            <div className="icons">
              <Link 
                to={`/edit/${item._id}`}
                className="edit-link"
                title="Edit item"
              >
                <i className="fas fa-edit"></i>
              </Link>
              <button
                className="delete-button"
                onClick={() => handleDelete(item._id)}
                disabled={isLoading}
                title="Delete item"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
            <p className="about-text">{item.about}</p>
          </div>
        ))}
      </div>

      {/* Message Display */}
      {message && (
        <div className={`message-container ${message.includes('Failed') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AboutAdmin;