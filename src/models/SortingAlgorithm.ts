export interface ArrayElement {
  value: number;
  state: 'default' | 'comparing' | 'sorted' | 'swapping' | 'pivot' | 'current' | 'subarray' | 'heap' | 'counting' | 'bucket' | 'radix';
}

interface SortingState {
  array: ArrayElement[];
  comparisons: number;
  swaps: number;
  message?: string;
}

export class SortingAlgorithm {
  private array: ArrayElement[];
  private listeners: ((state: SortingState) => void)[] = [];
  private comparisons: number = 0;
  private swaps: number = 0;
  private delay: number;

  constructor(initialArray: number[] = [], delay: number = 500) {
    this.array = initialArray.map(value => ({ value, state: 'default' }));
    this.delay = delay;
  }

  private notify(message?: string) {
    const state: SortingState = {
      array: [...this.array],
      comparisons: this.comparisons,
      swaps: this.swaps,
      message
    };
    this.listeners.forEach(listener => listener(state));
  }

  subscribe(listener: (state: SortingState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getState(): SortingState {
    return {
      array: [...this.array],
      comparisons: this.comparisons,
      swaps: this.swaps
    };
  }

  setArray(newArray: number[]) {
    this.array = newArray.map(value => ({ value, state: 'default' }));
    this.comparisons = 0;
    this.swaps = 0;
    this.notify('数组已更新');
  }

  private async wait(ms: number = this.delay) {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

  private async compare(i: number, j: number): Promise<boolean> {
    this.comparisons++;
    this.array[i].state = 'comparing';
    this.array[j].state = 'comparing';
    this.notify(`比较元素 ${this.array[i].value} 和 ${this.array[j].value}`);
    await this.wait();
    
    const result = this.array[i].value > this.array[j].value;
    return result;
  }

  private async swap(i: number, j: number) {
    this.swaps++;
    this.array[i].state = 'swapping';
    this.array[j].state = 'swapping';
    this.notify(`交换元素 ${this.array[i].value} 和 ${this.array[j].value}`);
    await this.wait();

    const temp = this.array[i];
    this.array[i] = this.array[j];
    this.array[j] = temp;
    
    this.array[i].state = 'default';
    this.array[j].state = 'default';
    this.notify();
  }

  async bubbleSort() {
    const n = this.array.length;
    
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      
      for (let j = 0; j < n - i - 1; j++) {
        if (await this.compare(j, j + 1)) {
          await this.swap(j, j + 1);
          swapped = true;
        }
        
        this.array[j].state = 'default';
        this.array[j + 1].state = 'default';
      }
      
      // 标记已排序的元素
      this.array[n - i - 1].state = 'sorted';
      this.notify(`第 ${i + 1} 轮冒泡完成`);
      
      // 如果没有发生交换，说明数组已经有序
      if (!swapped) {
        // 将剩余未标记的元素标记为已排序
        for (let k = 0; k < n - i - 1; k++) {
          this.array[k].state = 'sorted';
        }
        this.notify('数组已经有序，排序完成');
        break;
      }
    }
    
    // 确保第一个元素也被标记为已排序
    if (this.array.length > 0) {
      this.array[0].state = 'sorted';
    }
    
    this.notify('冒泡排序完成');
  }

  async selectionSort() {
    const n = this.array.length;
    
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      this.array[i].state = 'comparing';
      this.notify(`寻找第 ${i + 1} 个最小元素`);
      
      // 在未排序部分找到最小元素
      for (let j = i + 1; j < n; j++) {
        this.array[j].state = 'comparing';
        this.notify(`比较元素 ${this.array[j].value} 和当前最小值 ${this.array[minIndex].value}`);
        await this.wait();
        
        if (await this.compare(j, minIndex)) {
          this.array[minIndex].state = 'default';
          minIndex = j;
        } else {
          this.array[j].state = 'default';
        }
      }
      
      // 如果找到了更小的元素，交换它们
      if (minIndex !== i) {
        await this.swap(i, minIndex);
      }
      
      // 标记已排序的元素
      this.array[i].state = 'sorted';
      this.notify(`第 ${i + 1} 个最小元素已放置到正确位置`);
    }
    
    // 标记最后一个元素为已排序
    if (this.array.length > 0) {
      this.array[n - 1].state = 'sorted';
    }
    
    this.notify('选择排序完成');
  }

  async quickSort(start: number = 0, end: number = this.array.length - 1) {
    if (start >= end) return;

    // 选择基准元素
    const pivotIndex = await this.partition(start, end);
    
    // 递归排序左右两部分
    await this.quickSort(start, pivotIndex - 1);
    await this.quickSort(pivotIndex + 1, end);
  }

  private async partition(start: number, end: number): Promise<number> {
    // 选择最右边的元素作为基准
    const pivotValue = this.array[end].value;
    this.array[end].state = 'pivot';
    this.notify(`选择基准元素: ${pivotValue}`);
    await this.wait();

    let i = start - 1; // 小于基准的元素的最后位置

    // 遍历并将小于基准的元素放到左边
    for (let j = start; j < end; j++) {
      this.array[j].state = 'comparing';
      this.notify(`比较元素 ${this.array[j].value} 和基准元素 ${pivotValue}`);
      await this.wait();

      if (this.array[j].value < pivotValue) {
        i++;
        if (i !== j) {
          await this.swap(i, j);
        }
      }
      this.array[j].state = 'default';
    }

    // 将基准元素放到正确的位置
    const pivotPosition = i + 1;
    if (pivotPosition !== end) {
      await this.swap(pivotPosition, end);
    }

    // 标记基准元素已放置到正确位置
    this.array[pivotPosition].state = 'sorted';
    this.notify(`基准元素 ${pivotValue} 已放置到正确位置`);

    return pivotPosition;
  }

  async insertionSort() {
    const n = this.array.length;
    
    // 第一个元素默认已排序
    if (n > 0) {
      this.array[0].state = 'sorted';
    }
    
    // 从第二个元素开始遍历
    for (let i = 1; i < n; i++) {
      const current = this.array[i].value;
      this.array[i].state = 'current';
      this.notify(`当前处理元素: ${current}`);
      await this.wait();
      
      // 寻找插入位置
      let j = i - 1;
      while (j >= 0 && this.array[j].value > current) {
        this.array[j].state = 'comparing';
        this.notify(`比较元素 ${this.array[j].value} 和 ${current}`);
        await this.wait();
        
        // 将大于当前元素的元素后移
        this.array[j + 1].value = this.array[j].value;
        this.array[j].state = 'sorted';
        this.swaps++;
        j--;
      }
      
      // 插入当前元素
      this.array[j + 1].value = current;
      this.array[j + 1].state = 'sorted';
      this.notify(`元素 ${current} 已插入到正确位置`);
      
      // 更新已排序部分的状态
      for (let k = 0; k <= i; k++) {
        this.array[k].state = 'sorted';
      }
      await this.wait();
    }
    
    this.notify('插入排序完成');
  }

  async shellSort() {
    const n = this.array.length;
    
    // 使用希尔增量序列：n/2, n/4, n/8, ..., 1
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      this.notify(`当前间隔: ${gap}`);
      
      // 对每个子序列进行插入排序
      for (let i = gap; i < n; i++) {
        const temp = this.array[i].value;
        this.array[i].state = 'current';
        let j = i;
        
        // 标记当前子序列
        for (let k = i % gap; k < n; k += gap) {
          if (k !== i) {
            this.array[k].state = 'subarray';
          }
        }
        await this.wait();
        
        // 在子序列中进行插入排序
        while (j >= gap && this.array[j - gap].value > temp) {
          this.array[j - gap].state = 'comparing';
          this.notify(`比较元素 ${this.array[j - gap].value} 和 ${temp}`);
          await this.wait();
          
          this.array[j].value = this.array[j - gap].value;
          this.array[j - gap].state = 'default';
          this.swaps++;
          j -= gap;
        }
        
        this.array[j].value = temp;
        
        // 重置子序列状态
        for (let k = i % gap; k < n; k += gap) {
          if (this.array[k].state === 'subarray') {
            this.array[k].state = 'default';
          }
        }
        
        // 标记已处理的元素
        for (let k = 0; k <= i; k++) {
          if (k % gap === i % gap && k <= i) {
            this.array[k].state = 'sorted';
          }
        }
        await this.wait();
      }
      
      // 当前gap处理完成，标记所有元素为default
      for (let i = 0; i < n; i++) {
        if (this.array[i].state !== 'sorted') {
          this.array[i].state = 'default';
        }
      }
    }
    
    // 最后一遍标记所有元素为已排序
    for (let i = 0; i < n; i++) {
      this.array[i].state = 'sorted';
    }
    
    this.notify('希尔排序完成');
  }

  async heapSort() {
    const n = this.array.length;
    
    // 构建最大堆
    this.notify('构建最大堆');
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await this.heapify(n, i);
    }
    
    // 逐个提取堆顶元素
    for (let i = n - 1; i > 0; i--) {
      // 将堆顶元素（最大值）移到末尾
      this.array[0].state = 'current';
      this.array[i].state = 'comparing';
      this.notify(`将堆顶元素 ${this.array[0].value} 移到位置 ${i}`);
      await this.wait();
      
      await this.swap(0, i);
      this.array[i].state = 'sorted';
      
      // 对剩余的堆进行调整
      await this.heapify(i, 0);
    }
    
    // 标记第一个元素为已排序
    if (n > 0) {
      this.array[0].state = 'sorted';
    }
    
    this.notify('堆排序完成');
  }
  
  private async heapify(n: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // 标记当前子树的根节点
    this.array[i].state = 'current';
    await this.wait();
    
    // 标记左右子节点（如果存在）
    if (left < n) {
      this.array[left].state = 'heap';
    }
    if (right < n) {
      this.array[right].state = 'heap';
    }
    await this.wait();
    
    // 找到最大值
    if (left < n) {
      this.array[left].state = 'comparing';
      await this.wait();
      if (this.array[left].value > this.array[largest].value) {
        if (largest !== i) {
          this.array[largest].state = 'heap';
        }
        largest = left;
        this.array[largest].state = 'current';
      } else {
        this.array[left].state = 'heap';
      }
    }
    
    if (right < n) {
      this.array[right].state = 'comparing';
      await this.wait();
      if (this.array[right].value > this.array[largest].value) {
        if (largest !== i) {
          this.array[largest].state = 'heap';
        }
        largest = right;
        this.array[largest].state = 'current';
      } else {
        this.array[right].state = 'heap';
      }
    }
    
    // 如果最大值不是根节点，则交换并继续调整
    if (largest !== i) {
      this.notify(`交换节点 ${this.array[i].value} 和 ${this.array[largest].value}`);
      await this.swap(i, largest);
      
      // 重置状态
      this.array[i].state = 'heap';
      
      // 递归调整受影响的子树
      await this.heapify(n, largest);
    } else {
      // 重置当前节点状态
      this.array[i].state = 'heap';
    }
  }

  async mergeSort() {
    await this.mergeSortHelper(0, this.array.length - 1);
    
    // 标记所有元素为已排序
    for (let i = 0; i < this.array.length; i++) {
      this.array[i].state = 'sorted';
    }
    
    this.notify('归并排序完成');
  }
  
  private async mergeSortHelper(left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      // 标记当前处理的区间
      for (let i = left; i <= right; i++) {
        this.array[i].state = 'subarray';
      }
      this.notify(`划分区间 [${left}, ${right}]`);
      await this.wait();
      
      // 递归排序左半部分
      await this.mergeSortHelper(left, mid);
      
      // 递归排序右半部分
      await this.mergeSortHelper(mid + 1, right);
      
      // 合并两个有序区间
      await this.merge(left, mid, right);
    }
  }
  
  private async merge(left: number, mid: number, right: number) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    // 创建临时数组
    const L: number[] = [];
    const R: number[] = [];
    
    // 复制数据到临时数组
    for (let i = 0; i < n1; i++) {
      L[i] = this.array[left + i].value;
      this.array[left + i].state = 'current';
    }
    for (let j = 0; j < n2; j++) {
      R[j] = this.array[mid + 1 + j].value;
      this.array[mid + 1 + j].state = 'comparing';
    }
    
    this.notify(`合并区间 [${left}, ${mid}] 和 [${mid + 1}, ${right}]`);
    await this.wait();
    
    let i = 0;
    let j = 0;
    let k = left;
    
    // 合并两个临时数组
    while (i < n1 && j < n2) {
      this.comparisons++;
      if (L[i] <= R[j]) {
        this.array[k].value = L[i];
        this.array[k].state = 'sorted';
        i++;
      } else {
        this.array[k].value = R[j];
        this.array[k].state = 'sorted';
        j++;
      }
      this.swaps++;
      k++;
      await this.wait();
    }
    
    // 复制剩余的元素
    while (i < n1) {
      this.array[k].value = L[i];
      this.array[k].state = 'sorted';
      i++;
      k++;
      this.swaps++;
      await this.wait();
    }
    
    while (j < n2) {
      this.array[k].value = R[j];
      this.array[k].state = 'sorted';
      j++;
      k++;
      this.swaps++;
      await this.wait();
    }
    
    // 重置当前区间的状态
    for (let i = left; i <= right; i++) {
      if (this.array[i].state !== 'sorted') {
        this.array[i].state = 'default';
      }
    }
  }

  async countingSort() {
    const n = this.array.length;
    if (n <= 1) {
      if (n === 1) {
        this.array[0].state = 'sorted';
      }
      return;
    }
    
    // 找到数组中的最大值和最小值
    let max = this.array[0].value;
    let min = this.array[0].value;
    for (let i = 1; i < n; i++) {
      this.array[i].state = 'current';
      await this.wait();
      if (this.array[i].value > max) {
        max = this.array[i].value;
      }
      if (this.array[i].value < min) {
        min = this.array[i].value;
      }
      this.array[i].state = 'default';
    }
    
    // 创建计数数组
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    
    // 统计每个元素出现的次数
    this.notify('统计元素出现次数');
    for (let i = 0; i < n; i++) {
      this.array[i].state = 'current';
      const index = this.array[i].value - min;
      count[index]++;
      this.notify(`元素 ${this.array[i].value} 出现 ${count[index]} 次`);
      await this.wait();
      this.array[i].state = 'counting';
    }
    
    // 计算每个元素的最终位置
    this.notify('计算累加和');
    for (let i = 1; i < range; i++) {
      count[i] += count[i - 1];
    }
    
    // 创建临时数组存储排序结果
    const output = new Array(n);
    for (let i = 0; i < n; i++) {
      output[i] = { value: 0, state: 'default' };
    }
    
    // 从后向前遍历原数组，根据计数数组放置元素
    this.notify('放置元素到正确位置');
    for (let i = n - 1; i >= 0; i--) {
      this.array[i].state = 'current';
      const value = this.array[i].value;
      const index = count[value - min] - 1;
      output[index].value = value;
      count[value - min]--;
      
      // 可视化当前放置的位置
      for (let j = 0; j < n; j++) {
        if (j === index) {
          this.array[j].state = 'comparing';
        } else if (this.array[j].state !== 'sorted') {
          this.array[j].state = 'default';
        }
      }
      
      this.notify(`将元素 ${value} 放置到位置 ${index}`);
      await this.wait();
      this.swaps++;
    }
    
    // 将排序结果复制回原数组
    for (let i = 0; i < n; i++) {
      this.array[i].value = output[i].value;
      this.array[i].state = 'sorted';
      await this.wait();
    }
    
    this.notify('计数排序完成');
  }

  async bucketSort(bucketSize: number = 5) {
    const n = this.array.length;
    if (n <= 1) {
      if (n === 1) {
        this.array[0].state = 'sorted';
      }
      return;
    }
    
    // 找到数组中的最大值和最小值
    let max = this.array[0].value;
    let min = this.array[0].value;
    for (let i = 1; i < n; i++) {
      this.array[i].state = 'current';
      await this.wait();
      if (this.array[i].value > max) {
        max = this.array[i].value;
      }
      if (this.array[i].value < min) {
        min = this.array[i].value;
      }
      this.array[i].state = 'default';
    }
    
    // 计算每个桶的范围
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets: number[][] = Array.from({ length: bucketCount }, () => []);
    
    // 将元素分配到桶中
    this.notify('将元素分配到桶中');
    for (let i = 0; i < n; i++) {
      const bucketIndex = Math.floor((this.array[i].value - min) / bucketSize);
      buckets[bucketIndex].push(this.array[i].value);
      
      // 可视化当前元素分配到的桶
      this.array[i].state = 'current';
      for (let j = 0; j < n; j++) {
        if (Math.floor((this.array[j].value - min) / bucketSize) === bucketIndex && j !== i) {
          this.array[j].state = 'bucket';
        }
      }
      
      this.notify(`将元素 ${this.array[i].value} 放入桶 ${bucketIndex}`);
      await this.wait();
      this.array[i].state = 'bucket';
    }
    
    // 对每个桶进行插入排序
    let currentIndex = 0;
    for (let i = 0; i < bucketCount; i++) {
      // 标记当前桶中的所有元素
      for (let j = 0; j < n; j++) {
        if (Math.floor((this.array[j].value - min) / bucketSize) === i) {
          this.array[j].state = 'current';
        } else if (this.array[j].state !== 'sorted') {
          this.array[j].state = 'default';
        }
      }
      
      this.notify(`对桶 ${i} 进行排序`);
      await this.wait();
      
      // 插入排序
      buckets[i].sort((a, b) => {
        this.comparisons++;
        return a - b;
      });
      
      // 将排序后的桶中元素放回原数组
      for (const value of buckets[i]) {
        this.array[currentIndex].value = value;
        this.array[currentIndex].state = 'sorted';
        this.swaps++;
        currentIndex++;
        await this.wait();
      }
    }
    
    this.notify('桶排序完成');
  }

  async radixSort() {
    const n = this.array.length;
    if (n <= 1) {
      if (n === 1) {
        this.array[0].state = 'sorted';
      }
      return;
    }
    
    // 找到最大值以确定最大位数
    let max = this.array[0].value;
    for (let i = 1; i < n; i++) {
      this.array[i].state = 'current';
      await this.wait();
      if (this.array[i].value > max) {
        max = this.array[i].value;
      }
      this.array[i].state = 'default';
    }
    
    // 对每一位进行计数排序
    let exp = 1; // 当前处理的位数（1代表个位，10代表十位，等等）
    while (max / exp > 0) {
      this.notify(`处理第 ${Math.log10(exp) + 1} 位数字`);
      await this.countingSortByDigit(exp);
      exp *= 10;
      
      // 如果所有数字都处理完了，就退出
      if (max < exp) break;
    }
    
    // 标记所有元素为已排序
    for (let i = 0; i < n; i++) {
      this.array[i].state = 'sorted';
    }
    
    this.notify('基数排序完成');
  }
  
  private async countingSortByDigit(exp: number) {
    const n = this.array.length;
    
    // 创建计数数组和输出数组
    const count = new Array(10).fill(0);
    const output = new Array(n);
    for (let i = 0; i < n; i++) {
      output[i] = { value: 0, state: 'default' };
    }
    
    // 统计每个数字出现的次数
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(this.array[i].value / exp) % 10;
      count[digit]++;
      
      // 可视化当前处理的元素和相同数字的元素
      this.array[i].state = 'current';
      for (let j = 0; j < n; j++) {
        if (j !== i && Math.floor(this.array[j].value / exp) % 10 === digit) {
          this.array[j].state = 'radix';
        }
      }
      
      this.notify(`元素 ${this.array[i].value} 的当前位是 ${digit}`);
      await this.wait();
      
      // 重置状态
      if (this.array[i].state !== 'sorted') {
        this.array[i].state = 'default';
      }
    }
    
    // 计算每个数字的最终位置
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    
    // 从后向前遍历，将元素放到正确的位置
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(this.array[i].value / exp) % 10;
      const index = count[digit] - 1;
      output[index].value = this.array[i].value;
      count[digit]--;
      
      // 可视化当前放置的位置
      this.array[i].state = 'current';
      for (let j = 0; j < n; j++) {
        if (j === index) {
          this.array[j].state = 'comparing';
        }
      }
      
      this.notify(`将元素 ${this.array[i].value} 放置到位置 ${index}`);
      await this.wait();
      this.swaps++;
    }
    
    // 将排序结果复制回原数组
    for (let i = 0; i < n; i++) {
      this.array[i].value = output[i].value;
      this.array[i].state = 'default';
      await this.wait();
    }
  }

  generateRandomArray(size: number, min: number = 1, max: number = 100) {
    const newArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * (max - min + 1)) + min
    );
    this.setArray(newArray);
    return newArray;
  }

  setDelay(ms: number) {
    this.delay = ms;
  }
}
