import React, { useState } from 'react';

interface GraphOperationsProps {
  onAddNode: (id: string, label: string) => Promise<boolean>;
  onAddEdge: (source: string, target: string, weight?: number) => Promise<boolean>;
  onRemoveNode: (id: string) => Promise<boolean>;
  onRemoveEdge: (source: string, target: string) => Promise<boolean>;
  onDFS: (startId: string) => Promise<void>;
  onBFS: (startId: string) => Promise<void>;
}

const GraphOperations: React.FC<GraphOperationsProps> = ({
  onAddNode,
  onAddEdge,
  onRemoveNode,
  onRemoveEdge,
  onDFS,
  onBFS
}) => {
  const [nodeId, setNodeId] = useState('');
  const [nodeLabel, setNodeLabel] = useState('');
  const [sourceNode, setSourceNode] = useState('');
  const [targetNode, setTargetNode] = useState('');
  const [weight, setWeight] = useState('1');
  const [message, setMessage] = useState('');

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleAddNode = async () => {
    if (!nodeId || !nodeLabel) {
      showMessage('请输入节点ID和标签');
      return;
    }

    const success = await onAddNode(nodeId, nodeLabel);
    if (success) {
      setNodeId('');
      setNodeLabel('');
      showMessage('节点添加成功');
    } else {
      showMessage('节点ID已存在');
    }
  };

  const handleAddEdge = async () => {
    if (!sourceNode || !targetNode) {
      showMessage('请输入源节点和目标节点');
      return;
    }

    const success = await onAddEdge(sourceNode, targetNode, Number(weight));
    if (success) {
      setSourceNode('');
      setTargetNode('');
      setWeight('1');
      showMessage('边添加成功');
    } else {
      showMessage('无法添加边：节点不存在');
    }
  };

  const handleRemoveNode = async () => {
    if (!nodeId) {
      showMessage('请输入要删除的节点ID');
      return;
    }

    const success = await onRemoveNode(nodeId);
    if (success) {
      setNodeId('');
      showMessage('节点删除成功');
    } else {
      showMessage('节点不存在');
    }
  };

  const handleRemoveEdge = async () => {
    if (!sourceNode || !targetNode) {
      showMessage('请输入要删除的边的两个节点');
      return;
    }

    const success = await onRemoveEdge(sourceNode, targetNode);
    if (success) {
      setSourceNode('');
      setTargetNode('');
      showMessage('边删除成功');
    } else {
      showMessage('边不存在');
    }
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      {/* 添加节点 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">添加节点</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={nodeId}
            onChange={(e) => setNodeId(e.target.value)}
            placeholder="节点ID"
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            value={nodeLabel}
            onChange={(e) => setNodeLabel(e.target.value)}
            placeholder="节点标签"
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleAddNode}
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            添加节点
          </button>
        </div>
      </div>

      {/* 添加边 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">添加边</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={sourceNode}
            onChange={(e) => setSourceNode(e.target.value)}
            placeholder="源节点ID"
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            value={targetNode}
            onChange={(e) => setTargetNode(e.target.value)}
            placeholder="目标节点ID"
            className="border rounded px-2 py-1"
          />
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="权重"
            className="border rounded px-2 py-1 w-20"
          />
          <button
            onClick={handleAddEdge}
            className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            添加边
          </button>
        </div>
      </div>

      {/* 删除操作 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">删除操作</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleRemoveNode}
            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            删除节点
          </button>
          <button
            onClick={handleRemoveEdge}
            className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            删除边
          </button>
        </div>
      </div>

      {/* 图遍历 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">图遍历</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={nodeId}
            onChange={(e) => setNodeId(e.target.value)}
            placeholder="起始节点ID"
            className="border rounded px-2 py-1"
          />
          <button
            onClick={() => nodeId && onDFS(nodeId)}
            className="px-4 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            DFS
          </button>
          <button
            onClick={() => nodeId && onBFS(nodeId)}
            className="px-4 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            BFS
          </button>
        </div>
      </div>

      {/* 消息提示 */}
      {message && (
        <div className="mt-4 p-2 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default GraphOperations;
