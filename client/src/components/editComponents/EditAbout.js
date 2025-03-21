import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./edit.css";
import axios from 'axios';
import API_BASE_URL from "../../apiConfig";


const EditAbout = () => {
  const [about, setAbout] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/about/${id}`)
      .then((res) => {
        setAbout(res.data.about);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const onchangeAbout = (e) => {
    setAbout(e.target.value);
  };

  const updateAbout = (e) => {
    e.preventDefault();
    const postAbout = {
      about
    };
    axios.put(`${API_BASE_URL}/about/update/${id}`, postAbout)
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
            <form onSubmit={updateAbout}>
              <h3 className="updated">{message}</h3>
              <label htmlFor="text">About</label>
              <textarea
                value={about}
                onChange={onchangeAbout}
                name="textarea"
                id=""
                cols="30"
                rows="3"
              />
              <div className="btns">
                <button type="submit">Update Item</button>
                <Link to="/admin">
                  <button className="cancel-btn">Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAbout;