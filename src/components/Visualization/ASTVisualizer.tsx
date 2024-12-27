import React from 'react';
import ReactFlow, { Node, Edge, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';

interface ASTVisualizerProps {
  ast: any;
}

const ASTVisualizer: React.FC<ASTVisualizerProps> = ({ ast }) => {
  const { nodes, edges } = convertASTToElements(ast);

  return (
    <ReactFlowProvider>
      <div style={{ height: '500px', width: '100%' }}>
        <ReactFlow nodes={nodes} edges={edges} fitView />
      </div>
    </ReactFlowProvider>
  );
};

function convertASTToElements(ast: any): { nodes: Node[], edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let id = 0;

  function traverse(node: any, parentId: string | null = null, depth: number = 0, horizontalPosition: number = 0) {
    const currentId = (id++).toString();
    nodes.push({
      id: currentId,
      type: 'default',
      data: { label: node.type },
      position: { x: horizontalPosition * 150, y: depth * 100 },
    });

    if (parentId !== null) {
      edges.push({
        id: `e${parentId}-${currentId}`,
        source: parentId,
        target: currentId,
        type: 'smoothstep',
      });
    }

    let childPosition = 0;
    for (const key in node) {
      if (node[key] && typeof node[key] === 'object') {
        if (Array.isArray(node[key])) {
          node[key].forEach((child: any) => {
            traverse(child, currentId, depth + 1, horizontalPosition + childPosition);
            childPosition++;
          });
        } else if (node[key].type) {
          traverse(node[key], currentId, depth + 1, horizontalPosition + childPosition);
          childPosition++;
        }
      }
    }
  }

  traverse(ast);
  return { nodes, edges };
}

export default ASTVisualizer;