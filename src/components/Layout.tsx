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
      <aside className={`bg-indigo-700 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}>
        <nav className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded transition duration-200 ${
                location.pathname === item.path ? 'bg-indigo-800' : 'hover:bg-indigo-600'
              }`}
            >
              {item.icon}
              <span>{item.text}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-white hover:text-indigo-200">
            <FiGithub />
            <span>GitHub</span>
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">算法可视化</h1>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;