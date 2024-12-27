import React, { useState } from 'react';

interface HashTableOperationsProps {
  onSet: (key: string, value: string) => Promise<boolean>;
  onGet: (key: string) => Promise<string | null>;
  onDelete: (key: string) => Promise<boolean>;
  onClear: () => Promise<void>;
}

const HashTableOperations: React.FC<HashTableOperationsProps> = ({
  onSet,
  onGet,
  onDelete,
  onClear
}) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleSet = async () => {
    if (!key || !value) {
      showMessage('请输入键和值');
      return;
    }

    setIsLoading(true);
    try {
      await onSet(key, value);
      setKey('');
      setValue('');
      showMessage('设置成功');
    } catch (error) {
      showMessage('设置失败');
    }
    setIsLoading(false);
  };

  const handleGet = async () => {
    if (!key) {
      showMessage('请输入要查找的键');
      return;
    }

    setIsLoading(true);
    try {
      const result = await onGet(key);
      if (result !== null) {
        showMessage(`找到值: ${result}`);
      } else {
        showMessage('未找到该键');
      }
    } catch (error) {
      showMessage('查找失败');
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!key) {
      showMessage('请输入要删除的键');
      return;
    }

    setIsLoading(true);
    try {
      const success = await onDelete(key);
      if (success) {
        setKey('');
        showMessage('删除成功');
      } else {
        showMessage('未找到要删除的键');
      }
    } catch (error) {
      showMessage('删除失败');
    }
    setIsLoading(false);
  };

  const handleClear = async () => {
    setIsLoading(true);
    try {
      await onClear();
      setKey('');
      setValue('');
      showMessage('哈希表已清空');
    } catch (error) {
      showMessage('清空失败');
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      {/* 设置键值对 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">设置键值对</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="键"
            className="border rounded px-2 py-1"
            disabled={isLoading}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="值"
            className="border rounded px-2 py-1"
            disabled={isLoading}
          />
          <button
            onClick={handleSet}
            disabled={isLoading}
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            设置
          </button>
        </div>
      </div>

      {/* 查找和删除操作 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">查找和删除</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleGet}
            disabled={isLoading}
            className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            查找
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            删除
          </button>
          <button
            onClick={handleClear}
            disabled={isLoading}
            className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
          >
            清空
          </button>
        </div>
      </div>

      {/* 示例数据 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">示例数据</h3>
        <div className="flex space-x-2">
          <button
            onClick={async () => {
              setIsLoading(true);
              await onSet('name', '张三');
              await onSet('age', '25');
              await onSet('city', '北京');
              setIsLoading(false);
              showMessage('示例数据已添加');
            }}
            disabled={isLoading}
            className="px-4 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            添加示例数据
          </button>
        </div>
      </div>

      {/* 消息提示 */}
      {message && (
        <div className="mt-4 p-2 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default HashTableOperations;
