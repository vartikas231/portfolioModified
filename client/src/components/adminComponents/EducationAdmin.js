// EducationAdmin.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EducationAdmin = () => {
  const [education, setEducation] = useState('');
  const [educationData, setEducationData] = useState([]);
  const [message, setMessage] = useState('');
  const [messageCond, setMessageCond] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:2000/education`);
        setEducationData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onChangeEducation = (e) => {
    setEducation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postEducation = {
      education,
    };
    setEducation("");

    axios
      .post(`http://localhost:2000/education`, postEducation)
      .then((res) => {
        setMessage(res.data.msg);
        setMessageCond(true);
        setTimeout(() => {
          setMessage("");
          setMessageCond(false);
        }, 2000);
        setEducationData(prev => [...prev, res.data.education]);
      })
      .catch((err) => console.log(err));
  };

  const deleteEducation = (id) => {
    axios
      .delete(`http://localhost:2000/education/${id}`)
      .then((res) => {
        setMessageCond(true);
        setMessage(`${res.data.msg}`);
        setEducationData(prev => prev.filter(item => item._id !== id));
        setTimeout(() => {
          setMessage("");
          setMessageCond(false);
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="edu-admin-container">
      <h1 className="edu-admin-title">Education Management</h1>
      
      <div className="edu-form-wrapper">
        <form onSubmit={handleSubmit} className="edu-input-form">
          <label htmlFor="education">Education</label>
          <input
            type="text"
            id="education"
            value={education}
            onChange={onChangeEducation}
            placeholder="Enter your education"
            required
          />
          <button type="submit" className="edu-submit-button">Add Item</button>
        </form>
      </div>

      <div className="edu-items-container">
        {educationData.map((item) => (
          <div className="edu-item-wrapper" key={item._id}>
            <div className="edu-item-content">
              <p className="edu-item-text">{item.education}</p>
            </div>
            <div className="edu-item-actions">
              <Link 
                to={`/editEducation/${item._id}`} 
                className="edu-edit-link"
              >
                <i className="fas fa-edit edu-edit-icon"></i>
              </Link>
              <i
                className="fas fa-trash edu-delete-icon"
                onClick={() => deleteEducation(item._id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
      
      {message && (
        <div className={`edu-message-alert ${messageCond ? 'edu-success' : 'edu-error'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default EducationAdmin;