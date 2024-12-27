import React from 'react';

const GraphComplexity: React.FC = () => {
  const complexityData = [
    { operation: '添加节点', adjacencyList: 'O(1)', adjacencyMatrix: 'O(V²)', description: '邻接表直接添加，邻接矩阵需要扩展矩阵' },
    { operation: '添加边', adjacencyList: 'O(1)', adjacencyMatrix: 'O(1)', description: '两种表示方法都是常数时间' },
    { operation: '删除节点', adjacencyList: 'O(E)', adjacencyMatrix: 'O(V²)', description: '邻接表需要遍历所有边，邻接矩阵需要调整矩阵' },
    { operation: '删除边', adjacencyList: 'O(1)', adjacencyMatrix: 'O(1)', description: '两种表示方法都是常数时间' },
    { operation: '查找边', adjacencyList: 'O(V)', adjacencyMatrix: 'O(1)', description: '邻接表需要遍历邻接点，邻接矩阵直接访问' },
    { operation: 'DFS', adjacencyList: 'O(V + E)', adjacencyMatrix: 'O(V²)', description: '需要访问所有节点和边' },
    { operation: 'BFS', adjacencyList: 'O(V + E)', adjacencyMatrix: 'O(V²)', description: '需要访问所有节点和边' },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">复杂度分析</h3>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邻接表</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邻接矩阵</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {complexityData.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.operation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.adjacencyList}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.adjacencyMatrix}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-2 text-blue-700">图的特点</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>由节点（顶点）和边组成的非线性数据结构</li>
          <li>可以表示多对多的关系</li>
          <li>可以是有向的或无向的</li>
          <li>边可以带权重</li>
          <li>适用场景：
            <ul className="list-circle list-inside ml-4 mt-1 text-gray-600">
              <li>社交网络</li>
              <li>地图导航</li>
              <li>网络拓扑</li>
              <li>任务调度</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-2 text-yellow-700">存储方式比较</h4>
        <div className="space-y-4">
          <div>
            <h5 className="font-semibold text-gray-700">邻接表</h5>
            <ul className="list-disc list-inside ml-4 text-gray-600">
              <li>空间复杂度：O(V + E)</li>
              <li>适合稀疏图</li>
              <li>快速获取所有邻接点</li>
              <li>不易判断两点是否相邻</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700">邻接矩阵</h5>
            <ul className="list-disc list-inside ml-4 text-gray-600">
              <li>空间复杂度：O(V²)</li>
              <li>适合稠密图</li>
              <li>快速判断两点是否相邻</li>
              <li>浪费空间（对稀疏图）</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphComplexity;
