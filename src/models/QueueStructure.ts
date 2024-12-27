interface QueueOperation {
  type: 'enqueue' | 'dequeue' | 'peek';
  value?: any;
}

interface QueueState {
  items: any[];
  currentOperation: QueueOperation | null;
  highlightIndices: number[];
  front: number;
  rear: number;
}

export class QueueStructure {
  private items: any[];
  private front: number;
  private rear: number;
  private maxSize: number;
  private listeners: ((state: QueueState) => void)[] = [];
  private currentOperation: QueueOperation | null = null;
  private highlightIndices: number[] = [];

  constructor(maxSize: number = 10) {
    this.items = new Array(maxSize).fill(null);
    this.front = -1;
    this.rear = -1;
    this.maxSize = maxSize;
    this.notify();
  }

  private notify() {
    const state: QueueState = {
      items: [...this.items],
      currentOperation: this.currentOperation,
      highlightIndices: [...this.highlightIndices],
      front: this.front,
      rear: this.rear
    };
    this.listeners.forEach(listener => listener(state));
  }

  subscribe(listener: (state: QueueState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getState(): QueueState {
    return {
      items: [...this.items],
      currentOperation: this.currentOperation,
      highlightIndices: [...this.highlightIndices],
      front: this.front,
      rear: this.rear
    };
  }

  // 入队操作
  async enqueue(value: any): Promise<boolean> {
    if (this.isFull()) {
      return false;
    }

    this.currentOperation = { type: 'enqueue', value };

    if (this.isEmpty()) {
      this.front = 0;
    }

    this.rear = (this.rear + 1) % this.maxSize;
    this.items[this.rear] = value;
    
    this.highlightIndices = [this.rear];
    this.notify();
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.highlightIndices = [];
    this.notify();
    
    return true;
  }

  // 出队操作
  async dequeue(): Promise<any> {
    if (this.isEmpty()) {
      return undefined;
    }

    this.currentOperation = { type: 'dequeue' };
    this.highlightIndices = [this.front];
    this.notify();
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const value = this.items[this.front];
    this.items[this.front] = null;
    
    if (this.front === this.rear) {
      // 队列变空
      this.front = -1;
      this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.maxSize;
    }
    
    this.highlightIndices = [];
    this.notify();
    
    return value;
  }

  // 查看队首元素
  async peek(): Promise<any> {
    if (this.isEmpty()) {
      return undefined;
    }

    this.currentOperation = { type: 'peek' };
    this.highlightIndices = [this.front];
    this.notify();
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.highlightIndices = [];
    this.notify();
    
    return this.items[this.front];
  }

  // 获取队列大小
  size(): number {
    if (this.isEmpty()) {
      return 0;
    }
    if (this.rear >= this.front) {
      return this.rear - this.front + 1;
    }
    return this.maxSize - (this.front - this.rear - 1);
  }

  // 检查队列是否为空
  isEmpty(): boolean {
    return this.front === -1;
  }

  // 检查队列是否已满
  isFull(): boolean {
    return (this.rear + 1) % this.maxSize === this.front;
  }

  // 获取最大容量
  getMaxSize(): number {
    return this.maxSize;
  }

  // 获取队首索引
  getFront(): number {
    return this.front;
  }

  // 获取队尾索引
  getRear(): number {
    return this.rear;
  }
}
