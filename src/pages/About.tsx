import React from 'react';

const About: React.FC = () => {
  return (
    <div className="about">
      <h1>About Algorithm Visualizer</h1>
      <p>
        Algorithm Visualizer is an interactive learning platform designed to help
        beginners understand data structures and algorithms through visual representations.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Interactive visualizations of various data structures</li>
        <li>Step-by-step algorithm execution with adjustable speed</li>
        <li>Explanations and complexity analysis for each algorithm</li>
        <li>Custom input options for hands-on learning</li>
      </ul>
    </div>
  );
};

export default About;