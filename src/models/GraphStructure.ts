interface GraphNode {
  id: string;
  label: string;
  x?: number;
  y?: number;
}

interface GraphEdge {
  source: string;
  target: string;
  weight?: number;
}

interface GraphOperation {
  type: 'addNode' | 'addEdge' | 'removeNode' | 'removeEdge' | 'dfs' | 'bfs';
  nodeId?: string;
  edge?: GraphEdge;
  visitedNodes?: string[];
  visitedEdges?: GraphEdge[];
}

interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  currentOperation: GraphOperation | null;
  highlightNodes: string[];
  highlightEdges: GraphEdge[];
  message?: string;
}

export class GraphStructure {
  private nodes: Map<string, GraphNode>;
  private adjacencyList: Map<string, Map<string, number>>;
  private listeners: ((state: GraphState) => void)[] = [];
  private currentOperation: GraphOperation | null = null;
  private highlightNodes: string[] = [];
  private highlightEdges: GraphEdge[] = [];

  constructor() {
    this.nodes = new Map();
    this.adjacencyList = new Map();
  }

  private notify(message?: string) {
    const state: GraphState = {
      nodes: Array.from(this.nodes.values()),
      edges: this.getEdges(),
      currentOperation: this.currentOperation,
      highlightNodes: [...this.highlightNodes],
      highlightEdges: [...this.highlightEdges],
      message
    };
    this.listeners.forEach(listener => listener(state));
  }

  subscribe(listener: (state: GraphState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getState(): GraphState {
    return {
      nodes: Array.from(this.nodes.values()),
      edges: this.getEdges(),
      currentOperation: this.currentOperation,
      highlightNodes: [...this.highlightNodes],
      highlightEdges: [...this.highlightEdges]
    };
  }

  // 获取所有边
  private getEdges(): GraphEdge[] {
    const edges: GraphEdge[] = [];
    this.adjacencyList.forEach((neighbors, source) => {
      neighbors.forEach((weight, target) => {
        edges.push({ source, target, weight });
      });
    });
    return edges;
  }

  // 添加节点
  async addNode(id: string, label: string) {
    if (this.nodes.has(id)) {
      return false;
    }

    this.currentOperation = { type: 'addNode', nodeId: id };
    this.nodes.set(id, { id, label });
    this.adjacencyList.set(id, new Map());
    
    this.highlightNodes = [id];
    this.notify('添加节点: ' + label);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.highlightNodes = [];
    this.notify();
    return true;
  }

  // 添加边
  async addEdge(source: string, target: string, weight: number = 1) {
    if (!this.nodes.has(source) || !this.nodes.has(target)) {
      return false;
    }

    const edge: GraphEdge = { source, target, weight };
    this.currentOperation = { type: 'addEdge', edge };
    
    this.adjacencyList.get(source)?.set(target, weight);
    this.adjacencyList.get(target)?.set(source, weight); // 无向图
    
    this.highlightNodes = [source, target];
    this.highlightEdges = [edge];
    this.notify('添加边: ' + source + ' - ' + target);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.highlightNodes = [];
    this.highlightEdges = [];
    this.notify();
    return true;
  }

  // 删除节点
  async removeNode(id: string) {
    if (!this.nodes.has(id)) {
      return false;
    }

    this.currentOperation = { type: 'removeNode', nodeId: id };
    this.highlightNodes = [id];
    this.notify('删除节点: ' + id);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 删除所有相关的边
    this.adjacencyList.forEach(neighbors => {
      neighbors.delete(id);
    });
    
    // 删除节点
    this.adjacencyList.delete(id);
    this.nodes.delete(id);
    
    this.highlightNodes = [];
    this.notify();
    return true;
  }

  // 删除边
  async removeEdge(source: string, target: string) {
    if (!this.adjacencyList.get(source)?.has(target)) {
      return false;
    }

    const edge: GraphEdge = { source, target };
    this.currentOperation = { type: 'removeEdge', edge };
    
    this.highlightNodes = [source, target];
    this.highlightEdges = [edge];
    this.notify('删除边: ' + source + ' - ' + target);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.adjacencyList.get(source)?.delete(target);
    this.adjacencyList.get(target)?.delete(source); // 无向图
    
    this.highlightNodes = [];
    this.highlightEdges = [];
    this.notify();
    return true;
  }

  // 深度优先搜索
  async dfs(startId: string) {
    if (!this.nodes.has(startId)) {
      return;
    }

    this.currentOperation = { type: 'dfs', nodeId: startId };
    const visited = new Set<string>();
    const visitedEdges: GraphEdge[] = [];

    const dfsHelper = async (nodeId: string) => {
      visited.add(nodeId);
      this.highlightNodes = Array.from(visited);
      this.highlightEdges = [...visitedEdges];
      this.notify('DFS 访问节点: ' + nodeId);
      
      await new Promise(resolve => setTimeout(resolve, 500));

      const neighbors = this.adjacencyList.get(nodeId) || new Map();
      for (const [neighbor] of neighbors) {
        if (!visited.has(neighbor)) {
          visitedEdges.push({ source: nodeId, target: neighbor });
          await dfsHelper(neighbor);
        }
      }
    };

    await dfsHelper(startId);
    
    this.highlightNodes = [];
    this.highlightEdges = [];
    this.notify();
  }

  // 广度优先搜索
  async bfs(startId: string) {
    if (!this.nodes.has(startId)) {
      return;
    }

    this.currentOperation = { type: 'bfs', nodeId: startId };
    const visited = new Set<string>();
    const visitedEdges: GraphEdge[] = [];
    const queue: string[] = [startId];
    visited.add(startId);

    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      this.highlightNodes = Array.from(visited);
      this.highlightEdges = [...visitedEdges];
      this.notify('BFS 访问节点: ' + nodeId);
      
      await new Promise(resolve => setTimeout(resolve, 500));

      const neighbors = this.adjacencyList.get(nodeId) || new Map();
      for (const [neighbor] of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          visitedEdges.push({ source: nodeId, target: neighbor });
        }
      }
    }

    this.highlightNodes = [];
    this.highlightEdges = [];
    this.notify();
  }

  // 获取节点数量
  getNodeCount(): number {
    return this.nodes.size;
  }

  // 获取边数量
  getEdgeCount(): number {
    let count = 0;
    this.adjacencyList.forEach(neighbors => {
      count += neighbors.size;
    });
    return count / 2; // 无向图中每条边被计算了两次
  }

  // 获取节点的度
  getDegree(nodeId: string): number {
    return this.adjacencyList.get(nodeId)?.size || 0;
  }
}
