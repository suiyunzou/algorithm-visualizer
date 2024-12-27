import React from 'react';
import { FiArrowDown } from 'react-icons/fi';

interface StackVisualizerProps {
  items: any[];
  highlightIndices: number[];
  maxSize: number;
}

const StackVisualizer: React.FC<StackVisualizerProps> = ({ items, highlightIndices = [], maxSize }) => {
  // 创建空槽位数组
  const emptySlots = Array(maxSize - items.length).fill(null);

  return (
    <div className="flex flex-col items-center justify-end space-y-2 min-h-[400px] my-4 p-4 border rounded-lg bg-gray-50">
      {/* 显示空槽位 */}
      {emptySlots.map((_, index) => (
        <div
          key={`empty-${index}`}
          className="w-32 h-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center"
        >
          <span className="text-gray-400">Empty</span>
        </div>
      ))}
      
      {/* 显示栈中的元素 */}
      {[...items].reverse().map((item, index) => {
        const actualIndex = items.length - 1 - index;
        return (
          <div key={`item-${actualIndex}`} className="relative">
            {actualIndex < items.length - 1 && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <FiArrowDown className="text-blue-500" />
              </div>
            )}
            <div
              className={`
                w-32 h-12
                border-2 rounded-lg
                flex items-center justify-center
                ${highlightIndices.includes(actualIndex)
                  ? 'border-blue-500 bg-blue-100'
                  : 'border-gray-300 bg-white'}
                transition-all duration-300
              `}
            >
              <span className="font-bold">{item}</span>
            </div>
          </div>
        );
      })}
      
      {/* 底部基座 */}
      <div className="w-40 h-2 bg-gray-400 rounded-lg" />
      
      {/* 栈的状态信息 */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          容量: {items.length} / {maxSize}
        </p>
        {items.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">栈为空</p>
        )}
        {items.length === maxSize && (
          <p className="text-sm text-red-500 mt-2">栈已满</p>
        )}
      </div>
    </div>
  );
};

export default StackVisualizer;
