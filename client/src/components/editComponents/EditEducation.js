import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEducation = () => {
  const [education, setEducation] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/education/${id}`);
        setEducation(response.data.education);
      } catch (error) {
        console.error('Error fetching education:', error);
        setMessage('Error fetching education details');
      }
    };

    fetchEducation();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Using your existing update route
      const response = await axios.put(
        `http://localhost:2000/education/update/${id}`,
        { education }
      );

      setMessage('Education updated successfully');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error updating education:', error);
      setMessage(error.response?.data?.msg || 'Error updating education');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit-education">
      <h1 className="title">Edit Education</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="education-form">
          <label htmlFor="education">Education</label>
          <input
            type="text"
            id="education"
            value={education || ''}
            onChange={(e) => setEducation(e.target.value)}
            placeholder="Enter your education"
            required
            disabled={isLoading}
          />
          <div className="button-group">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Education'}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/')}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {message && (
        <div className={`message-alert ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default EditEducation;