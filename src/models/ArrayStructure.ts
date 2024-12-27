interface ArrayOperation {
  type: 'insert' | 'delete' | 'search' | 'sort' | 'reverse';
  index?: number;
  value?: any;
}

interface ArrayState {
  data: any[];
  currentOperation: ArrayOperation | null;
  highlightIndices: number[];
}

export class ArrayStructure {
  private data: any[] = [];
  private listeners: ((state: ArrayState) => void)[] = [];
  private currentOperation: ArrayOperation | null = null;
  private highlightIndices: number[] = [];

  constructor(initialData: any[] = []) {
    this.data = [...initialData];
    // 初始化时立即通知状态
    this.notify();
  }

  private notify() {
    const state: ArrayState = {
      data: [...this.data],
      currentOperation: this.currentOperation,
      highlightIndices: [...this.highlightIndices]
    };
    this.listeners.forEach(listener => listener(state));
  }

  subscribe(listener: (state: ArrayState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // 插入元素
  async insert(value: any, index?: number) {
    this.currentOperation = { type: 'insert', index, value };
    this.highlightIndices = [index ?? this.data.length];
    
    if (index === undefined) {
      this.data.push(value);
    } else {
      this.data.splice(index, 0, value);
    }
    
    this.notify();
  }

  // 删除元素
  async delete(index: number) {
    this.currentOperation = { type: 'delete', index };
    this.highlightIndices = [index];
    
    this.data.splice(index, 1);
    this.notify();
  }

  // 查找元素
  async search(value: any): Promise<number> {
    this.currentOperation = { type: 'search', value };
    
    for (let i = 0; i < this.data.length; i++) {
      this.highlightIndices = [i];
      this.notify();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (this.data[i] === value) {
        return i;
      }
    }
    
    this.highlightIndices = [];
    this.notify();
    return -1;
  }

  // 排序数组
  async sort() {
    this.currentOperation = { type: 'sort' };
    this.highlightIndices = [];
    
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data.length - i - 1; j++) {
        this.highlightIndices = [j, j + 1];
        this.notify();
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (this.data[j] > this.data[j + 1]) {
          [this.data[j], this.data[j + 1]] = [this.data[j + 1], this.data[j]];
          this.notify();
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }
    
    this.highlightIndices = [];
    this.notify();
  }

  // 反转数组
  async reverse() {
    this.currentOperation = { type: 'reverse' };
    let left = 0;
    let right = this.data.length - 1;

    while (left < right) {
      this.highlightIndices = [left, right];
      this.notify();
      await new Promise(resolve => setTimeout(resolve, 500));

      [this.data[left], this.data[right]] = [this.data[right], this.data[left]];
      left++;
      right--;
      
      this.notify();
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    this.highlightIndices = [];
    this.notify();
  }

  // 获取当前状态
  getState(): ArrayState {
    return {
      data: [...this.data],
      currentOperation: this.currentOperation,
      highlightIndices: [...this.highlightIndices]
    };
  }

  // 重置状态
  reset() {
    this.currentOperation = null;
    this.highlightIndices = [];
    this.notify();
  }
} 