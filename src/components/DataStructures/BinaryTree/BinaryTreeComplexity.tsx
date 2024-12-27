import React from 'react';

const BinaryTreeComplexity: React.FC = () => {
  const complexityData = [
    { operation: '插入', average: 'O(log n)', worst: 'O(n)', description: '从根节点开始，每次比较后选择左子树或右子树' },
    { operation: '删除', average: 'O(log n)', worst: 'O(n)', description: '需要找到目标节点并可能需要重新平衡树' },
    { operation: '搜索', average: 'O(log n)', worst: 'O(n)', description: '从根节点开始，每次比较后选择一个子树' },
    { operation: '遍历', time: 'O(n)', space: 'O(h)', description: '需要访问所有节点，h为树的高度' },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">复杂度分析</h3>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">平均时间复杂度</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最坏时间复杂度</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {complexityData.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.operation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.average || item.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.worst || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-2 text-blue-700">二叉树的特点</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>每个节点最多有两个子节点（左子节点和右子节点）</li>
          <li>左子树中的所有节点值都小于父节点</li>
          <li>右子树中的所有节点值都大于父节点</li>
          <li>适用场景：
            <ul className="list-circle list-inside ml-4 mt-1 text-gray-600">
              <li>需要保持数据有序</li>
              <li>频繁进行插入和删除操作</li>
              <li>需要快速查找特定值</li>
              <li>实现字典或集合</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-2 text-yellow-700">性能考虑</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>树的平衡性直接影响操作的性能</li>
          <li>最坏情况（完全不平衡）会退化成链表，性能降为 O(n)</li>
          <li>可以通过自平衡（如 AVL 树、红黑树）来保持较好的性能</li>
          <li>树的高度 h 与节点数 n 的关系：log₂(n+1) ≤ h ≤ n</li>
        </ul>
      </div>
    </div>
  );
};

export default BinaryTreeComplexity;
