import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

interface LinkedListVisualizerProps {
  nodes: any[];
  highlightIndices: number[];
}

const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({ nodes, highlightIndices = [] }) => {
  return (
    <div className="flex items-center justify-start space-x-4 overflow-x-auto min-h-[200px] my-4 p-4 border rounded-lg bg-gray-50">
      {nodes.map((node, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`
              flex flex-col items-center justify-center
              w-16 h-16
              border-2 rounded-lg
              ${highlightIndices.includes(index)
                ? 'border-blue-500 bg-blue-100'
                : 'border-gray-300 bg-white'}
              transition-all duration-300
            `}
          >
            <span className="text-sm text-gray-500">Node {index}</span>
            <span className="font-bold">{node.value}</span>
          </div>
          {index < nodes.length - 1 && (
            <div className="flex items-center mx-2">
              <FiArrowRight className="text-blue-500" />
            </div>
          )}
        </div>
      ))}
      {nodes.length === 0 && (
        <div className="text-gray-500 text-center w-full">
          空链表
        </div>
      )}
    </div>
  );
};

export default LinkedListVisualizer;
