import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/algorithms">算法</Link></li>
          <li><Link to="/data-structures">数据结构</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;