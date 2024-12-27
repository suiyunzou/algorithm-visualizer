interface StackOperation {
  type: 'push' | 'pop' | 'peek';
  value?: any;
}

interface StackState {
  items: any[];
  currentOperation: StackOperation | null;
  highlightIndices: number[];
}

export class StackStructure {
  private items: any[] = [];
  private listeners: ((state: StackState) => void)[] = [];
  private currentOperation: StackOperation | null = null;
  private highlightIndices: number[] = [];
  private maxSize: number;

  constructor(initialItems: any[] = [], maxSize: number = 10) {
    this.items = [...initialItems];
    this.maxSize = maxSize;
    this.notify();
  }

  private notify() {
    const state: StackState = {
      items: [...this.items],
      currentOperation: this.currentOperation,
      highlightIndices: [...this.highlightIndices]
    };
    this.listeners.forEach(listener => listener(state));
  }

  subscribe(listener: (state: StackState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getState(): StackState {
    return {
      items: [...this.items],
      currentOperation: this.currentOperation,
      highlightIndices: [...this.highlightIndices]
    };
  }

  // 入栈操作
  async push(value: any): Promise<boolean> {
    if (this.items.length >= this.maxSize) {
      return false; // 栈已满
    }

    this.currentOperation = { type: 'push', value };
    this.highlightIndices = [this.items.length];
    
    this.items.push(value);
    this.notify();
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.highlightIndices = [];
    this.notify();
    return true;
  }

  // 出栈操作
  async pop(): Promise<any> {
    if (this.items.length === 0) {
      return undefined; // 栈为空
    }

    this.currentOperation = { type: 'pop' };
    this.highlightIndices = [this.items.length - 1];
    this.notify();
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const item = this.items.pop();
    this.highlightIndices = [];
    this.notify();
    
    return item;
  }

  // 查看栈顶元素
  async peek(): Promise<any> {
    if (this.items.length === 0) {
      return undefined;
    }

    this.currentOperation = { type: 'peek' };
    this.highlightIndices = [this.items.length - 1];
    this.notify();
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.highlightIndices = [];
    this.notify();
    
    return this.items[this.items.length - 1];
  }

  // 获取栈的大小
  size(): number {
    return this.items.length;
  }

  // 检查栈是否为空
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 检查栈是否已满
  isFull(): boolean {
    return this.items.length >= this.maxSize;
  }

  // 获取最大容量
  getMaxSize(): number {
    return this.maxSize;
  }
}
