import React, { useEffect, useRef } from 'react';
import './BinaryTreeVisualizer.css';

interface TreeNode {
  value: any;
  left?: TreeNode;
  right?: TreeNode;
}

interface BinaryTreeVisualizerProps {
  root: TreeNode | null;
  highlightNodes: string[];
}

const BinaryTreeVisualizer: React.FC<BinaryTreeVisualizerProps> = ({
  root,
  highlightNodes = []
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getTreeDepth = (node: TreeNode | null): number => {
    if (!node) return 0;
    return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right));
  };

  const drawLine = (
    container: HTMLElement,
    parentX: number,
    parentY: number,
    childX: number,
    childY: number
  ) => {
    const line = document.createElement('div');
    line.className = 'line absolute bg-gray-300';
    
    // 节点的尺寸
    const nodeSize = 40;
    
    // 计算实际的连接点
    const startX = parentX;
    const startY = parentY + (nodeSize / 2); // 父节点底部中心
    const endX = childX;
    const endY = childY - (nodeSize / 2); // 子节点顶部中心
    
    // 计算线条长度和角度
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    
    // 设置线条样式
    line.style.width = `${length}px`;
    line.style.height = '2px';
    line.style.transformOrigin = '0 0';
    line.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}deg)`;
    
    container.appendChild(line);
  };

  const renderNode = (
    container: HTMLElement,
    node: TreeNode,
    x: number,
    y: number,
    offset: number,
    path: string = '0'
  ) => {
    // 创建节点元素
    const nodeDiv = document.createElement('div');
    nodeDiv.className = `node absolute w-[40px] h-[40px] rounded-full border-2 
      ${highlightNodes.includes(path) ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-white'}
      flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-gray-100
      transform -translate-x-1/2 -translate-y-1/2`;
    nodeDiv.style.left = `${x}px`;
    nodeDiv.style.top = `${y}px`;
    nodeDiv.textContent = String(node.value);
    
    // 添加提示框
    nodeDiv.addEventListener('mouseenter', () => {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip absolute bg-black bg-opacity-80 text-white px-2 py-1 rounded text-sm -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap';
      tooltip.textContent = `Node Value: ${node.value}`;
      nodeDiv.appendChild(tooltip);
    });
    
    nodeDiv.addEventListener('mouseleave', () => {
      const tooltip = nodeDiv.querySelector('.tooltip');
      if (tooltip) tooltip.remove();
    });
    
    container.appendChild(nodeDiv);

    // 渲染子树
    const verticalGap = 60; // 垂直间距
    
    if (node.left) {
      const childX = x - offset;
      const childY = y + verticalGap;
      drawLine(container, x, y, childX, childY);
      renderNode(container, node.left, childX, childY, offset / 2, path + 'L');
    }

    if (node.right) {
      const childX = x + offset;
      const childY = y + verticalGap;
      drawLine(container, x, y, childX, childY);
      renderNode(container, node.right, childX, childY, offset / 2, path + 'R');
    }
  };

  useEffect(() => {
    if (!containerRef.current || !root) return;

    // 清除之前的内容
    containerRef.current.innerHTML = '';

    const treeDepth = getTreeDepth(root);
    const containerWidth = Math.pow(2, treeDepth) * 60;
    const startX = containerWidth / 2;
    const startY = 50;
    const initialOffset = containerWidth / 6;

    renderNode(containerRef.current, root, startX, startY, initialOffset);
  }, [root, highlightNodes]);

  return root ? (
    <div 
      ref={containerRef}
      className="relative border rounded-lg bg-white overflow-auto p-4 animate-fade-in"
      style={{ 
        height: '400px',
        minWidth: '100%'
      }}
    />
  ) : (
    <div className="relative border rounded-lg bg-white overflow-auto p-4 flex items-center justify-center text-gray-500" style={{ height: '400px' }}>
      空二叉树
    </div>
  );
};

export default BinaryTreeVisualizer;
