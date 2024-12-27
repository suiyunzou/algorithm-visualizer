import React from 'react';

interface BinaryTreeVisualizerProps {
  treeArray: (number | null)[];
  highlightNodes: number[];
  maxDepth: number;
}

const BinaryTreeVisualizer: React.FC<BinaryTreeVisualizerProps> = ({
  treeArray,
  highlightNodes = [],
  maxDepth
}) => {
  const getLevel = (index: number): number => Math.floor(Math.log2(index + 1));
  const getLevelWidth = (level: number): number => Math.pow(2, level);
  
  // 计算节点的位置
  const calculateNodePosition = (index: number) => {
    const level = getLevel(index);
    const levelWidth = getLevelWidth(level);
    const position = index - (Math.pow(2, level) - 1);
    const spacing = 60; // 节点之间的基本间距
    const levelSpacing = spacing * Math.pow(2, maxDepth - level - 1); // 根据层级调整间距
    
    return {
      left: `${position * levelSpacing + levelSpacing / 2}px`,
      top: `${level * 80}px` // 垂直间距固定为 80px
    };
  };

  // 计算连接线的路径
  const calculateLinePath = (parentIndex: number, childIndex: number) => {
    const parent = calculateNodePosition(parentIndex);
    const child = calculateNodePosition(childIndex);
    
    const parentX = parseFloat(parent.left);
    const parentY = parseFloat(parent.top) + 20; // 节点半高
    const childX = parseFloat(child.left);
    const childY = parseFloat(child.top);
    
    return `M ${parentX} ${parentY} L ${childX} ${childY}`;
  };

  // 计算画布大小
  const canvasWidth = Math.pow(2, maxDepth) * 60;
  const canvasHeight = maxDepth * 80 + 40;

  return (
    <div className="relative overflow-auto border rounded-lg bg-gray-50 p-4" 
         style={{ width: '100%', height: '500px' }}>
      <div style={{ 
        width: `${canvasWidth}px`, 
        height: `${canvasHeight}px`, 
        position: 'relative',
        margin: '0 auto'
      }}>
        {/* 连接线 */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          {treeArray.map((value, index) => {
            if (value === null) return null;
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            
            return (
              <g key={`lines-${index}`}>
                {leftChildIndex < treeArray.length && treeArray[leftChildIndex] !== null && (
                  <path
                    d={calculateLinePath(index, leftChildIndex)}
                    stroke="#94a3b8"
                    strokeWidth="2"
                    fill="none"
                  />
                )}
                {rightChildIndex < treeArray.length && treeArray[rightChildIndex] !== null && (
                  <path
                    d={calculateLinePath(index, rightChildIndex)}
                    stroke="#94a3b8"
                    strokeWidth="2"
                    fill="none"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* 节点 */}
        {treeArray.map((value, index) => {
          if (value === null) return null;
          const position = calculateNodePosition(index);
          
          return (
            <div
              key={`node-${index}`}
              className={`
                absolute w-10 h-10
                flex items-center justify-center
                rounded-full border-2
                transition-all duration-300
                ${highlightNodes.includes(index)
                  ? 'border-blue-500 bg-blue-100 text-blue-700'
                  : 'border-gray-300 bg-white text-gray-700'}
              `}
              style={{
                left: position.left,
                top: position.top,
                transform: 'translate(-50%, 0)'
              }}
            >
              {value}
            </div>
          );
        })}
      </div>

      {/* 空树提示 */}
      {treeArray.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          空二叉树
        </div>
      )}
    </div>
  );
};

export default BinaryTreeVisualizer;
