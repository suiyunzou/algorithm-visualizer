import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiHome, FiDatabase, FiCode, FiMessageSquare } from 'react-icons/fi';

const Layout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { path: '/', icon: FiHome, label: '首页' },
    { path: '/data-structures', icon: FiDatabase, label: '数据结构' },
    { path: '/algorithms', icon: FiCode, label: '算法' },
    { path: '/ai-chat', icon: FiMessageSquare, label: 'AI 助手' }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-600 text-white">
        <nav className="mt-5">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-lg hover:bg-indigo-700 transition-colors ${
                isActive(item.path) ? 'bg-indigo-700' : ''
              }`}
            >
              <item.icon className="mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
