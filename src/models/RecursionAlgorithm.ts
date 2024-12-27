export interface RecursionState {
  steps: RecursionStep[];
  currentStep: number;
  message: string;
  isComplete: boolean;
}

export interface RecursionStep {
  id: number;
  level: number;
  function: string;
  args: any[];
  result?: any;
  children: number[];
  parent?: number;
  state: 'pending' | 'active' | 'complete' | 'returning';
}

type Subscriber = (state: RecursionState) => void;

export class RecursionAlgorithm {
  private state: RecursionState;
  private subscribers: Subscriber[] = [];
  private delay: number = 500;
  private stepId: number = 0;

  constructor() {
    this.state = {
      steps: [],
      currentStep: -1,
      message: '',
      isComplete: false
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

  private createStep(level: number, functionName: string, args: any[], parentId?: number): RecursionStep {
    const step: RecursionStep = {
      id: this.stepId++,
      level,
      function: functionName,
      args,
      children: [],
      state: 'pending'
    };

    if (parentId !== undefined) {
      step.parent = parentId;
      const parentStep = this.state.steps.find(s => s.id === parentId);
      if (parentStep) {
        parentStep.children.push(step.id);
      }
    }

    this.state.steps.push(step);
    return step;
  }

  private updateStepState(stepId: number, state: RecursionStep['state'], result?: any) {
    const step = this.state.steps.find(s => s.id === stepId);
    if (step) {
      step.state = state;
      if (result !== undefined) {
        step.result = result;
      }
      this.notify();
    }
  }

  async fibonacci(n: number, level: number = 0, parentId?: number): Promise<number> {
    const step = this.createStep(level, 'fibonacci', [n], parentId);
    this.state.currentStep = step.id;
    this.notify(`计算 fibonacci(${n})`);
    this.updateStepState(step.id, 'active');
    await this.wait();

    if (n <= 1) {
      this.updateStepState(step.id, 'complete', n);
      return n;
    }

    const result1 = await this.fibonacci(n - 1, level + 1, step.id);
    const result2 = await this.fibonacci(n - 2, level + 1, step.id);
    const result = result1 + result2;

    this.updateStepState(step.id, 'returning');
    await this.wait();
    this.updateStepState(step.id, 'complete', result);

    return result;
  }

  async factorial(n: number, level: number = 0, parentId?: number): Promise<number> {
    const step = this.createStep(level, 'factorial', [n], parentId);
    this.state.currentStep = step.id;
    this.notify(`计算 factorial(${n})`);
    this.updateStepState(step.id, 'active');
    await this.wait();

    if (n <= 1) {
      this.updateStepState(step.id, 'complete', 1);
      return 1;
    }

    const subResult = await this.factorial(n - 1, level + 1, step.id);
    const result = n * subResult;

    this.updateStepState(step.id, 'returning');
    await this.wait();
    this.updateStepState(step.id, 'complete', result);

    return result;
  }

  async hanoi(n: number, from: string, to: string, aux: string, level: number = 0, parentId?: number): Promise<void> {
    const step = this.createStep(level, 'hanoi', [n, from, to, aux], parentId);
    this.state.currentStep = step.id;
    this.notify(`移动 ${n} 个圆盘从 ${from} 到 ${to}`);
    this.updateStepState(step.id, 'active');
    await this.wait();

    if (n === 1) {
      this.notify(`直接移动圆盘从 ${from} 到 ${to}`);
      this.updateStepState(step.id, 'complete', `${from} -> ${to}`);
      return;
    }

    await this.hanoi(n - 1, from, aux, to, level + 1, step.id);
    this.notify(`移动最大的圆盘从 ${from} 到 ${to}`);
    await this.hanoi(1, from, to, aux, level + 1, step.id);
    await this.hanoi(n - 1, aux, to, from, level + 1, step.id);

    this.updateStepState(step.id, 'returning');
    await this.wait();
    this.updateStepState(step.id, 'complete', `完成移动 ${n} 个圆盘`);
  }

  reset() {
    this.state = {
      steps: [],
      currentStep: -1,
      message: '',
      isComplete: false
    };
    this.stepId = 0;
    this.notify();
  }
}
