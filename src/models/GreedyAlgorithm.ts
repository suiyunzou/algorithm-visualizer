export interface GreedyState {
  steps: GreedyStep[];
  currentStep: number;
  message: string;
  isComplete: boolean;
  solution: any;
}

export interface GreedyStep {
  id: number;
  type: 'select' | 'skip' | 'solution';
  state: any;
  description: string;
}

type Subscriber = (state: GreedyState) => void;

export class GreedyAlgorithm {
  private state: GreedyState;
  private subscribers: Subscriber[] = [];
  private delay: number = 500;
  private stepId: number = 0;

  constructor() {
    this.state = {
      steps: [],
      currentStep: -1,
      message: '',
      isComplete: false,
      solution: null
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

  private addStep(type: GreedyStep['type'], state: any, description: string) {
    const step: GreedyStep = {
      id: this.stepId++,
      type,
      state: JSON.parse(JSON.stringify(state)),
      description
    };
    this.state.steps.push(step);
    this.state.currentStep = step.id;
    this.notify(description);
  }

  // 找零钱问题
  async makeChange(amount: number, coins: number[]) {
    this.reset();
    const sortedCoins = [...coins].sort((a, b) => b - a); // 从大到小排序
    const result: { coin: number; count: number }[] = [];
    let remaining = amount;

    for (const coin of sortedCoins) {
      if (remaining <= 0) break;

      const count = Math.floor(remaining / coin);
      if (count > 0) {
        result.push({ coin, count });
        remaining -= coin * count;

        this.addStep('select', {
          coin,
          count,
          remaining,
          result: [...result]
        }, `使用 ${count} 个面值为 ${coin} 的硬币，剩余金额: ${remaining}`);
        await this.wait();
      } else {
        this.addStep('skip', {
          coin,
          remaining,
          result: [...result]
        }, `跳过面值为 ${coin} 的硬币，因为它大于剩余金额 ${remaining}`);
        await this.wait();
      }
    }

    if (remaining === 0) {
      this.state.solution = result;
      this.addStep('solution', {
        result: [...result],
        totalCoins: result.reduce((sum, { count }) => sum + count, 0)
      }, '找到最优解！');
    } else {
      this.addStep('solution', {
        result: [...result],
        remaining
      }, `无法完全找零，剩余金额: ${remaining}`);
    }

    this.state.isComplete = true;
    this.notify('找零完成');
  }

  // 活动选择问题
  async selectActivities(activities: { id: number; start: number; end: number }[]) {
    this.reset();
    // 按结束时间排序
    const sortedActivities = [...activities].sort((a, b) => a.end - b.end);
    const selected: typeof activities = [];
    let lastEnd = 0;

    for (const activity of sortedActivities) {
      if (activity.start >= lastEnd) {
        selected.push(activity);
        lastEnd = activity.end;

        this.addStep('select', {
          activity,
          selected: [...selected],
          lastEnd
        }, `选择活动 ${activity.id}（开始: ${activity.start}, 结束: ${activity.end}）`);
        await this.wait();
      } else {
        this.addStep('skip', {
          activity,
          selected: [...selected],
          lastEnd
        }, `跳过活动 ${activity.id}，因为它与已选活动重叠`);
        await this.wait();
      }
    }

    this.state.solution = selected;
    this.addStep('solution', {
      selected: [...selected],
      count: selected.length
    }, `共选择了 ${selected.length} 个活动`);

    this.state.isComplete = true;
    this.notify('活动选择完成');
  }

  reset() {
    this.state = {
      steps: [],
      currentStep: -1,
      message: '',
      isComplete: false,
      solution: null
    };
    this.stepId = 0;
    this.notify();
  }
}
