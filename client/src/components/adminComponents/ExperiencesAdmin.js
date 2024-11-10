import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './admin.css'

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:2000/experience`);
        setExperienceData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onChangeExperience = (e) => {
    setExperience({ ...experience, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postExperience = {
      ...experience,
      skillsUsed: experience.skillsUsed.split(',').map(skill => skill.trim()),
      achievements: experience.achievements.split('\n').filter(item => item.trim() !== '')
    };

    axios.post(`http://localhost:2000/experience`, postExperience)
      .then((res) => {
        setExperienceData([...experienceData, res.data]);
        setExperience({
          role: "",
          company: "",
          duration: "",
          description: "",
          skillsUsed: "",
          achievements: ""
        });
      })
      .catch((err) => console.log(err));
  };

  const deleteExperience = (id) => {
    axios.delete(`http://localhost:2000/experience/${id}`)
      .then((res) => {
        setMessageCond(true);
        setMessage(`${res.data.msg}`);

        setTimeout(() => {
          setMessage("");
          setMessageCond(false);
        }, 2000);

        setExperienceData(experienceData.filter((item) => item._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="same-component">
      <div className="same-form">
        <form onSubmit={handleSubmit}>
          <h4>Experience Component</h4>
          <input type="text" name="role" placeholder="Role" onChange={onChangeExperience} value={experience.role} required />
          <input type="text" name="company" placeholder="Company" onChange={onChangeExperience} value={experience.company} required />
          <input type="text" name="duration" placeholder="Duration" onChange={onChangeExperience} value={experience.duration} required />
          <textarea name="description" placeholder="Description" onChange={onChangeExperience} value={experience.description} required />
          <input type="text" name="skillsUsed" placeholder="Skills Used (comma-separated)" onChange={onChangeExperience} value={experience.skillsUsed} />
          <textarea name="achievements" placeholder="Achievements (one per line)" onChange={onChangeExperience} value={experience.achievements} />
          <button type="submit">Add Experience</button>
        </form>
      </div>

      <div className="same-item">
        <div className="experience-info">
          {experienceData.map((item) => (
            <div className="same-admin" key={item._id}>
              <div className="icons">
                <Link to={`/editExperience/${item._id}`}>
                  <i className="fas fa-edit"></i>
                </Link>
                <i className="fas fa-trash" onClick={() => deleteExperience(item._id)}></i>
              </div>
              <div className="single-experience">
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
              <h3 className={messageCond ? "new-delete item-delete-tab" : "item-delete-tab"}>
                {message}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperiencesAdmin;