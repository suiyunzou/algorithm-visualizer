import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiPlus, FiMinus, FiRotateCcw, FiFastForward } from 'react-icons/fi';
import CodeDisplay from '../CodeDisplay';


type Node = {
  value: number;
  next: Node | null;
};

type Operation = 'insert' | 'delete' | 'custom';

type AnimationStep = {
  code: string[];
  currentLine: number;
  list: Node[];
  pointer: number | null;
};

const linkedListCode = {
  insert: `
function insert(value) {
  const newNode = { value, next: null };
  if (!head) {
    head = newNode;
  } else {
    let current = head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
}`,
  delete: `
function deleteNode(index) {
  if (index === 0) {
    head = head.next;
    return;
  }
  let current = head;
  for (let i = 0; i < index - 1; i++) {
    if (!current.next) return;
    current = current.next;
  }
  if (current.next) {
    current.next = current.next.next;
  }
}`
};

const LinkedList: React.FC = () => {
  const [list, setList] = useState<Node[]>([]);
  const [customInput, setCustomInput] = useState('');
  const [animationSteps, setAnimationSteps] = useState<AnimationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [operationValue, setOperationValue] = useState('');
  const [message, setMessage] = useState('');
  const [lastOperation, setLastOperation] = useState<{ type: Operation, value?: number, index?: number }>({ type: 'custom' });
  const [previousList, setPreviousList] = useState<Node[]>([]);
  const [pointer, setPointer] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < animationSteps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000 / speed);
    } else if (currentStep === animationSteps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, animationSteps.length, speed]);

  const handleCustomInput = () => {
    const newList: Node[] = customInput.split(',').map(Number).filter(n => !isNaN(n)).map(value => ({ value, next: null }));
    for (let i = 0; i < newList.length - 1; i++) {
      newList[i].next = newList[i + 1];
    }
    setPreviousList(list);
    setList(newList);
    setAnimationSteps(newList.map((node, index) => ({
      code: ['const newList = customInput.split(',').map(Number).filter(n => !isNaN(n)).map(value => ({ value, next: null }));', `newList[${index}] = { value: ${node.value}, next: null };`],
      currentLine: 1,
      list: newList.slice(0, index + 1),
      pointer: null
    })));
    setCurrentStep(0);
    setMessage('链表已更新');
    setLastOperation({ type: 'custom', value: undefined, index: undefined });
  };

  const handleInsert = () => {
    const value = parseInt(operationValue);
    if (!isNaN(value)) {
      const newNode = { value, next: null };
      setPreviousList(list);
      const newList = [...list, newNode];
      if (list.length > 0) {
        list[list.length - 1].next = newNode;
      }
      setList(newList);
      
      const codeLines = linkedListCode.insert.split('\n');
      const steps: AnimationStep[] = [
        { code: codeLines, currentLine: 1, list: [...list], pointer: null },
        { code: codeLines, currentLine: 2, list: [...list], pointer: null },
        { code: codeLines, currentLine: 3, list: [...list], pointer: list.length - 1 },
        { code: codeLines, currentLine: 7, list: [...list, newNode], pointer: list.length },
        { code: codeLines, currentLine: 9, list: newList, pointer: null },
      ];
      
      setAnimationSteps(steps);
      setCurrentStep(0);
      setOperationValue('');
      setMessage(`插入节点 ${value}`);
      setLastOperation({ type: 'insert', value, index: list.length });
    }
  };

  const handleDelete = () => {
    const index = parseInt(operationValue);
    if (!isNaN(index) && index >= 0 && index < list.length) {
      setPreviousList(list);
      const newList = list.filter((_, i) => i !== index);
      if (index < newList.length) {
        newList[index - 1].next = newList[index];
      }
      setList(newList);
      
      const codeLines = linkedListCode.delete.split('\n');
      const steps: AnimationStep[] = [
        { code: codeLines, currentLine: 1, list: [...list], pointer: null },
        { code: codeLines, currentLine: 2, list: [...list], pointer: 0 },
        { code: codeLines, currentLine: 6, list: [...list], pointer: index - 1 },
        { code: codeLines, currentLine: 13, list: [...list], pointer: index },
        { code: codeLines, currentLine: 16, list: newList, pointer: null },
      ];
      
      setAnimationSteps(steps);
      setCurrentStep(0);
      setOperationValue('');
      setMessage(`删除索引 ${index} 的节点`);
      setLastOperation({ type: 'delete', index });
    } else {
      setMessage('无效的索引');
    }
  };

  const undoLastOperation = () => {
    setList(previousList);
    setAnimationSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setMessage('已撤销上一步操作');
  };

  const playAnimation = () => {
    if (animationSteps.length > 0) {
      setIsPlaying(true);
    }
  };

  const pauseAnimation = () => setIsPlaying(false);
  const resetAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  const stepForward = () => {
    if (currentStep < animationSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const renderNodes = (nodes: Node[], currentPointer: number | null) => {
    return (
      <div className="flex items-center">
        {nodes.map((node, index) => (
          <motion.div
            key={index}
            className="flex items-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`relative w-16 h-16 flex flex-col items-center justify-center border-2 rounded-lg ${
              currentPointer === index ? 'border-red-500' : 'border-blue-500'
            } bg-white`}>
              <div className="text-lg font-semibold">{node.value}</div>
              <div className="text-xs">next</div>
              {currentPointer === index && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-red-500">ptr</div>
              )}
            </div>
            {index < nodes.length - 1 && (
              <motion.svg
                className="w-8 h-8 text-gray-400"
                viewBox="0 0 24 24"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <path fill="currentColor" d="M4 11v2h12l-5.5 5.5 1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5 16 11H4z" />
              </motion.svg>
            )}
          </motion.div>
        ))}
        {nodes.length === 0 && <div className="text-gray-500">Empty list</div>}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-800">链表可视化</h2>
      
      {/* 当前链表 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">当前链表</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <AnimatePresence>
            {renderNodes(list, null)}
          </AnimatePresence>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="输入链表节点值，用逗号分隔"
            className="flex-grow border p-2 rounded"
          />
          <button onClick={handleCustomInput} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            设置链表
          </button>
        </div>
      </div>

      {/* 链表操作 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">链表操作</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={operationValue}
            onChange={(e) => setOperationValue(e.target.value)}
            placeholder="输入要插入的值或要删除的索引"
            className="flex-grow border p-2 rounded"
          />
          <button onClick={handleInsert} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center">
            <FiPlus className="mr-1" /> 插入
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center">
            <FiMinus className="mr-1" /> 删除
          </button>
        </div>
        {message && <div className="mt-2 text-green-600 p-2 bg-green-100 rounded">{message}</div>}
      </div>

      {/* 动画播放区域 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">动画播放</h3>
        <div className="flex gap-4">
          <div className="w-1/2">
            <CodeDisplay 
              code={animationSteps[currentStep]?.code || []}
              currentLine={animationSteps[currentStep]?.currentLine || 0}
            />
          </div>
          <div className="w-1/2 overflow-x-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <AnimatePresence>
                {renderNodes(animationSteps[currentStep]?.list || [], animationSteps[currentStep]?.pointer)}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center items-center space-x-4">
          <button onClick={isPlaying ? pauseAnimation : playAnimation} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
            {isPlaying ? <FiPause /> : <FiPlay />}
          </button>
          <button onClick={undoLastOperation} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition-colors">
            <FiRotateCcw />
          </button>
          <button onClick={resetAnimation} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors">
            <FiSkipBack />
          </button>
          <button onClick={stepForward} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors">
            <FiSkipForward />
          </button>
          <div className="flex items-center">
            <FiFastForward className="mr-2 text-gray-600" />
            <input
              type="range"
              min="1"
              max="5"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-24"
            />
            <span className="ml-2 text-sm text-gray-600">{speed}x</span>
          </div>
        </div>
      </div>

      {/* 复杂度分析 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">复杂度分析</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { operation: '访问', complexity: 'O(n)', description: '需要遍历链表直到找到目标节点' },
            { operation: '搜索', complexity: 'O(n)', description: '最坏情况下需要遍历整个链表' },
            { operation: '插入', complexity: 'O(1)', description: '在已知位置插入节点的时间复杂度为常数' },
            { operation: '删除', complexity: 'O(1)', description: '在已知位置删除节点的时间复杂度为常数' },
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-semibold text-lg text-blue-700">{item.operation}</h4>
              <p className="text-2xl font-bold text-indigo-600">{item.complexity}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkedList;