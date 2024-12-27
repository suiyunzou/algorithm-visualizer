interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

interface TreeOperation {
  type: 'insert' | 'delete' | 'search';
  value?: number;
  path?: number[];
}

interface TreeState {
  root: TreeNode | null;
  currentOperation: TreeOperation | null;
  highlightNodes: number[];
  treeArray: (number | null)[];
  maxDepth: number;
}

export class BinaryTreeStructure {
  private root: TreeNode | null = null;
  private listeners: ((state: TreeState) => void)[] = [];
  private currentOperation: TreeOperation | null = null;
  private highlightNodes: number[] = [];

  constructor(initialValues: number[] = []) {
    initialValues.forEach(value => this.insert(value));
  }

  private notify() {
    const { treeArray, maxDepth } = this.convertToArray();
    const state: TreeState = {
      root: this.root,
      currentOperation: this.currentOperation,
      highlightNodes: [...this.highlightNodes],
      treeArray,
      maxDepth
    };
    this.listeners.forEach(listener => listener(state));
  }

  subscribe(listener: (state: TreeState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getState(): TreeState {
    const { treeArray, maxDepth } = this.convertToArray();
    return {
      root: this.root,
      currentOperation: this.currentOperation,
      highlightNodes: [...this.highlightNodes],
      treeArray,
      maxDepth
    };
  }

  // 将二叉树转换为数组表示（用于可视化）
  private convertToArray(): { treeArray: (number | null)[]; maxDepth: number } {
    if (!this.root) {
      return { treeArray: [], maxDepth: 0 };
    }

    const treeArray: (number | null)[] = [];
    const queue: (TreeNode | null)[] = [this.root];
    let maxDepth = 1;
    let level = 0;
    let nodesInCurrentLevel = 1;
    let nodesInNextLevel = 0;

    while (queue.length > 0) {
      const levelSize = queue.length;
      let hasNonNullNode = false;

      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();
        
        if (node === null) {
          treeArray.push(null);
          queue.push(null);
          queue.push(null);
        } else {
          treeArray.push(node.value);
          queue.push(node.left);
          queue.push(node.right);
          if (node.left) nodesInNextLevel++;
          if (node.right) nodesInNextLevel++;
          hasNonNullNode = true;
        }
      }

      if (hasNonNullNode) maxDepth = level + 1;
      level++;
      nodesInCurrentLevel = nodesInNextLevel;
      nodesInNextLevel = 0;

      // 当前层全为空节点时停止
      if (nodesInCurrentLevel === 0) break;
    }

    // 移除末尾的空节点
    while (treeArray[treeArray.length - 1] === null) {
      treeArray.pop();
    }

    return { treeArray, maxDepth };
  }

  // 插入节点
  async insert(value: number) {
    this.currentOperation = { type: 'insert', value };
    this.highlightNodes = [];

    if (!this.root) {
      this.root = { value, left: null, right: null };
      this.highlightNodes = [0];
      this.notify();
      await new Promise(resolve => setTimeout(resolve, 500));
      this.highlightNodes = [];
      this.notify();
      return;
    }

    let current = this.root;
    let path: number[] = [0];
    let index = 0;

    while (true) {
      this.highlightNodes = [index];
      this.notify();
      await new Promise(resolve => setTimeout(resolve, 500));

      if (value < current.value) {
        if (current.left === null) {
          current.left = { value, left: null, right: null };
          index = 2 * index + 1;
          this.highlightNodes = [index];
          this.notify();
          await new Promise(resolve => setTimeout(resolve, 500));
          break;
        }
        current = current.left;
        index = 2 * index + 1;
        path.push(index);
      } else {
        if (current.right === null) {
          current.right = { value, left: null, right: null };
          index = 2 * index + 2;
          this.highlightNodes = [index];
          this.notify();
          await new Promise(resolve => setTimeout(resolve, 500));
          break;
        }
        current = current.right;
        index = 2 * index + 2;
        path.push(index);
      }
    }

    this.highlightNodes = [];
    this.notify();
  }

  // 搜索节点
  async search(value: number): Promise<boolean> {
    this.currentOperation = { type: 'search', value };
    this.highlightNodes = [];

    if (!this.root) {
      return false;
    }

    let current = this.root;
    let index = 0;

    while (current !== null) {
      this.highlightNodes = [index];
      this.notify();
      await new Promise(resolve => setTimeout(resolve, 500));

      if (value === current.value) {
        await new Promise(resolve => setTimeout(resolve, 500));
        this.highlightNodes = [];
        this.notify();
        return true;
      }

      if (value < current.value) {
        current = current.left;
        index = 2 * index + 1;
      } else {
        current = current.right;
        index = 2 * index + 2;
      }
    }

    this.highlightNodes = [];
    this.notify();
    return false;
  }

  // 删除节点
  async delete(value: number) {
    this.currentOperation = { type: 'delete', value };
    this.highlightNodes = [];

    const deleteNode = async (node: TreeNode | null, value: number, index: number = 0): Promise<TreeNode | null> => {
      if (node === null) return null;

      this.highlightNodes = [index];
      this.notify();
      await new Promise(resolve => setTimeout(resolve, 500));

      if (value < node.value) {
        node.left = await deleteNode(node.left, value, 2 * index + 1);
      } else if (value > node.value) {
        node.right = await deleteNode(node.right, value, 2 * index + 2);
      } else {
        // 找到要删除的节点
        if (node.left === null && node.right === null) {
          return null;
        } else if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        } else {
          // 有两个子节点，找到右子树的最小值
          let minIndex = 2 * index + 2;
          let minNode = node.right;
          let minParent = node;
          
          while (minNode.left !== null) {
            minParent = minNode;
            minNode = minNode.left;
            minIndex = 2 * minIndex + 1;
            
            this.highlightNodes = [minIndex];
            this.notify();
            await new Promise(resolve => setTimeout(resolve, 500));
          }

          if (minParent !== node) {
            minParent.left = minNode.right;
          } else {
            minParent.right = minNode.right;
          }

          node.value = minNode.value;
        }
      }

      return node;
    };

    this.root = await deleteNode(this.root, value);
    this.highlightNodes = [];
    this.notify();
  }

  // 获取树的深度
  getDepth(): number {
    const calculateDepth = (node: TreeNode | null): number => {
      if (node === null) return 0;
      return 1 + Math.max(calculateDepth(node.left), calculateDepth(node.right));
    };

    return calculateDepth(this.root);
  }

  // 获取节点总数
  getSize(): number {
    const countNodes = (node: TreeNode | null): number => {
      if (node === null) return 0;
      return 1 + countNodes(node.left) + countNodes(node.right);
    };

    return countNodes(this.root);
  }
}
