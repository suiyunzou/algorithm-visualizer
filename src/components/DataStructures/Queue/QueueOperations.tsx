import React, { useState } from 'react';

interface QueueOperationsProps {
  onEnqueue: (value: any) => Promise<boolean>;
  onDequeue: () => Promise<any>;
  onPeek: () => Promise<any>;
  isFull: boolean;
  isEmpty: boolean;
}

const QueueOperations: React.FC<QueueOperationsProps> = ({
  onEnqueue,
  onDequeue,
  onPeek,
  isFull,
  isEmpty
}) => {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const handleEnqueue = async () => {
    if (!value) {
      setMessage('请输入一个值');
      return;
    }

    const success = await onEnqueue(parseInt(value));
    if (success) {
      setValue('');
      setMessage('入队成功');
    } else {
      setMessage('队列已满，无法入队');
    }

    setTimeout(() => setMessage(''), 2000);
  };

  const handleDequeue = async () => {
    const value = await onDequeue();
    if (value !== undefined) {
      setMessage(`出队元素: ${value}`);
    } else {
      setMessage('队列为空，无法出队');
    }

    setTimeout(() => setMessage(''), 2000);
  };

  const handlePeek = async () => {
    const value = await onPeek();
    if (value !== undefined) {
      setMessage(`队首元素: ${value}`);
    } else {
      setMessage('队列为空');
    }

    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg">
      {/* 入队操作 */}
      <div className="flex space-x-2">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="输入值"
          className="border rounded px-2 py-1"
          disabled={isFull}
        />
        <button
          onClick={handleEnqueue}
          disabled={isFull}
          className={`px-4 py-1 rounded text-white ${
            isFull
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          入队 (Enqueue)
        </button>
      </div>

      {/* 出队和查看操作 */}
      <div className="flex space-x-2">
        <button
          onClick={handleDequeue}
          disabled={isEmpty}
          className={`px-4 py-1 rounded text-white ${
            isEmpty
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          出队 (Dequeue)
        </button>
        <button
          onClick={handlePeek}
          disabled={isEmpty}
          className={`px-4 py-1 rounded text-white ${
            isEmpty
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          查看队首 (Peek)
        </button>
      </div>

      {/* 操作提示信息 */}
      {message && (
        <div className="mt-2 p-2 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default QueueOperations;
