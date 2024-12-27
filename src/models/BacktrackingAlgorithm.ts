export interface BacktrackingState {
  steps: BacktrackingStep[];
  currentStep: number;
  message: string;
  isComplete: boolean;
  solutions: any[];
  currentSolution: any;
}

export interface BacktrackingStep {
  id: number;
  level: number;
  type: 'try' | 'backtrack' | 'solution';
  state: any;
  description: string;
}

type Subscriber = (state: BacktrackingState) => void;

export class BacktrackingAlgorithm {
  private state: BacktrackingState;
  private subscribers: Subscriber[] = [];
  private delay: number = 500;
  private stepId: number = 0;

  constructor() {
    this.state = {
      steps: [],
      currentStep: -1,
      message: '',
      isComplete: false,
      solutions: [],
      currentSolution: null
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

  private addStep(type: BacktrackingStep['type'], level: number, state: any, description: string) {
    const step: BacktrackingStep = {
      id: this.stepId++,
      level,
      type,
      state: JSON.parse(JSON.stringify(state)),
      description
    };
    this.state.steps.push(step);
    this.state.currentStep = step.id;
    this.notify(description);
  }

  // 全排列算法
  async permutations(nums: number[]) {
    this.state.solutions = [];
    const used: boolean[] = new Array(nums.length).fill(false);
    const current: number[] = [];
    
    const backtrack = async (level: number) => {
      if (current.length === nums.length) {
        this.state.solutions.push([...current]);
        this.addStep('solution', level, {
          current: [...current],
          used: [...used]
        }, `找到一个解: [${current.join(', ')}]`);
        await this.wait();
        return;
      }
      
      for (let i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        
        used[i] = true;
        current.push(nums[i]);
        
        this.addStep('try', level, {
          current: [...current],
          used: [...used],
          trying: i
        }, `尝试将 ${nums[i]} 放在位置 ${current.length - 1}`);
        await this.wait();
        
        await backtrack(level + 1);
        
        used[i] = false;
        current.pop();
        
        this.addStep('backtrack', level, {
          current: [...current],
          used: [...used],
          backtrack: i
        }, `回溯，移除 ${nums[i]}`);
        await this.wait();
      }
    };
    
    await backtrack(0);
    this.state.isComplete = true;
    this.notify('全排列生成完成');
  }

  // N皇后算法
  async nQueens(n: number) {
    this.state.solutions = [];
    const board: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
    
    const isValid = (row: number, col: number): boolean => {
      // 检查同列
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) return false;
      }
      
      // 检查左上对角线
      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false;
      }
      
      // 检查右上对角线
      for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === 1) return false;
      }
      
      return true;
    };
    
    const backtrack = async (row: number) => {
      if (row === n) {
        const solution = board.map(row => [...row]);
        this.state.solutions.push(solution);
        this.addStep('solution', row, {
          board: solution
        }, `找到一个解`);
        await this.wait();
        return;
      }
      
      for (let col = 0; col < n; col++) {
        if (!isValid(row, col)) continue;
        
        board[row][col] = 1;
        this.addStep('try', row, {
          board: board.map(row => [...row]),
          trying: { row, col }
        }, `尝试在位置 (${row}, ${col}) 放置皇后`);
        await this.wait();
        
        await backtrack(row + 1);
        
        board[row][col] = 0;
        this.addStep('backtrack', row, {
          board: board.map(row => [...row]),
          backtrack: { row, col }
        }, `回溯，移除位置 (${row}, ${col}) 的皇后`);
        await this.wait();
      }
    };
    
    await backtrack(0);
    this.state.isComplete = true;
    this.notify('N皇后问题解决完成');
  }

  // 数独算法
  async sudoku(board: number[][]) {
    const isValid = (row: number, col: number, num: number): boolean => {
      // 检查行
      for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) return false;
      }
      
      // 检查列
      for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) return false;
      }
      
      // 检查3x3方格
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i + startRow][j + startCol] === num) return false;
        }
      }
      
      return true;
    };
    
    const backtrack = async (row: number, col: number): Promise<boolean> => {
      if (col === 9) {
        return await backtrack(row + 1, 0);
      }
      
      if (row === 9) {
        this.state.solutions = [board.map(row => [...row])];
        this.addStep('solution', 0, {
          board: board.map(row => [...row])
        }, '找到数独解');
        await this.wait();
        return true;
      }
      
      if (board[row][col] !== 0) {
        return await backtrack(row, col + 1);
      }
      
      for (let num = 1; num <= 9; num++) {
        if (!isValid(row, col, num)) continue;
        
        board[row][col] = num;
        this.addStep('try', 0, {
          board: board.map(row => [...row]),
          trying: { row, col, num }
        }, `尝试在位置 (${row}, ${col}) 填入数字 ${num}`);
        await this.wait();
        
        if (await backtrack(row, col + 1)) {
          return true;
        }
        
        board[row][col] = 0;
        this.addStep('backtrack', 0, {
          board: board.map(row => [...row]),
          backtrack: { row, col, num }
        }, `回溯，移除位置 (${row}, ${col}) 的数字 ${num}`);
        await this.wait();
      }
      
      return false;
    };
    
    await backtrack(0, 0);
    this.state.isComplete = true;
    this.notify('数独问题解决完成');
  }

  reset() {
    this.state = {
      steps: [],
      currentStep: -1,
      message: '',
      isComplete: false,
      solutions: [],
      currentSolution: null
    };
    this.stepId = 0;
    this.notify();
  }
}
