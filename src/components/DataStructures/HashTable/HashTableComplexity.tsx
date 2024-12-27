import React from 'react';

const HashTableComplexity: React.FC = () => {
  const complexityData = [
    { operation: '插入', average: 'O(1)', worst: 'O(n)', description: '平均情况下直接插入，最坏情况下所有键都在同一个桶中' },
    { operation: '查找', average: 'O(1)', worst: 'O(n)', description: '平均情况下直接访问，最坏情况下需要遍历整个桶' },
    { operation: '删除', average: 'O(1)', worst: 'O(n)', description: '平均情况下直接删除，最坏情况下需要遍历整个桶' },
    { operation: '空间使用', space: 'O(n)', description: 'n 为存储的键值对数量，需要额外空间存储桶数组' },
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.average || item.space}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.worst || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-2 text-blue-700">哈希表的特点</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>基于数组实现的键值对存储结构</li>
          <li>通过哈希函数将键映射到数组索引</li>
          <li>支持快速的插入、查找和删除操作</li>
          <li>需要处理哈希冲突（本实现使用链地址法）</li>
          <li>适用场景：
            <ul className="list-circle list-inside ml-4 mt-1 text-gray-600">
              <li>需要快速查找和更新的数据</li>
              <li>缓存系统</li>
              <li>字典或映射实现</li>
              <li>去重操作</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-2 text-yellow-700">性能考虑</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>负载因子（Load Factor）
            <ul className="list-circle list-inside ml-4 mt-1 text-gray-600">
              <li>当前实现的阈值为 0.75</li>
              <li>超过阈值时会自动扩容</li>
              <li>影响查找和插入的性能</li>
            </ul>
          </li>
          <li>哈希函数的选择
            <ul className="list-circle list-inside ml-4 mt-1 text-gray-600">
              <li>需要均匀分布</li>
              <li>计算速度要快</li>
              <li>减少冲突概率</li>
            </ul>
          </li>
          <li>冲突解决策略
            <ul className="list-circle list-inside ml-4 mt-1 text-gray-600">
              <li>链地址法（当前实现）</li>
              <li>开放地址法</li>
              <li>双重哈希</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HashTableComplexity;
