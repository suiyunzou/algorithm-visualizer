import React from 'react';

const QueueComplexity: React.FC = () => {
  const complexityData = [
    { operation: '入队 (Enqueue)', time: 'O(1)', space: 'O(1)', description: '在队尾添加元素' },
    { operation: '出队 (Dequeue)', time: 'O(1)', space: 'O(1)', description: '移除队首元素' },
    { operation: '查看队首 (Peek)', time: 'O(1)', space: 'O(1)', description: '访问队首元素' },
    { operation: '判空/判满', time: 'O(1)', space: 'O(1)', description: '检查队列状态' },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">复杂度分析</h3>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间复杂度</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">空间复杂度</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {complexityData.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.operation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.space}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-2 text-blue-700">队列的特点</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>先进先出 (FIFO) 的数据结构</li>
          <li>所有基本操作的时间复杂度都是 O(1)</li>
          <li>只能在队首删除元素，在队尾添加元素</li>
          <li>适用于需要先进先出处理的场景，如：
            <ul className="list-circle list-inside ml-4 mt-1 text-gray-600">
              <li>任务调度</li>
              <li>消息队列</li>
              <li>打印机队列</li>
              <li>广度优先搜索</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-2 text-yellow-700">循环队列说明</h4>
        <p className="text-gray-700">
          本实现采用循环队列，通过取模运算实现队列的循环使用，避免了简单队列的"假溢出"问题。
          当队尾指针到达数组末尾时，如果数组头部有空闲空间，新的元素可以存储在头部，从而更有效地利用空间。
        </p>
      </div>
    </div>
  );
};

export default QueueComplexity;
