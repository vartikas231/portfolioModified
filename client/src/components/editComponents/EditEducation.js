import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditEducation = () => {
  const [education, setEducation] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:2000/education/${id}`)
      .then((res) => {
        setEducation(res.data.education);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const onchangeEducation = (e) => {
    setEducation(e.target.value);
  };

  const updateEducation = (e) => {
    e.preventDefault();
    const postEducation = {
      education,
    };
    
    axios
      .put(`http://localhost:2000/education/${id}`, postEducation)
      .then((res) => {
        setMessage(res.data.msg);
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="edit">
      <div className="main-container">
        <div className="same-component">
          <div className="same-form">
            <form onSubmit={updateEducation}>
              {message && <h3 className="updated">{message}</h3>}
              <h4>Education component</h4>
              <label htmlFor="text">Education</label>
              <input
                type="text"
                value={education}
                onChange={onchangeEducation}
                required
              />
              <div className="btns">
                <button type="submit">Update item</button>
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

export default EditEducation;