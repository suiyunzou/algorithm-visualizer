import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

interface QueueVisualizerProps {
  items: any[];
  highlightIndices: number[];
  front: number;
  rear: number;
}

const QueueVisualizer: React.FC<QueueVisualizerProps> = ({
  items,
  highlightIndices = [],
  front,
  rear
}) => {
  return (
    <div className="flex flex-col space-y-8 min-h-[300px] my-4 p-4 border rounded-lg bg-gray-50">
      {/* 队列可视化 */}
      <div className="relative flex items-center justify-start space-x-4 p-4 overflow-x-auto">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* 队列元素 */}
            <div
              className={`
                w-16 h-16
                border-2 rounded-lg
                flex flex-col items-center justify-center
                ${highlightIndices.includes(index)
                  ? 'border-blue-500 bg-blue-100'
                  : item === null
                  ? 'border-dashed border-gray-300 bg-gray-50'
                  : 'border-gray-300 bg-white'}
                ${index === front && item !== null ? 'ring-2 ring-green-500' : ''}
                ${index === rear && item !== null ? 'ring-2 ring-red-500' : ''}
                transition-all duration-300
              `}
            >
              {item !== null ? (
                <>
                  <span className="text-xs text-gray-500">位置 {index}</span>
                  <span className="font-bold">{item}</span>
                </>
              ) : (
                <span className="text-gray-400">空</span>
              )}
            </div>
            
            {/* 指示标签 */}
            <div className="mt-2 flex flex-col items-center space-y-1">
              {index === front && !isEmpty(items, front) && (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                  队首
                </span>
              )}
              {index === rear && !isEmpty(items, front) && (
                <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                  队尾
                </span>
              )}
            </div>
            
            {/* 连接箭头 */}
            {index < items.length - 1 && item !== null && items[index + 1] !== null && (
              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: `${(index + 1) * 96 - 12}px` }}>
                <FiArrowRight className="text-blue-500" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 队列状态信息 */}
      <div className="text-center space-y-2">
        {isEmpty(items, front) ? (
          <p className="text-gray-500">队列为空</p>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              队首索引: {front} | 队尾索引: {rear}
            </p>
            <p className="text-sm text-gray-600">
              元素个数: {getQueueSize(items, front, rear)}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// 辅助函数
const isEmpty = (items: any[], front: number): boolean => front === -1;

const getQueueSize = (items: any[], front: number, rear: number): number => {
  if (front === -1) return 0;
  if (rear >= front) {
    return rear - front + 1;
  }
  return items.length - (front - rear - 1);
};

export default QueueVisualizer;
