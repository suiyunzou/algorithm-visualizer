import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiPlus, FiMinus, FiRotateCcw, FiFastForward } from 'react-icons/fi';

type Operation = 'insert' | 'delete' | 'custom';

const Array: React.FC = () => {
  const [array, setArray] = useState<number[]>([1, 2, 3, 4, 5]);
  const [customInput, setCustomInput] = useState('');
  const [animationSteps, setAnimationSteps] = useState<{ type: 'insert' | 'delete' | 'access', index: number, value?: number }[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [operationValue, setOperationValue] = useState('');
  const [message, setMessage] = useState('');
  const [lastOperation, setLastOperation] = useState<{ type: Operation, value?: number, index?: number }>({ type: 'custom' });
  const [previousArray, setPreviousArray] = useState<number[]>([]);

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
    const newArray = customInput.split(',').map(Number).filter(n => !isNaN(n));
    setArray(newArray);
    setAnimationSteps(newArray.map((value, index) => ({ type: 'insert', index, value })));
    setCurrentStep(0);
    setMessage('数组已更新');
    setLastOperation({ type: 'custom', value: undefined, index: undefined });
  };

  const handleInsert = () => {
    const value = parseInt(operationValue);
    if (!isNaN(value)) {
      setPreviousArray([...array]);
      setAnimationSteps([{ type: 'insert', index: array.length, value }]);
      setCurrentStep(0);
      setOperationValue('');
      setMessage(`插入元素 ${value}`);
      setArray(prev => [...prev, value]);
      setLastOperation({ type: 'insert', value, index: array.length });
    }
  };

  const handleDelete = () => {
    const index = parseInt(operationValue);
    if (!isNaN(index) && index >= 0 && index < array.length) {
      setPreviousArray([...array]);
      setAnimationSteps([{ type: 'delete', index }]);
      setCurrentStep(0);
      setOperationValue('');
      setMessage(`删除索引 ${index} 的元素`);
      setArray(prev => prev.filter((_, i) => i !== index));
      setLastOperation({ type: 'delete', index });
    } else {
      setMessage('无效的索引');
    }
  };

  const undoLastOperation = () => {
    if (lastOperation.type === 'insert') {
      setArray(previousArray);
      setAnimationSteps([{ type: 'delete', index: array.length - 1 }]);
    } else if (lastOperation.type === 'delete' && lastOperation.index !== undefined) {
      setArray(previousArray);
      setAnimationSteps([{ type: 'insert', index: lastOperation.index, value: previousArray[lastOperation.index] }]);
    }
    setCurrentStep(0);
    setIsPlaying(false);
    setMessage('已撤销上一步操作');
  };

  const playAnimation = () => {
    if (lastOperation.type === 'insert' && lastOperation.value !== undefined) {
      // 检查元素是否已经在数组中
      if (!array.includes(lastOperation.value)) {
        setArray(prev => [...prev, lastOperation.value as number]);
      }
      setAnimationSteps([{ type: 'insert', index: array.length - 1, value: lastOperation.value as number }]);
    } else if (lastOperation.type === 'delete' && lastOperation.index !== undefined) {
      // 检查索引是否有效
      if (lastOperation.index < array.length) {
        setArray(prev => prev.filter((_, i) => i !== lastOperation.index));
        setAnimationSteps([{ type: 'delete', index: lastOperation.index }]);
      }
    }
    setCurrentStep(0);
    setIsPlaying(true);
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

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-800">数组可视化</h2>
      
      {/* 输入数组 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">当前数组</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {array.map((num, index) => (
            <div key={index} className="w-12 h-12 flex items-center justify-center border rounded bg-blue-100 text-blue-800 font-semibold">
              {num}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="输入数组元素，用逗号分隔"
            className="flex-grow border p-2 rounded"
          />
          <button onClick={handleCustomInput} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            设置数组
          </button>
        </div>
      </div>

      {/* 增删操作 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">数组操作</h3>
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
        <div className="border p-4 rounded bg-gray-50 min-h-[200px] flex flex-wrap items-center justify-center gap-2">
          <AnimatePresence>
            {array.map((num, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  scale: animationSteps[currentStep]?.index === index ? 1.2 : 1,
                  backgroundColor: animationSteps[currentStep]?.index === index ? '#FEF3C7' : '#FFFFFF',
                  borderColor: animationSteps[currentStep]?.index === index ? '#F59E0B' : '#E5E7EB',
                  borderWidth: animationSteps[currentStep]?.index === index ? '2px' : '1px',
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 flex items-center justify-center border rounded shadow-sm"
              >
                {num}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* 动画控制 */}
        <div className="mt-4 flex justify-center items-center space-x-4">
          <button onClick={isPlaying ? pauseAnimation : playAnimation} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
            {isPlaying ? <FiPause /> : <FiPlay />}
          </button>
          <button onClick={undoLastOperation} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition-colors">
            <FiRotateCcw />
          </button>
          <button onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors">
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
            { operation: '访问', complexity: 'O(1)', description: '通过索引直接访问元素' },
            { operation: '搜索', complexity: 'O(n)', description: '最坏情况下需要遍历整个数组' },
            { operation: '插入', complexity: 'O(n)', description: '最坏情况下需要移动所有元素' },
            { operation: '删除', complexity: 'O(n)', description: '最坏情况下需要移动所有元素' },
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

export default Array;