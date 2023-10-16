import React from 'react';
import "./App.css";
import Section from './components/Section';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import MobileNav from './components/MobileNav';

import data from "./data/data.json"

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="mobileHeader">
        <div className="mobileNav">
          <MobileNav />
        </div>
      </div>
      <div className="Navigation">
        <Navigation />
      </div>
      <div className="sectionBody">
        <Hero />
        {data.workExperience.map((experience, index) => (
          <Section
            key={index}
            experience={experience}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
