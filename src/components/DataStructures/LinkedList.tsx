import React, { useState } from 'react';
import DataStructureLayout from '../Layout/DataStructureLayout';

interface ListNode {
  value: number;
  next?: ListNode;
}

const LinkedList: React.FC = () => {
  const [head, setHead] = useState<ListNode | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState('');
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  const getLength = (node: ListNode | null): number => {
    let length = 0;
    let current = node;
    while (current) {
      length++;
      current = current.next;
    }
    return length;
  };

  const insertAtHead = (value: number) => {
    const newNode: ListNode = { value };
    newNode.next = head;
    setHead(newNode);
    setHighlightIndex(0);
    setTimeout(() => setHighlightIndex(null), 500);
  };

  const insertAtTail = (value: number) => {
    const newNode: ListNode = { value };
    if (!head) {
      setHead(newNode);
      return;
    }
    let current = head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
    setHighlightIndex(getLength(head) - 1);
    setTimeout(() => setHighlightIndex(null), 500);
  };

  const insertAtPosition = (value: number, pos: number) => {
    if (pos < 0 || pos > getLength(head)) {
      alert('无效的位置');
      return;
    }
    if (pos === 0) {
      insertAtHead(value);
      return;
    }
    const newNode: ListNode = { value };
    let current = head;
    for (let i = 0; i < pos - 1; i++) {
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
    setHighlightIndex(pos);
    setTimeout(() => setHighlightIndex(null), 500);
  };

  const deleteAtPosition = (pos: number) => {
    if (!head || pos < 0 || pos >= getLength(head)) {
      alert('无效的位置');
      return;
    }
    if (pos === 0) {
      setHead(head.next);
      return;
    }
    let current = head;
    for (let i = 0; i < pos - 1; i++) {
      current = current.next;
    }
    current.next = current.next?.next;
    setHighlightIndex(pos);
    setTimeout(() => setHighlightIndex(null), 500);
  };

  const renderList = () => {
    const nodes: ListNode[] = [];
    let current = head;
    while (current) {
      nodes.push(current);
      current = current.next;
    }

    return (
      <div className="flex items-center justify-center space-x-4 p-4">
        {nodes.map((node, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`
                flex items-center justify-center
                w-12 h-12 rounded-full
                ${highlightIndex === index ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'}
                border-2 transition-colors duration-300
              `}
            >
              {node.value}
            </div>
            {index < nodes.length - 1 && (
              <div className="w-8 h-0.5 bg-gray-300 mx-2"></div>
            )}
          </div>
        ))}
        {nodes.length === 0 && (
          <div className="text-gray-500">空链表</div>
        )}
      </div>
    );
  };

  return (
    <DataStructureLayout
      title="链表"
      visualization={renderList()}
      operations={
        <div className="flex flex-col space-y-4 p-4">
          <div className="flex space-x-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="输入值"
              className="border rounded px-2 py-1"
            />
            <input
              type="number"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="位置"
              className="border rounded px-2 py-1 w-20"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => insertAtHead(parseInt(inputValue))}
              className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              头部插入
            </button>
            <button
              onClick={() => insertAtTail(parseInt(inputValue))}
              className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              尾部插入
            </button>
            <button
              onClick={() => insertAtPosition(parseInt(inputValue), parseInt(position))}
              className="px-4 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              指定位置插入
            </button>
            <button
              onClick={() => deleteAtPosition(parseInt(position))}
              className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              删除位置
            </button>
          </div>
        </div>
      }
      features={{
        title: "链表特点",
        items: [
          "动态大小",
          "不需要连续内存",
          "插入和删除灵活",
          "适用于频繁插入删除的场景"
        ]
      }}
      complexity={{
        title: "性能分析",
        items: [
          { operation: "头部插入 (Prepend)", timeComplexity: "O(1)", spaceComplexity: "O(1)", description: "在链表头部插入新节点" },
          { operation: "尾部插入 (Append)", timeComplexity: "O(n)", spaceComplexity: "O(1)", description: "需要遍历到链表尾部" },
          { operation: "指定位置插入 (Insert)", timeComplexity: "O(n)", spaceComplexity: "O(1)", description: "需要遍历到指定位置" },
          { operation: "删除节点 (Delete)", timeComplexity: "O(n)", spaceComplexity: "O(1)", description: "需要遍历到目标节点" },
          { operation: "搜索 (Search)", timeComplexity: "O(n)", spaceComplexity: "O(1)", description: "需要遍历链表查找目标值" }
        ],
        summary: {
          bestCase: "O(1)",
          averageCase: "O(n)",
          worstCase: "O(n)",
          spaceComplexity: "O(n)"
        }
      }}
    />
  );
};

export default LinkedList;
