export interface DPState {
  steps: DPStep[];
  currentStep: number;
  message: string;
  isComplete: boolean;
  solution: any;
  dp: number[][];
}

export interface DPStep {
  id: number;
  type: 'init' | 'calculate' | 'solution';
  state: any;
  description: string;
  row?: number;
  col?: number;
}

type Subscriber = (state: DPState) => void;

export class DynamicProgramming {
  private state: DPState;
  private subscribers: Subscriber[] = [];
  private delay: number = 500;
  private stepId: number = 0;

  constructor() {
    this.state = {
      steps: [],
      currentStep: -1,
      message: '',
      isComplete: false,
      solution: null,
      dp: []
    };
  }

  subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
    subscriber(this.state);
    return () => {
      this.subscribers = this.subscribers.filter(s => s !== subscriber);
    };
  }

  private notify(message: string = '') {
    this.state.message = message;
    this.subscribers.forEach(subscriber => subscriber(this.state));
  }

  setDelay(delay: number) {
    this.delay = delay;
  }

  getState() {
    return this.state;
  }

  private async wait() {
    await new Promise(resolve => setTimeout(resolve, this.delay));
  }

  private addStep(type: DPStep['type'], state: any, description: string, row?: number, col?: number) {
    const step: DPStep = {
      id: this.stepId++,
      type,
      state: JSON.parse(JSON.stringify(state)),
      description,
      row,
      col
    };
    this.state.steps.push(step);
    this.state.currentStep = step.id;
    this.notify(description);
  }

  // 最长递增子序列 (LIS)
  async longestIncreasingSubsequence(nums: number[]) {
    this.reset();
    const n = nums.length;
    const dp = new Array(n).fill(1); // dp[i] 表示以 nums[i] 结尾的最长递增子序列长度
    const prev = new Array(n).fill(-1); // 记录前驱节点，用于重建序列
    let maxLen = 1;
    let maxIndex = 0;

    this.state.dp = [dp.slice()];
    this.addStep('init', {
      nums,
      dp: dp.slice(),
      prev: prev.slice(),
      current: -1,
      comparing: -1
    }, '初始化 dp 数组，每个元素的初始长度为 1');
    await this.wait();

    for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
        this.addStep('calculate', {
          nums,
          dp: dp.slice(),
          prev: prev.slice(),
          current: i,
          comparing: j
        }, `比较 nums[${i}] = ${nums[i]} 和 nums[${j}] = ${nums[j]}`);
        await this.wait();

        if (nums[i] > nums[j] && dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1;
          prev[i] = j;
          this.state.dp[0] = dp.slice();
          
          this.addStep('calculate', {
            nums,
            dp: dp.slice(),
            prev: prev.slice(),
            current: i,
            comparing: j,
            update: true
          }, `更新 dp[${i}] = dp[${j}] + 1 = ${dp[i]}`);
          await this.wait();

          if (dp[i] > maxLen) {
            maxLen = dp[i];
            maxIndex = i;
          }
        }
      }
    }

    // 重建最长递增子序列
    const sequence: number[] = [];
    for (let i = maxIndex; i !== -1; i = prev[i]) {
      sequence.unshift(nums[i]);
    }

    this.state.solution = sequence;
    this.addStep('solution', {
      nums,
      dp: dp.slice(),
      prev: prev.slice(),
      sequence,
      maxLen
    }, `最长递增子序列长度为 ${maxLen}，序列为 [${sequence.join(', ')}]`);

    this.state.isComplete = true;
    this.notify('计算完成');
  }

  // 0/1背包问题
  async knapsack(weights: number[], values: number[], capacity: number) {
    this.reset();
    const n = weights.length;
    const dp: number[][] = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));
    this.state.dp = dp.map(row => [...row]);

    this.addStep('init', {
      weights,
      values,
      capacity,
      dp: dp.map(row => [...row])
    }, '初始化 dp 数组，所有元素初始值为 0');
    await this.wait();

    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        this.addStep('calculate', {
          weights,
          values,
          dp: dp.map(row => [...row]),
          current: { item: i - 1, weight: w }
        }, `考虑第 ${i} 个物品（重量：${weights[i-1]}，价值：${values[i-1]}）和容量 ${w}`);
        await this.wait();

        if (weights[i - 1] <= w) {
          dp[i][w] = Math.max(
            values[i - 1] + dp[i - 1][w - weights[i - 1]],
            dp[i - 1][w]
          );
          this.state.dp = dp.map(row => [...row]);
        } else {
          dp[i][w] = dp[i - 1][w];
          this.state.dp = dp.map(row => [...row]);
        }

        this.addStep('calculate', {
          weights,
          values,
          dp: dp.map(row => [...row]),
          current: { item: i - 1, weight: w },
          update: true
        }, `更新 dp[${i}][${w}] = ${dp[i][w]}`);
        await this.wait();
      }
    }

    // 重建解
    const selected: number[] = [];
    let i = n;
    let w = capacity;
    while (i > 0 && w > 0) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selected.unshift(i - 1);
        w -= weights[i - 1];
      }
      i--;
    }

    this.state.solution = {
      maxValue: dp[n][capacity],
      selected
    };

    this.addStep('solution', {
      weights,
      values,
      dp: dp.map(row => [...row]),
      maxValue: dp[n][capacity],
      selected
    }, `最大价值为 ${dp[n][capacity]}，选择的物品索引为 [${selected.join(', ')}]`);

    this.state.isComplete = true;
    this.notify('计算完成');
  }

  // 编辑距离
  async editDistance(word1: string, word2: string) {
    this.reset();
    const m = word1.length;
    const n = word2.length;
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    this.state.dp = dp.map(row => [...row]);

    // 初始化
    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }
    this.state.dp = dp.map(row => [...row]);

    this.addStep('init', {
      word1,
      word2,
      dp: dp.map(row => [...row])
    }, '初始化 dp 数组，边界值为字符串长度');
    await this.wait();

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        this.addStep('calculate', {
          word1,
          word2,
          dp: dp.map(row => [...row]),
          current: { i: i - 1, j: j - 1 }
        }, `比较 ${word1[i-1]} 和 ${word2[j-1]}`);
        await this.wait();

        if (word1[i - 1] === word2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,    // 删除
            dp[i][j - 1] + 1,    // 插入
            dp[i - 1][j - 1] + 1 // 替换
          );
        }
        this.state.dp = dp.map(row => [...row]);

        this.addStep('calculate', {
          word1,
          word2,
          dp: dp.map(row => [...row]),
          current: { i: i - 1, j: j - 1 },
          update: true
        }, `更新 dp[${i}][${j}] = ${dp[i][j]}`);
        await this.wait();
      }
    }

    // 重建编辑路径
    const operations: string[] = [];
    let i = m, j = n;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && word1[i - 1] === word2[j - 1]) {
        operations.unshift(`保持 ${word1[i - 1]}`);
        i--;
        j--;
      } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
        operations.unshift(`替换 ${word1[i - 1]} 为 ${word2[j - 1]}`);
        i--;
        j--;
      } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
        operations.unshift(`删除 ${word1[i - 1]}`);
        i--;
      } else {
        operations.unshift(`插入 ${word2[j - 1]}`);
        j--;
      }
    }

    this.state.solution = {
      distance: dp[m][n],
      operations
    };

    this.addStep('solution', {
      word1,
      word2,
      dp: dp.map(row => [...row]),
      distance: dp[m][n],
      operations
    }, `编辑距离为 ${dp[m][n]}，编辑步骤：${operations.join(' → ')}`);

    this.state.isComplete = true;
    this.notify('计算完成');
  }

  reset() {
    this.state = {
      steps: [],
      currentStep: -1,
      message: '',
      isComplete: false,
      solution: null,
      dp: []
    };
    this.stepId = 0;
    this.notify();
  }
}
