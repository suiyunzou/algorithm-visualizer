import React, { useState } from 'react';
import DataStructureLayout from '../Layout/DataStructureLayout';
import BinaryTreeVisualizer from './BinaryTree/BinaryTreeVisualizer';
import BinaryTreeOperations from './BinaryTree/BinaryTreeOperations';

interface TreeNode {
  value: any;
  left?: TreeNode;
  right?: TreeNode;
}

const BinaryTree: React.FC = () => {
  const [root, setRoot] = useState<TreeNode>({
    value: 1,
    left: {
      value: 2,
      left: { value: 4 },
      right: { value: 5 }
    },
    right: {
      value: 3,
      left: { value: 6 },
      right: { value: 7 }
    }
  });
  const [highlightNodes, setHighlightNodes] = useState<string[]>([]);

  // 插入节点
  const handleInsert = async (value: number): Promise<void> => {
    const insertNode = (node: TreeNode | undefined, newValue: number): TreeNode => {
      if (!node) {
        return { value: newValue };
      }
      if (newValue < node.value) {
        return { ...node, left: insertNode(node.left, newValue) };
      }
      return { ...node, right: insertNode(node.right, newValue) };
    };
    setRoot(insertNode(root, value));
  };

  // 删除节点
  const handleDelete = async (value: number): Promise<void> => {
    const findMin = (node: TreeNode): number => {
      let current = node;
      while (current.left) {
        current = current.left;
      }
      return current.value;
    };

    const deleteNode = (node: TreeNode | undefined, value: number): TreeNode | undefined => {
      if (!node) return undefined;

      if (value < node.value) {
        return { ...node, left: deleteNode(node.left, value) };
      }
      if (value > node.value) {
        return { ...node, right: deleteNode(node.right, value) };
      }

      // 找到要删除的节点
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // 有两个子节点的情况
      const minValue = findMin(node.right);
      return {
        ...node,
        value: minValue,
        right: deleteNode(node.right, minValue)
      };
    };

    setRoot(deleteNode(root, value) || null);
  };

  // 搜索节点
  const handleSearch = async (value: number): Promise<boolean> => {
    const searchNode = (node: TreeNode | undefined, value: number): boolean => {
      if (!node) return false;
      if (node.value === value) {
        setHighlightNodes(['0']); // 高亮找到的节点
        setTimeout(() => setHighlightNodes([]), 2000);
        return true;
      }
      if (value < node.value) {
        return searchNode(node.left, value);
      }
      return searchNode(node.right, value);
    };

    return searchNode(root, value);
  };

  return (
    <DataStructureLayout
      title="二叉树"
      visualization={
        <BinaryTreeVisualizer 
          root={root}
          highlightNodes={highlightNodes}
        />
      }
      operations={
        <BinaryTreeOperations 
          onInsert={handleInsert}
          onDelete={handleDelete}
          onSearch={handleSearch}
        />
      }
      features={{
        title: "二叉树特点",
        items: [
          "每个节点最多有两个子节点",
          "具有层级结构",
          "可以是空树",
          "适用于表示层级关系数据"
        ]
      }}
      complexity={{
        title: "性能分析",
        items: [
          { operation: "插入 (Insert)", timeComplexity: "O(log n)", spaceComplexity: "O(1)", description: "平衡树的情况下，每次比较后树高减半" },
          { operation: "删除 (Delete)", timeComplexity: "O(log n)", spaceComplexity: "O(1)", description: "需要找到并重新连接节点" },
          { operation: "搜索 (Search)", timeComplexity: "O(log n)", spaceComplexity: "O(1)", description: "每次比较后排除一半节点" },
          { operation: "遍历 (Traversal)", timeComplexity: "O(n)", spaceComplexity: "O(h)", description: "需要访问所有节点，h为树高" }
        ],
        summary: {
          bestCase: "O(log n)",
          averageCase: "O(log n)",
          worstCase: "O(n)",
          spaceComplexity: "O(n)"
        }
      }}
    />
  );
};

export default BinaryTree;
