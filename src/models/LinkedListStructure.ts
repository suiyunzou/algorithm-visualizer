interface LinkedListNode {
  value: any;
  next: LinkedListNode | null;
}

interface LinkedListOperation {
  type: 'insert' | 'delete' | 'search' | 'append' | 'prepend';
  index?: number;
  value?: any;
}

interface LinkedListState {
  nodes: LinkedListNode[];
  currentOperation: LinkedListOperation | null;
  highlightIndices: number[];
}

export class LinkedListStructure {
  private head: LinkedListNode | null = null;
  private listeners: ((state: LinkedListState) => void)[] = [];
  private currentOperation: LinkedListOperation | null = null;
  private highlightIndices: number[] = [];

  constructor(initialValues: any[] = []) {
    initialValues.forEach(value => this.append(value));
  }

  private notify() {
    const nodes = this.toArray();
    const state: LinkedListState = {
      nodes,
      currentOperation: this.currentOperation,
      highlightIndices: [...this.highlightIndices]
    };
    this.listeners.forEach(listener => listener(state));
  }

  subscribe(listener: (state: LinkedListState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getState(): LinkedListState {
    return {
      nodes: this.toArray(),
      currentOperation: this.currentOperation,
      highlightIndices: [...this.highlightIndices]
    };
  }

  private toArray(): LinkedListNode[] {
    const nodes: LinkedListNode[] = [];
    let current = this.head;
    while (current !== null) {
      nodes.push({ value: current.value, next: current.next });
      current = current.next;
    }
    return nodes;
  }

  // 在链表头部插入节点
  async prepend(value: any) {
    this.currentOperation = { type: 'prepend', value };
    this.highlightIndices = [0];
    
    const newNode: LinkedListNode = { value, next: this.head };
    this.head = newNode;
    
    this.notify();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.highlightIndices = [];
    this.notify();
  }

  // 在链表尾部追加节点
  async append(value: any) {
    this.currentOperation = { type: 'append', value };
    
    const newNode: LinkedListNode = { value, next: null };
    
    if (!this.head) {
      this.head = newNode;
      this.highlightIndices = [0];
    } else {
      let current = this.head;
      let index = 0;
      
      while (current.next !== null) {
        this.highlightIndices = [index];
        this.notify();
        await new Promise(resolve => setTimeout(resolve, 500));
        current = current.next;
        index++;
      }
      
      current.next = newNode;
      this.highlightIndices = [index + 1];
    }
    
    this.notify();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.highlightIndices = [];
    this.notify();
  }

  // 在指定位置插入节点
  async insert(value: any, index: number) {
    this.currentOperation = { type: 'insert', index, value };
    
    if (index === 0) {
      return this.prepend(value);
    }
    
    let current = this.head;
    let currentIndex = 0;
    
    while (current !== null && currentIndex < index - 1) {
      this.highlightIndices = [currentIndex];
      this.notify();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      current = current.next;
      currentIndex++;
    }
    
    if (current === null) {
      return this.append(value);
    }
    
    const newNode: LinkedListNode = { value, next: current.next };
    current.next = newNode;
    
    this.highlightIndices = [index];
    this.notify();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.highlightIndices = [];
    this.notify();
  }

  // 删除指定位置的节点
  async delete(index: number) {
    if (!this.head || index < 0) return;
    
    this.currentOperation = { type: 'delete', index };
    
    if (index === 0) {
      this.highlightIndices = [0];
      this.notify();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.head = this.head.next;
      this.notify();
      return;
    }
    
    let current = this.head;
    let currentIndex = 0;
    
    while (current.next !== null && currentIndex < index - 1) {
      this.highlightIndices = [currentIndex];
      this.notify();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      current = current.next;
      currentIndex++;
    }
    
    if (current.next === null) return;
    
    this.highlightIndices = [index];
    this.notify();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    current.next = current.next.next;
    
    this.highlightIndices = [];
    this.notify();
  }

  // 搜索值
  async search(value: any): Promise<number> {
    this.currentOperation = { type: 'search', value };
    
    let current = this.head;
    let index = 0;
    
    while (current !== null) {
      this.highlightIndices = [index];
      this.notify();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (current.value === value) {
        return index;
      }
      
      current = current.next;
      index++;
    }
    
    this.highlightIndices = [];
    this.notify();
    return -1;
  }
}
