import React from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import BubbleSort from '../components/Algorithms/Sorting/BubbleSort';
// Import other algorithm components here

const Algorithms: React.FC = () => {
  const match = useMatch('/algorithms/*');
  const path = match ? match.pathname : '/algorithms';

  return (
    <div>
      <h1>Algorithms</h1>
      <Routes>
        <Route index element={<p>Select an algorithm from the sidebar to visualize.</p>} />
        <Route path="bubble-sort" element={<BubbleSort />} />
        {/* Add routes for other algorithms */}
      </Routes>
    </div>
  );
};

export default Algorithms;