import React, { useState } from 'react';
import DataStructureLayout from '../Layout/DataStructureLayout';
import StackVisualizer from './Stack/StackVisualizer';

interface StackItem {
  value: number;
}

const Stack: React.FC = () => {
  const maxSize = 10; // 设置栈的最大容量
  const [items, setItems] = useState<StackItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [highlightIndices, setHighlightIndices] = useState<number[]>([]);

  const handlePush = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      alert('请输入有效数字');
      return;
    }
    if (items.length >= maxSize) {
      alert('栈已满');
      return;
    }
    setItems([...items, { value }]);
    setInputValue('');
    setHighlightIndices([items.length]); // 高亮新添加的元素
    setTimeout(() => setHighlightIndices([]), 500); // 500ms 后取消高亮
  };

  const handlePop = () => {
    if (items.length === 0) {
      alert('栈为空');
      return;
    }
    setHighlightIndices([items.length - 1]); // 高亮要移除的元素
    setTimeout(() => {
      setItems(items.slice(0, -1));
      setHighlightIndices([]);
    }, 500);
  };

  const handlePeek = () => {
    if (items.length === 0) {
      alert('栈为空');
      return;
    }
    setHighlightIndices([items.length - 1]); // 高亮栈顶元素
    setTimeout(() => setHighlightIndices([]), 500); // 500ms 后取消高亮
  };

  return (
    <DataStructureLayout
      title="栈"
      visualization={
        <StackVisualizer 
          items={items}
          highlightIndices={highlightIndices}
          maxSize={maxSize}
        />
      }
      operations={
        <div className="flex items-center gap-4 w-full max-w-2xl justify-center p-4">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入值"
            className="border rounded px-3 py-1 w-28"
            onKeyPress={(e) => e.key === 'Enter' && handlePush()}
          />
          <button
            onClick={handlePush}
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            入栈 (Push)
          </button>
          <button
            onClick={handlePop}
            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            出栈 (Pop)
          </button>
          <button
            onClick={handlePeek}
            className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            查看栈顶 (Peek)
          </button>
        </div>
      }
      features={{
        title: "栈特点",
        items: [
          "后进先出 (LIFO)",
          "只能从顶部添加或删除元素",
          "可以快速查看顶部元素",
          "适用于函数调用、表达式求值等"
        ]
      }}
      complexity={{
        title: "性能分析",
        items: [
          { operation: "入栈 (Push)", timeComplexity: "O(1)", spaceComplexity: "O(1)", description: "在栈顶添加元素" },
          { operation: "出栈 (Pop)", timeComplexity: "O(1)", spaceComplexity: "O(1)", description: "移除栈顶元素" },
          { operation: "查看栈顶 (Peek)", timeComplexity: "O(1)", spaceComplexity: "O(1)", description: "访问栈顶元素" },
          { operation: "判空/判满", timeComplexity: "O(1)", spaceComplexity: "O(1)", description: "检查栈的状态" }
        ],
        summary: {
          bestCase: "O(1)",
          averageCase: "O(1)",
          worstCase: "O(1)",
          spaceComplexity: "O(n)"
        }
      }}
    />
  );
};

export default Stack;
