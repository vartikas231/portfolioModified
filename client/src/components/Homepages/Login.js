import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './login.css';
import { DataContext } from '../context/GlobalContext';

const Login = () => {
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const state = useContext(DataContext);
  const [isLogin, setIsLogin] = state.isLogin;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr('');
  }

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:2000/user/login`, {
        email: user.email,
        password: user.password,
      });
      setUser({ username: '', email: '', password: '' });
      localStorage.setItem('tokenStore', res.data.token);
      setIsLogin(true);
      setErr(res.data.msg);
      navigate("/admin");
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg)
    }
  }

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:2000/user/register`, {
        username: user.username,
        email: user.email,
        password: user.password,
      });
      setUser({ username: '', email: '', password: '' });
      setErr(res.data.msg);
      setIsLoginForm(true);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  }

  return (
    <div className="login-page">
      <div className="login-main-container">
        <h3 className="login-title">{isLoginForm ? 'Login for admin' : 'Register new account'}</h3>
        <div className="login-form-container">
          <form onSubmit={isLoginForm ? loginSubmit : registerSubmit} className="login-form">
            <p className="login-error-message">{err}</p>

            {!isLoginForm && (
              <>
                <label htmlFor="login-username" className="login-label">Username</label>
                <input
                  type="text"
                  id="login-username"
                  className="login-input"
                  placeholder="Enter username..."
                  name="username"
                  value={user.username}
                  onChange={onChangeInput}
                  required
                />
              </>
            )}

            <label htmlFor="login-email" className="login-label">Email</label>
            <input
              type="email"
              id="login-email"
              className="login-input"
              placeholder="Enter email..."
              name="email"
              value={user.email}
              onChange={onChangeInput}
              required
            />

            <label htmlFor="login-password" className="login-label">Password</label>
            <input
              type="password"
              id="login-password"
              className="login-input"
              placeholder="Enter password..."
              name="password"
              value={user.password}
              onChange={onChangeInput}
              required
            />

            <div className="login-button-container">
              <button type="submit" className="login-submit-btn">
                {isLoginForm ? 'Login' : 'Register'}
              </button>
              <Link to="/">
                <button className="login-home-btn">Home</button>
              </Link>
            </div>

            <p className="login-toggle-form">
              {isLoginForm ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => {
                setIsLoginForm(!isLoginForm);
                setUser({ username: '', email: '', password: '' });
                setErr('');
              }} className="login-toggle-link">
                {isLoginForm ? 'Register here' : 'Login here'}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;