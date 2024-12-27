import React, { useState, useEffect } from 'react';
import { BinaryTreeStructure } from '../../models/BinaryTreeStructure';
import BinaryTreeVisualizer from './BinaryTree/BinaryTreeVisualizer';
import BinaryTreeOperations from './BinaryTree/BinaryTreeOperations';
import BinaryTreeComplexity from './BinaryTree/BinaryTreeComplexity';

const BinaryTree: React.FC = () => {
  const [treeStructure] = useState(() => {
    // 创建一个初始包含一些节点的二叉树
    return new BinaryTreeStructure([50, 30, 70, 20, 40, 60, 80]);
  });
  
  const [state, setState] = useState(() => treeStructure.getState());

  useEffect(() => {
    console.log('Subscribing to binary tree structure updates');
    const unsubscribe = treeStructure.subscribe((newState) => {
      console.log('Binary tree state updated:', newState);
      setState(newState);
    });
    return () => {
      console.log('Unsubscribing from binary tree structure updates');
      unsubscribe();
    };
  }, [treeStructure]);

  const handleInsert = async (value: number) => {
    await treeStructure.insert(value);
  };

  const handleDelete = async (value: number) => {
    await treeStructure.delete(value);
  };

  const handleSearch = async (value: number) => {
    return await treeStructure.search(value);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">二叉搜索树可视化</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <BinaryTreeVisualizer 
            treeArray={state?.treeArray || []}
            highlightNodes={state?.highlightNodes || []}
            maxDepth={state?.maxDepth || 0}
          />
        </div>
        
        <div>
          <BinaryTreeOperations
            onInsert={handleInsert}
            onDelete={handleDelete}
            onSearch={handleSearch}
          />
        </div>
        
        <div>
          <BinaryTreeComplexity />
        </div>
      </div>

      {/* 树的统计信息 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <span className="text-gray-600">节点数量:</span>
            <span className="ml-2 font-semibold">{treeStructure.getSize()}</span>
          </div>
          <div className="text-center">
            <span className="text-gray-600">树的深度:</span>
            <span className="ml-2 font-semibold">{treeStructure.getDepth()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinaryTree;
