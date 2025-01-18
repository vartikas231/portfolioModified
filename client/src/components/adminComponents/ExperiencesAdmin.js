import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './admin.css';
import API_BASE_URL from "../../apiConfig";


const ExperiencesAdmin = () => {
  const [experience, setExperience] = useState({
    role: "",
    company: "",
    duration: "",
    description: "",
    skillsUsed: "",
    achievements: ""
  });
  const [experienceData, setExperienceData] = useState([]);
  const [message, setMessage] = useState("");
  const [messageCond, setMessageCond] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/experience`);
        setExperienceData(res.data);
      } catch (error) {
        console.error("Error fetching experience data:", error);
        setMessage("Error fetching experience data");
        setMessageCond(true);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchData();
  }, []);

  const onChangeExperience = (e) => {
    setExperience({ ...experience, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postExperience = {
      ...experience,
      skillsUsed: experience.skillsUsed.split(',').map(skill => skill.trim()),
      achievements: experience.achievements.split('\n').filter(item => item.trim() !== '')
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/experience`, postExperience);
      setExperienceData([...experienceData, res.data]);
      setExperience({
        role: "",
        company: "",
        duration: "",
        description: "",
        skillsUsed: "",
        achievements: ""
      });
      setMessage("Experience added successfully!");
      setMessageCond(true);
    } catch (err) {
      console.error("Error adding experience:", err);
      setMessage("Error adding experience");
      setMessageCond(true);
    }
  };

  const deleteExperience = async (id) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/experience/${id}`);
      setMessageCond(true);
      setMessage(`${res.data.msg}`);
      setExperienceData(experienceData.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting experience:", err);
      setMessage("Error deleting experience");
      setMessageCond(true);
    } finally {
      setTimeout(() => {
        setMessage("");
        setMessageCond(false);
      }, 2000);
    }
  };

  return (
    <div className="admin-experience-container">
      <div className="admin-experience-form">
        <form onSubmit={handleSubmit}>
          <h4 className="form-title">Experience Component</h4>
          <input type="text" name="role" placeholder="Role" onChange={onChangeExperience} value={experience.role} required />
          <input type="text" name="company" placeholder="Company" onChange={onChangeExperience} value={experience.company} required />
          <input type="text" name="duration" placeholder="Duration" onChange={onChangeExperience} value={experience.duration} required />
          <textarea name="description" placeholder="Description" onChange={onChangeExperience} value={experience.description} required />
          <input type="text" name="skillsUsed" placeholder="Skills Used (comma-separated)" onChange={onChangeExperience} value={experience.skillsUsed} />
          <textarea name="achievements" placeholder="Achievements (one per line)" onChange={onChangeExperience} value={experience.achievements} />
          <button type="submit">Add Experience</button>
        </form>
      </div>

      <div className="admin-experience-list">
        <div className="experience-info">
          {loading ? (
            <p>Loading experiences...</p>
          ) : (
            experienceData.map((item) => (
              <div className="admin-experience-item" key={item._id}>
                <div className="admin-experience-icons">
                  <Link to={`/editExperience/${item._id}`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                  <i className="fas fa-trash" onClick={() => deleteExperience(item._id)}></i>
                </div>
                <div className="admin-single-experience">
                  <h3>{item.role} at {item.company}</h3>
                  <p>{item.duration}</p>
                  <p>{item.description}</p>
                  <p>Skills: {item.skillsUsed.join(', ')}</p>
                  <ul>
                    {item.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
                {messageCond && (
                  <h3 className="admin-item-delete-tab">{message}</h3>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperiencesAdmin;