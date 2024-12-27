import React from 'react';
import { motion } from 'framer-motion';
import { FiInfo, FiClock, FiList, FiCode } from 'react-icons/fi';
import { Feature, Complexity, ComplexityAnalysis } from '../../types';

interface DataStructureLayoutProps {
  title: string;
  visualization: React.ReactNode;
  operations: React.ReactNode;
  features: Feature;
  complexity: Complexity;
}

const DataStructureLayout: React.FC<DataStructureLayoutProps> = ({
  title,
  visualization,
  operations,
  features,
  complexity
}) => {
  console.log('Complexity prop:', complexity);
  return (
    <motion.div 
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-3xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      
      <div className="flex flex-col gap-6">
        {/* 可视化区域 */}
        <motion.div 
          className="w-full bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
          transition={{ duration: 0.5 }}
        >
          {visualization}
        </motion.div>

        {/* 操作区域 */}
        <motion.div 
          className="w-full bg-white rounded-xl shadow-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <FiCode className="text-blue-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-800">操作面板</h3>
          </div>
          {operations}
        </motion.div>

        {/* 特点和性能分析 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 特点说明 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FiList className="text-blue-500 text-xl" />
              <h3 className="text-lg font-semibold text-gray-800">{features.title}</h3>
            </div>
            <ul className="space-y-3">
              {features.items.map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-3 text-gray-600"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-400 shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* 性能分析 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FiClock className="text-blue-500 text-xl" />
              <h3 className="text-lg font-semibold text-gray-800">{complexity.title}</h3>
            </div>
            <div className="space-y-6">
              {/* 总体复杂度概览 */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-3">复杂度概览</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-blue-600 mb-1">最优情况</p>
                    <p className="font-mono text-sm">{complexity.summary.bestCase}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">平均情况</p>
                    <p className="font-mono text-sm">{complexity.summary.averageCase}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">最差情况</p>
                    <p className="font-mono text-sm">{complexity.summary.worstCase}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">空间复杂度</p>
                    <p className="font-mono text-sm">{complexity.summary.spaceComplexity}</p>
                  </div>
                </div>
              </div>

              {/* 具体操作复杂度 */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">操作复杂度分析</h4>
                <div className="space-y-3">
                  {complexity.items.map((item, index) => (
                    <motion.div 
                      key={index}
                      className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{item.operation}</span>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                            时间: {item.timeComplexity}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                            空间: {item.spaceComplexity}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 复杂度说明 */}
              <div className="text-xs text-gray-500 space-y-1 border-t border-gray-100 pt-3">
                <p>• O(1): 常数时间，与输入规模无关</p>
                <p>• O(n): 线性时间，与输入规模成正比</p>
                <p>• O(log n): 对数时间，随输入规模增长而缓慢增加</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DataStructureLayout;
