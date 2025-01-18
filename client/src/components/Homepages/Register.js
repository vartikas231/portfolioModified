import React ,{useState} from 'react'
import { Link ,useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  // register submit
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/user/register`, {
      username:user.username,  
      email: user.email,
        password: user.password,
      })
      setUser({ username: "", email: "", password: "" });
      setErr(res.data.msg);
      navigate("/admin");
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  return (
    <>
      <div className="login">
        <div className="main-container">
          <h3 className="title">Login for admin</h3>
          <div className="login-center">
            <form onSubmit={registerSubmit}>
              <p>{err}</p>

              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="input name...."
                name="username"
                value={user.username}
                onChange={onChangeInput}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="input email...."
                name="email"
                value={user.email}
                onChange={onChangeInput}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="input password...."
                name="password"
                value={user.password}
                onChange={onChangeInput}
                required
              />

              <div className="login-btn">
                <button type="submit">Register</button>
                <Link to="/">
                  <button>  Home</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Register */}
    </>
  );
};
export default Register