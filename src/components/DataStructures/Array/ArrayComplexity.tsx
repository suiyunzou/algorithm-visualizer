import React from 'react';

const ArrayComplexity: React.FC = () => {
  const complexityData = [
    { operation: '访问', time: 'O(1)', space: 'O(1)', description: '通过索引直接访问' },
    { operation: '插入', time: 'O(n)', space: 'O(1)', description: '需要移动后续元素' },
    { operation: '删除', time: 'O(n)', space: 'O(1)', description: '需要移动后续元素' },
    { operation: '搜索', time: 'O(n)', space: 'O(1)', description: '需要遍历整个数组' },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">复杂度分析</h3>
      <table className="min-w-full bg-white border rounded-lg overflow-hidden">
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
  );
};

export default ArrayComplexity; 