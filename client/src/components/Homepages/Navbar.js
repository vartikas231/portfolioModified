import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { scroller } from "react-scroll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faGraduationCap, faTrophy, faCode, faEnvelope, faLock, faSignInAlt, faSignOutAlt, faBagShopping, faClock } from '@fortawesome/free-solid-svg-icons';
import { DataContext } from "../context/GlobalContext";

const Navbar = () => {
  const state = useContext(DataContext);
  const [isLogin, setIsLogin] = state.isLogin;
  const [toggle, setToggle] = useState(false);

  // Improved scroll function
  const scrollToElement = (elementId) => {
    scroller.scrollTo(elementId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -70, 
    });
  };

  const actToggle = () => {
    setToggle(!toggle);
  };

  const closeNavbar = () => {
    if (toggle === true) {
      setToggle(false);
    }
  };

  const logOutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  // Combined click handler for navigation items
  const handleNavClick = (elementId) => {
    closeNavbar();
    scrollToElement(elementId);
  };

  return (
    <div className="nav-container">
      <nav>
        <div className="logoBtn">
          <Link to="/" onClick={() => handleNavClick("home")}>
            <span>Vartika Sharma</span>
          </Link>

          <button className={`btn ${toggle ? 'animateBar' : ''}`} onClick={actToggle}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </button>
        </div>

        <div className={`links ${toggle ? 'new-links' : ''}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => handleNavClick('about')}>
                <FontAwesomeIcon icon={faUser} /> About
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => handleNavClick('education')}>
                <FontAwesomeIcon icon={faGraduationCap} /> Education
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => handleNavClick('experience')}>
                <FontAwesomeIcon icon={faClock} /> Experience
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => handleNavClick('projects')}>
                <FontAwesomeIcon icon={faCode} /> Projects
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => handleNavClick('contact')}>
                <FontAwesomeIcon icon={faEnvelope} /> Contact
              </Link>
            </li>
            
            <li className="icon-button" onClick={logOutSubmit}>
              <Link to={isLogin ? "/" : "/login"} title={isLogin ? "Logout" : "Login"}>
                <FontAwesomeIcon icon={isLogin ? faSignOutAlt : faSignInAlt} />
              </Link>
            </li>
            
            {isLogin && (
              <li className="icon-button">
                <Link to="/admin" title="Admin">
                  <FontAwesomeIcon icon={faLock} />
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