/// <reference types="react-scripts" />
declare module 'reactflow' {
  import { ComponentType, ReactNode } from 'react';
  
  export interface ReactFlowProps {
    nodes: Node[];
    edges: Edge[];
    fitView?: boolean;
    // 添加其他你使用的属性
  }

  const ReactFlow: ComponentType<ReactFlowProps>;
  export default ReactFlow;

  export interface Node {
    id: string;
    type?: string;
    data?: any;
    position: { x: number; y: number };
  }
  
  export interface Edge {
    id: string;
    source: string;
    target: string;
    type?: string;
  }

  export const ReactFlowProvider: ComponentType<{ children: ReactNode }>;
}
