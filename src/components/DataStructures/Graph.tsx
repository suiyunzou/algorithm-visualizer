import React, { useState } from 'react';
import DataStructureLayout from '../Layout/DataStructureLayout';

interface Node {
  id: string;
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
}

const Graph: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'A', x: 100, y: 100 },
    { id: 'B', x: 200, y: 100 },
    { id: 'C', x: 150, y: 200 }
  ]);
  
  const [edges, setEdges] = useState<Edge[]>([
    { from: 'A', to: 'B' },
    { from: 'B', to: 'C' },
    { from: 'C', to: 'A' }
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [nodeId, setNodeId] = useState('');
  const [fromNode, setFromNode] = useState('');
  const [toNode, setToNode] = useState('');

  const addNode = () => {
    if (!nodeId) {
      alert('请输入节点ID');
      return;
    }
    if (nodes.some(node => node.id === nodeId)) {
      alert('节点ID已存在');
      return;
    }
    const newNode: Node = {
      id: nodeId,
      x: Math.random() * 300,
      y: Math.random() * 300
    };
    setNodes([...nodes, newNode]);
    setNodeId('');
  };

  const addEdge = () => {
    if (!fromNode || !toNode) {
      alert('请选择起始和终止节点');
      return;
    }
    if (!nodes.some(node => node.id === fromNode) || !nodes.some(node => node.id === toNode)) {
      alert('节点不存在');
      return;
    }
    if (edges.some(edge => edge.from === fromNode && edge.to === toNode)) {
      alert('边已存在');
      return;
    }
    setEdges([...edges, { from: fromNode, to: toNode }]);
    setFromNode('');
    setToNode('');
  };

  const removeNode = (id: string) => {
    setNodes(nodes.filter(node => node.id !== id));
    setEdges(edges.filter(edge => edge.from !== id && edge.to !== id));
  };

  const renderGraph = () => (
    <svg width="400" height="400" className="border rounded bg-white">
      {/* 绘制边 */}
      {edges.map((edge, index) => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);
        if (!fromNode || !toNode) return null;
        return (
          <line
            key={index}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke="gray"
            strokeWidth="2"
          />
        );
      })}

      {/* 绘制节点 */}
      {nodes.map(node => (
        <g key={node.id}>
          <circle
            cx={node.x}
            cy={node.y}
            r="20"
            fill={selectedNode === node.id ? 'lightblue' : 'white'}
            stroke="blue"
            strokeWidth="2"
            onClick={() => setSelectedNode(node.id)}
            className="cursor-pointer"
          />
          <text
            x={node.x}
            y={node.y}
            textAnchor="middle"
            dy=".3em"
            className="select-none"
          >
            {node.id}
          </text>
        </g>
      ))}
    </svg>
  );

  return (
    <DataStructureLayout
      title="图"
      visualization={renderGraph()}
      operations={
        <div className="flex flex-col space-y-4 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={nodeId}
              onChange={(e) => setNodeId(e.target.value)}
              placeholder="节点ID"
              className="border rounded px-2 py-1"
            />
            <button
              onClick={addNode}
              className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              添加节点
            </button>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={fromNode}
              onChange={(e) => setFromNode(e.target.value)}
              placeholder="起始节点"
              className="border rounded px-2 py-1"
            />
            <input
              type="text"
              value={toNode}
              onChange={(e) => setToNode(e.target.value)}
              placeholder="终止节点"
              className="border rounded px-2 py-1"
            />
            <button
              onClick={addEdge}
              className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              添加边
            </button>
          </div>
          {selectedNode && (
            <button
              onClick={() => {
                removeNode(selectedNode);
                setSelectedNode(null);
              }}
              className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              删除选中节点
            </button>
          )}
        </div>
      }
      features={{
        title: "图特点",
        items: [
          "由节点和边组成",
          "可以表示复杂的关系",
          "支持有向和无向",
          "适用于网络、路径等问题"
        ]
      }}
      complexity={{
        title: "性能分析",
        items: [
          { operation: "添加顶点 (Add Vertex)", timeComplexity: "O(1)", spaceComplexity: "O(1)", description: "直接添加新顶点" },
          { operation: "添加边 (Add Edge)", timeComplexity: "O(1)", spaceComplexity: "O(1)", description: "在邻接表中添加边" },
          { operation: "删除顶点 (Remove Vertex)", timeComplexity: "O(V + E)", spaceComplexity: "O(1)", description: "需要删除所有相关边" },
          { operation: "删除边 (Remove Edge)", timeComplexity: "O(1)", spaceComplexity: "O(1)", description: "从邻接表中删除边" },
          { operation: "深度优先搜索 (DFS)", timeComplexity: "O(V + E)", spaceComplexity: "O(V)", description: "访问所有顶点和边" },
          { operation: "广度优先搜索 (BFS)", timeComplexity: "O(V + E)", spaceComplexity: "O(V)", description: "访问所有顶点和边" }
        ],
        summary: {
          bestCase: "O(1)",
          averageCase: "O(V + E)",
          worstCase: "O(V + E)",
          spaceComplexity: "O(V + E)"
        }
      }}
    />
  );
};

export default Graph;
