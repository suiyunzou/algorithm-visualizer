import React, { useState } from 'react';
import { Route, Routes, useMatch, Link } from 'react-router-dom';
import { FiSearch, FiChevronRight, FiSettings, FiBook, FiCode, FiCpu } from 'react-icons/fi';
import Array from '../components/DataStructures/Array';
// Import other data structure components here

const DataStructures: React.FC = () => {
  const match = useMatch('/data-structures/*');
  const path = match ? match.pathname : '/data-structures';
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const dataStructures = [
    { name: '数组', path: 'array', description: '在连续内存位置存储的元素集合', icon: <FiCpu /> },
    { name: '链表', path: 'linked-list', description: '元素的线性集合，其顺序不由物理内存位置给出', icon: <FiCode /> },
    { name: '栈', path: 'stack', description: '后进先出（LIFO）数据结构', icon: <FiBook /> },
    { name: '队列', path: 'queue', description: '先进先出（FIFO）数据结构', icon: <FiCode /> },
    { name: '二叉树', path: 'binary-tree', description: '每个节点最多有两个子节点的树数据结构', icon: <FiCpu /> },
    { name: '图', path: 'graph', description: '由节点和边组成的非线性数据结构', icon: <FiBook /> },
    { name: '哈希表', path: 'hash-table', description: '实现关联数组抽象数据类型的数据结构', icon: <FiCpu /> },
  ];

  const filteredDataStructures = dataStructures.filter(ds => 
    ds.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ds.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-8 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold">数据结构探索器</h1>
          <nav>
            <Link to="/" className="text-white hover:text-blue-200 mr-6 text-lg">首页</Link>
            <Link to="/algorithms" className="text-white hover:text-blue-200 text-lg">算法</Link>
          </nav>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden container mx-auto mt-8">
        <nav className="w-1/3 bg-white p-6 overflow-y-auto shadow-xl rounded-lg mr-8">
          <div className="mb-6 relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="搜索数据结构..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="space-y-4">
            {filteredDataStructures.map((ds) => (
              <li key={ds.path}>
                <Link
                  to={`${path}/${ds.path}`}
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-blue-600 flex items-center">
                      {ds.icon}
                      <span className="ml-2">{ds.name}</span>
                    </span>
                    <FiChevronRight className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{ds.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1 bg-white p-8 overflow-y-auto relative shadow-xl rounded-lg">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="absolute top-4 right-4 p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition-colors duration-200"
          >
            <FiSettings />
          </button>
          {showSettings && (
            <div className="absolute top-16 right-4 w-64 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-blue-600">设置</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">动画速度</label>
                <input type="range" min="1" max="10" className="w-full" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">数组大小</label>
                <input type="number" min="1" max="100" className="w-full border rounded p-1" />
              </div>
            </div>
          )}
          <Routes>
            <Route index element={
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-blue-700">欢迎来到数据结构</h2>
                <p className="text-gray-700 mb-6 text-lg">从侧边栏选择一个数据结构开始学习和可视化。每个数据结构都包含：</p>
                <ul className="list-none space-y-4 mb-8">
                  {[
                    { text: '清晰的可视化和动画', icon: <FiCpu /> },
                    { text: '逐步执行选项', icon: <FiCode /> },
                    { text: '可调整的动画速度', icon: <FiSettings /> },
                    { text: '自定义输入功能', icon: <FiBook /> },
                    { text: '复杂度分析', icon: <FiChevronRight /> }
                  ].map((item, index) => (
                    <li key={index} className="flex items-center bg-blue-50 p-3 rounded-lg">
                      <span className="bg-blue-100 text-blue-700 rounded-full p-2 mr-4">
                        {item.icon}
                      </span>
                      {item.text}
                    </li>
                  ))}
                </ul>
                <img src="/images/data-structures-intro.svg" alt="数据结构" className="mx-auto w-full max-w-lg rounded-lg shadow-lg" />
              </div>
            } />
            <Route path="array" element={<Array />} />
            {/* Add routes for other data structures */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DataStructures;