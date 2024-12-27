import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiCpu, FiCode, FiGithub } from 'react-icons/fi';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <FiHome />, text: '首页' },
    { path: '/data-structures', icon: <FiCpu />, text: '数据结构' },
    { path: '/algorithms', icon: <FiCode />, text: '算法' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`
          bg-indigo-700 text-white 
          ${sidebarOpen ? 'w-64' : 'w-16'}
          space-y-6 py-7 px-2 absolute inset-y-0 left-0 
          transform transition-all duration-300 ease-in-out z-20
          md:relative overflow-hidden
        `}
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <nav className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center px-4 py-2.5 rounded 
                transition duration-200
                ${location.pathname === item.path ? 'bg-indigo-800' : 'hover:bg-indigo-600'}
              `}
            >
              <div className="min-w-[24px] flex items-center justify-center">
                {item.icon}
              </div>
              <span className={`
                ml-3 
                ${sidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'} 
                transition-all duration-300
                overflow-hidden whitespace-nowrap
              `}>
                {item.text}
              </span>
            </Link>
          ))}
        </nav>
        
        {/* GitHub Link */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white hover:text-gray-200 transition-colors"
          >
            <div className="min-w-[24px] flex items-center justify-center">
              <FiGithub size={20} />
            </div>
            <span className={`
              ml-3
              ${sidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'} 
              transition-all duration-300
              overflow-hidden whitespace-nowrap
            `}>
              GitHub
            </span>
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="h-full">
          <div className="container mx-auto px-4 py-6 h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;