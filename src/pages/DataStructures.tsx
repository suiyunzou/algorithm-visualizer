import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiGrid, FiLink, FiLayers, FiList, FiGitBranch, FiShare2, FiHash } from 'react-icons/fi';
import Array from '../components/DataStructures/Array';

const DataStructures: React.FC = () => {
  return (
    <div className="h-full flex">
      {/* 左侧导航 */}
      <div className="w-72 bg-white shadow-sm p-4 overflow-y-auto">
        <div className="space-y-4">
          <Link 
            to="/data-structures/array" 
            className="block p-3 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="text-indigo-600">
                <FiGrid size={20} />
              </div>
              <div>
                <h3 className="font-medium">数组</h3>
                <p className="text-sm text-gray-500">在连续内存位置存储的元素集合</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/data-structures/linked-list" 
            className="block p-3 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="text-indigo-600">
                <FiLink size={20} />
              </div>
              <div>
                <h3 className="font-medium">链表</h3>
                <p className="text-sm text-gray-500">元素的链性集合，其顺序不由物理内存位置给出</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/data-structures/stack" 
            className="block p-3 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="text-indigo-600">
                <FiLayers size={20} />
              </div>
              <div>
                <h3 className="font-medium">栈</h3>
                <p className="text-sm text-gray-500">后进先出 (LIFO) 数据结构</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/data-structures/queue" 
            className="block p-3 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="text-indigo-600">
                <FiList size={20} />
              </div>
              <div>
                <h3 className="font-medium">队列</h3>
                <p className="text-sm text-gray-500">先进先出 (FIFO) 数据结构</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/data-structures/binary-tree" 
            className="block p-3 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="text-indigo-600">
                <FiGitBranch size={20} />
              </div>
              <div>
                <h3 className="font-medium">二叉树</h3>
                <p className="text-sm text-gray-500">每个节点最多有两个子节点的树数据结构</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/data-structures/graph" 
            className="block p-3 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="text-indigo-600">
                <FiShare2 size={20} />
              </div>
              <div>
                <h3 className="font-medium">图</h3>
                <p className="text-sm text-gray-500">由节点和边组成的非线性数据结构</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/data-structures/hash-table" 
            className="block p-3 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="text-indigo-600">
                <FiHash size={20} />
              </div>
              <div>
                <h3 className="font-medium">哈希表</h3>
                <p className="text-sm text-gray-500">实现关联数组抽象数据类型的数据结构</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 右侧内容区域 */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DataStructures;