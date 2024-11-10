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
    <div className="education-admin">
      <h1 className="title">Education Management</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="education-form">
          <label htmlFor="education">Education</label>
          <input
            type="text"
            id="education"
            value={education}
            onChange={onChangeEducation}
            placeholder="Enter your education"
            required
          />
          <button type="submit" className="submit-btn">Add Item</button>
        </form>
      </div>

      <div className="education-list">
        {educationData.map((item) => (
          <div className="education-item" key={item._id}>
            <div className="icons">
              <Link to={`/editEducation/${item._id}`} className="edit-icon">
                <i className="fas fa-edit"></i>
              </Link>
              <i
                className="fas fa-trash delete-icon"
                onClick={() => deleteEducation(item._id)}
              ></i>
            </div>
            <div className="single-education">
              <p>{item.education}</p>
            </div>
          </div>
        ))}
      </div>
      {message && (
        <div className={`message-alert ${messageCond ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default EducationAdmin;