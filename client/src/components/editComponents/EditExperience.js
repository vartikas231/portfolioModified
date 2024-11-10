import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./edit.css";
import axios from "axios";

const EditExperience = () => {
  const [experience, setExperience] = useState({
    role: "",
    company: "",
    duration: "",
    description: "",
    skillsUsed: "",
    achievements: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/experience/${id}`);
        if (response.data) {
          setExperience({
            ...response.data,
            skillsUsed: response .data.skillsUsed.join(', '),
            achievements: response.data.achievements.join('\n')
          });
        }
      } catch (error) {
        console.error("Error fetching experience:", error);
        setMessage("Error fetching experience data");
      }
    };

    if (id) {
      fetchExperience();
    }
  }, [id]);

  const onchangeExperience = (e) => {
    setExperience({ ...experience, [e.target.name]: e.target.value });
  };

  const updateExperience = async (e) => {
    e.preventDefault();
    
    try {
      const postExperience = {
        ...experience,
        skillsUsed: experience.skillsUsed.split(',').map(skill => skill.trim()),
        achievements: experience.achievements.split('\n').filter(item => item.trim() !== '')
      };

      const response = await axios.put(
        `http://localhost:2000/experience/update/${id}`,
        postExperience
      );

      setMessage(response.data.msg);
      
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      console.error("Error updating experience:", error);
      setMessage("Error updating experience");
    }
  };

  return (
    <div className="edit">
      <div className="main-container">
        <div className="same-component">
          <div className="same-form">
            <form onSubmit={updateExperience}>
              {message && <div className="updated">{message}</div>}
              <h4>Experience Component</h4>
              <input type="text" name="role" placeholder="Role" onChange={onchangeExperience} value={experience.role} required />
              <input type="text" name="company" placeholder="Company" onChange={onchangeExperience} value={experience.company} required />
              <input type="text" name="duration" placeholder="Duration" onChange={onchangeExperience} value={experience.duration} required />
              <textarea name="description" placeholder="Description" onChange={onchangeExperience} value={experience.description} required />
              <input type="text" name="skillsUsed" placeholder="Skills Used (comma-separated)" onChange={onchangeExperience} value={experience.skillsUsed} />
              <textarea name="achievements" placeholder="Achievements (one per line)" onChange={onchangeExperience} value={experience.achievements} />
              <div className="btns">
                <button type="submit">Update Experience</button>
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

export default EditExperience;