import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DataStructures from './pages/DataStructures';
import Algorithms from './pages/Algorithms';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="data-structures/*" element={<DataStructures />} />
          <Route path="algorithms/*" element={<Algorithms />} />
          {/* 重定向任何未匹配的路由到主页 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;