import React, { useState, useEffect } from 'react';
import { GraphStructure } from '../../models/GraphStructure';
import GraphVisualizer from './Graph/GraphVisualizer';
import GraphOperations from './Graph/GraphOperations';
import GraphComplexity from './Graph/GraphComplexity';

const Graph: React.FC = () => {
  const [graphStructure] = useState(() => {
    const graph = new GraphStructure();
    // 添加一些初始节点和边
    Promise.all([
      graph.addNode('A', 'A'),
      graph.addNode('B', 'B'),
      graph.addNode('C', 'C'),
      graph.addNode('D', 'D'),
      graph.addEdge('A', 'B'),
      graph.addEdge('B', 'C'),
      graph.addEdge('C', 'D'),
      graph.addEdge('D', 'A'),
    ]);
    return graph;
  });
  
  const [state, setState] = useState(() => graphStructure.getState());

  useEffect(() => {
    console.log('Subscribing to graph structure updates');
    const unsubscribe = graphStructure.subscribe((newState) => {
      console.log('Graph state updated:', newState);
      setState(newState);
    });
    return () => {
      console.log('Unsubscribing from graph structure updates');
      unsubscribe();
    };
  }, [graphStructure]);

  const handleAddNode = async (id: string, label: string) => {
    return await graphStructure.addNode(id, label);
  };

  const handleAddEdge = async (source: string, target: string, weight?: number) => {
    return await graphStructure.addEdge(source, target, weight);
  };

  const handleRemoveNode = async (id: string) => {
    return await graphStructure.removeNode(id);
  };

  const handleRemoveEdge = async (source: string, target: string) => {
    return await graphStructure.removeEdge(source, target);
  };

  const handleDFS = async (startId: string) => {
    await graphStructure.dfs(startId);
  };

  const handleBFS = async (startId: string) => {
    await graphStructure.bfs(startId);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">图可视化</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <GraphVisualizer 
            nodes={state?.nodes || []}
            edges={state?.edges || []}
            highlightNodes={state?.highlightNodes || []}
            highlightEdges={state?.highlightEdges || []}
          />
        </div>
        
        <div>
          <GraphOperations
            onAddNode={handleAddNode}
            onAddEdge={handleAddEdge}
            onRemoveNode={handleRemoveNode}
            onRemoveEdge={handleRemoveEdge}
            onDFS={handleDFS}
            onBFS={handleBFS}
          />
        </div>
        
        <div>
          <GraphComplexity />
        </div>
      </div>

      {/* 图的统计信息 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <span className="text-gray-600">节点数量:</span>
            <span className="ml-2 font-semibold">{graphStructure.getNodeCount()}</span>
          </div>
          <div className="text-center">
            <span className="text-gray-600">边数量:</span>
            <span className="ml-2 font-semibold">{graphStructure.getEdgeCount()}</span>
          </div>
        </div>
      </div>

      {/* 操作提示 */}
      {state?.message && (
        <div className="mt-4 p-2 bg-blue-100 text-blue-700 rounded">
          {state.message}
        </div>
      )}
    </div>
  );
};

export default Graph;
