import React from 'react';
import { Link } from 'react-router-dom';
import { FiCpu, FiCode, FiBook, FiPlay, FiBarChart2, FiArrowRight } from 'react-icons/fi';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
    <div className="text-4xl text-indigo-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-6 text-gray-800 animate-fade-in-down">
          算法 <span className="text-indigo-600">可视化</span>
        </h1>
        <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
          通过交互式可视化和逐步解释，探索并掌握数据结构和算法。
        </p>
        <div className="space-x-4">
          <Link to="/data-structures" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-flex items-center">
            探索数据结构 <FiArrowRight className="ml-2" />
          </Link>
          <Link to="/algorithms" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-flex items-center">
            发现算法 <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <FeatureCard 
          icon={<FiCpu />}
          title="数据结构"
          description="可视化并理解各种数据结构，如数组、链表、树等。"
        />
        <FeatureCard 
          icon={<FiCode />}
          title="算法"
          description="通过逐步可视化学习流行的算法，包括排序、搜索和图算法。"
        />
        <FeatureCard 
          icon={<FiPlay />}
          title="交互式模拟"
          description="与可视化交互，控制动画速度，输入自定义数据，获得实践学习体验。"
        />
        <FeatureCard 
          icon={<FiBook />}
          title="全面解释"
          description="获取每种数据结构和算法的详细解释，包括其用例和实现。"
        />
        <FeatureCard 
          icon={<FiBarChart2 />}
          title="复杂度分析"
          description="理解不同操作和算法的时间和空间复杂度。"
        />
      </div>

      <div className="bg-indigo-100 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-indigo-800">准备好开始了吗？</h2>
        <p className="text-xl text-indigo-600 mb-8">选择一个主题，今天就开始你的学习之旅！</p>
        <div className="space-x-4">
          <Link to="/data-structures" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-flex items-center">
            从数据结构开始 <FiArrowRight className="ml-2" />
          </Link>
          <Link to="/algorithms" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-flex items-center">
            从算法开始 <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
