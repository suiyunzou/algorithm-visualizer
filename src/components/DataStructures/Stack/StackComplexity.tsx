import React from 'react';

const StackComplexity: React.FC = () => {
  const complexityData = [
    { operation: '入栈 (Push)', time: 'O(1)', space: 'O(1)', description: '直接在栈顶添加元素' },
    { operation: '出栈 (Pop)', time: 'O(1)', space: 'O(1)', description: '直接移除栈顶元素' },
    { operation: '查看栈顶 (Peek)', time: 'O(1)', space: 'O(1)', description: '直接访问栈顶元素' },
    { operation: '判空', time: 'O(1)', space: 'O(1)', description: '检查栈是否为空' },
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
        <h4 className="text-lg font-semibold mb-2 text-blue-700">栈的特点</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>后进先出 (LIFO) 的数据结构</li>
          <li>所有基本操作的时间复杂度都是 O(1)</li>
          <li>只能在一端（栈顶）进行操作</li>
          <li>适用于需要后进先出处理的场景，如：
            <ul className="list-circle list-inside ml-4 mt-1 text-gray-600">
              <li>函数调用栈</li>
              <li>表达式求值</li>
              <li>括号匹配</li>
              <li>撤销操作</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StackComplexity;
