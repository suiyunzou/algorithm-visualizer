interface HashTableItem {
  key: string;
  value: string;
  hash?: number;
}

interface HashTableState {
  buckets: (HashTableItem[])[];
  size: number;
  capacity: number;
  highlightBuckets: number[];
  highlightItems: HashTableItem[];
  loadFactor: number;
  collisions: number;
  message?: string;
}

export class HashTableStructure {
  private buckets: (HashTableItem[])[];
  private size: number;
  private capacity: number;
  private listeners: ((state: HashTableState) => void)[] = [];
  private highlightBuckets: number[] = [];
  private highlightItems: HashTableItem[] = [];
  private collisions: number = 0;
  private readonly LOAD_FACTOR_THRESHOLD = 0.75;

  constructor(initialCapacity: number = 8) {
    this.capacity = initialCapacity;
    this.buckets = Array(initialCapacity).fill(null).map(() => []);
    this.size = 0;
  }

  private notify(message?: string) {
    const state: HashTableState = {
      buckets: this.buckets,
      size: this.size,
      capacity: this.capacity,
      highlightBuckets: [...this.highlightBuckets],
      highlightItems: [...this.highlightItems],
      loadFactor: this.getLoadFactor(),
      collisions: this.collisions,
      message
    };
    this.listeners.forEach(listener => listener(state));
  }

  subscribe(listener: (state: HashTableState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getState(): HashTableState {
    return {
      buckets: this.buckets,
      size: this.size,
      capacity: this.capacity,
      highlightBuckets: [...this.highlightBuckets],
      highlightItems: [...this.highlightItems],
      loadFactor: this.getLoadFactor(),
      collisions: this.collisions
    };
  }

  private hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash) + key.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) % this.capacity;
  }

  private getLoadFactor(): number {
    return this.size / this.capacity;
  }

  private async resize(newCapacity: number) {
    const oldBuckets = this.buckets;
    this.capacity = newCapacity;
    this.buckets = Array(newCapacity).fill(null).map(() => []);
    this.size = 0;
    this.collisions = 0;

    // 重新插入所有项
    for (const bucket of oldBuckets) {
      for (const item of bucket) {
        await this.set(item.key, item.value, false); // 不触发新的重新调整大小
      }
    }
  }

  async set(key: string, value: string, checkResize: boolean = true): Promise<boolean> {
    const hash = this.hash(key);
    const item: HashTableItem = { key, value, hash };
    
    this.highlightBuckets = [hash];
    this.notify('计算哈希值: ' + hash);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 检查是否已存在相同的键
    const bucket = this.buckets[hash];
    const existingIndex = bucket.findIndex(item => item.key === key);

    if (existingIndex >= 0) {
      // 更新现有值
      bucket[existingIndex].value = value;
      this.highlightItems = [bucket[existingIndex]];
      this.notify('更新现有键的值');
    } else {
      // 添加新项
      if (bucket.length > 0) {
        this.collisions++;
      }
      bucket.push(item);
      this.size++;
      this.highlightItems = [item];
      this.notify('添加新项到桶中');
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    // 检查是否需要调整大小
    if (checkResize && this.getLoadFactor() > this.LOAD_FACTOR_THRESHOLD) {
      this.notify('负载因子超过阈值，调整哈希表大小');
      await this.resize(this.capacity * 2);
    }

    this.highlightBuckets = [];
    this.highlightItems = [];
    this.notify();
    return true;
  }

  async get(key: string): Promise<string | null> {
    const hash = this.hash(key);
    
    this.highlightBuckets = [hash];
    this.notify('计算哈希值: ' + hash);
    await new Promise(resolve => setTimeout(resolve, 500));

    const bucket = this.buckets[hash];
    const item = bucket.find(item => item.key === key);

    if (item) {
      this.highlightItems = [item];
      this.notify('找到键值对');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.highlightBuckets = [];
      this.highlightItems = [];
      this.notify();
      return item.value;
    }

    this.highlightBuckets = [];
    this.notify('未找到键');
    return null;
  }

  async delete(key: string): Promise<boolean> {
    const hash = this.hash(key);
    
    this.highlightBuckets = [hash];
    this.notify('计算哈希值: ' + hash);
    await new Promise(resolve => setTimeout(resolve, 500));

    const bucket = this.buckets[hash];
    const index = bucket.findIndex(item => item.key === key);

    if (index >= 0) {
      const item = bucket[index];
      this.highlightItems = [item];
      this.notify('找到要删除的项');
      await new Promise(resolve => setTimeout(resolve, 500));

      bucket.splice(index, 1);
      this.size--;
      if (bucket.length > 0) {
        this.collisions--;
      }

      this.highlightBuckets = [];
      this.highlightItems = [];
      this.notify('项已删除');
      return true;
    }

    this.highlightBuckets = [];
    this.notify('未找到要删除的键');
    return false;
  }

  async clear() {
    this.buckets = Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
    this.collisions = 0;
    this.highlightBuckets = [];
    this.highlightItems = [];
    this.notify('哈希表已清空');
  }

  getSize(): number {
    return this.size;
  }

  getCapacity(): number {
    return this.capacity;
  }

  getCollisions(): number {
    return this.collisions;
  }
}
