import React, { useState } from 'react';
import DataStructureLayout from '../Layout/DataStructureLayout';
import QueueVisualizer from './Queue/QueueVisualizer';

interface QueueItem {
  value: number;
}

const Queue: React.FC = () => {
  const maxSize = 10; // 设置队列的最大容量
  const [items, setItems] = useState<QueueItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [highlightIndices, setHighlightIndices] = useState<number[]>([]);

  const handleEnqueue = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      alert('请输入有效数字');
      return;
    }
    if (items.length >= maxSize) {
      alert('队列已满');
      return;
    }
    setItems([...items, { value }]);
    setInputValue('');
    setHighlightIndices([items.length]); // 高亮新添加的元素
    setTimeout(() => setHighlightIndices([]), 500); // 500ms 后取消高亮
  };

  const handleDequeue = () => {
    if (items.length === 0) {
      alert('队列为空');
      return;
    }
    setHighlightIndices([0]); // 高亮要移除的元素
    setTimeout(() => {
      setItems(items.slice(1));
      setHighlightIndices([]);
    }, 500);
  };

  const handlePeek = () => {
    if (items.length === 0) {
      alert('队列为空');
      return;
    }
    setHighlightIndices([0]); // 高亮队首元素
    setTimeout(() => setHighlightIndices([]), 500); // 500ms 后取消高亮
  };

  return (
    <DataStructureLayout
      title="队列"
      visualization={
        <QueueVisualizer 
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
            onKeyPress={(e) => e.key === 'Enter' && handleEnqueue()}
          />
          <button
            onClick={handleEnqueue}
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            入队 (Enqueue)
          </button>
          <button
            onClick={handleDequeue}
            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            出队 (Dequeue)
          </button>
          <button
            onClick={handlePeek}
            className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            查看队首 (Peek)
          </button>
        </div>
      }
      features={{
        title: "队列特点",
        items: [
          "先进先出 (FIFO)",
          "只能从队尾添加元素",
          "只能从队首删除元素",
          "适用于任务调度、消息队列等"
        ]
      }}
      complexity={{
        title: "性能分析",
        items: [
          { operation: "入队 (Enqueue)", timeComplexity: "O(1)", spaceComplexity: "O(1)", description: "在队尾添加元素" },
          { operation: "出队 (Dequeue)", timeComplexity: "O(1)", spaceComplexity: "O(1)", description: "移除队首元素" },
          { operation: "查看队首 (Peek)", timeComplexity: "O(1)", spaceComplexity: "O(1)", description: "访问队首元素" },
          { operation: "判空", timeComplexity: "O(1)", spaceComplexity: "O(1)", description: "检查队列状态" }
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

export default Queue;
