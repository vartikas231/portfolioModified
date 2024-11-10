import Header from "./Header";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import Achievements from "./Experience";

import React from "react";
import { Element } from "react-scroll";


import Footer from "./Footer";
import Education from "./Education";

const Main = () => {
  return (
    <div>
      <Element>
        <Header />
      </Element>
      <About />
      <Education />
      <Projects />
      <Element>
        <Achievements />
      </Element>

      <Contact />
      <Footer />
    </div>
  );
};

export default Main;
