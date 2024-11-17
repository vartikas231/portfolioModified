import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { scroller } from "react-scroll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faGraduationCap, 
  faClock, 
  faCode, 
  faEnvelope, 
  faLock, 
  faSignInAlt, 
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';
import { DataContext } from "../context/GlobalContext";

const Navbar = () => {
  const state = useContext(DataContext);
  const [isLogin, setIsLogin] = state.isLogin;

  const scrollToElement = (elementId) => {
    scroller.scrollTo(elementId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -70,
    });
  };

  const logOutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <div className="nav-container">
      <nav>
        <div className="logoBtn">
          <Link to="/" onClick={() => scrollToElement("home")}>
            <span>Vartika Sharma</span>
          </Link>
        </div>

        <div className="links">
          <ul>
            <li>
              <Link to="/" onClick={() => scrollToElement('about')}>
                <FontAwesomeIcon icon={faUser} />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => scrollToElement('education')}>
                <FontAwesomeIcon icon={faGraduationCap} />
                <span>Education</span>
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => scrollToElement('experience')}>
                <FontAwesomeIcon icon={faClock} />
                <span>Experience</span>
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => scrollToElement('projects')}>
                <FontAwesomeIcon icon={faCode} />
                <span>Projects</span>
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => scrollToElement('contact')}>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>Contact</span>
              </Link>
            </li>
            
            <li className="icon-button" onClick={logOutSubmit}>
              <Link to={isLogin ? "/" : "/login"}>
                <FontAwesomeIcon icon={isLogin ? faSignOutAlt : faSignInAlt} />
                <span>{isLogin ? "Logout" : "Login"}</span>
              </Link>
            </li>
            
            {isLogin && (
              <li className="icon-button">
                <Link to="/admin">
                  <FontAwesomeIcon icon={faLock} />
                  <span>Admin</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;