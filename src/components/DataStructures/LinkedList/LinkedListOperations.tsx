import React, { useState } from 'react';

interface LinkedListOperationsProps {
  onPrepend: (value: any) => void;
  onAppend: (value: any) => void;
  onInsert: (value: any, index: number) => void;
  onDelete: (index: number) => void;
  onSearch: (value: any) => void;
  maxIndex: number;
}

const LinkedListOperations: React.FC<LinkedListOperationsProps> = ({
  onPrepend,
  onAppend,
  onInsert,
  onDelete,
  onSearch,
  maxIndex
}) => {
  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg">
      {/* 头部插入和尾部追加 */}
      <div className="flex space-x-2">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="输入值"
          className="border rounded px-2 py-1"
        />
        <button
          onClick={() => {
            if (value) {
              onPrepend(parseInt(value));
              setValue('');
            }
          }}
          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        >
          头部插入
        </button>
        <button
          onClick={() => {
            if (value) {
              onAppend(parseInt(value));
              setValue('');
            }
          }}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          尾部追加
        </button>
      </div>

      {/* 指定位置插入 */}
      <div className="flex space-x-2">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="输入值"
          className="border rounded px-2 py-1"
        />
        <input
          type="number"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          placeholder="位置"
          className="border rounded px-2 py-1 w-24"
          min="0"
          max={maxIndex}
        />
        <button
          onClick={() => {
            if (value && index) {
              onInsert(parseInt(value), parseInt(index));
              setValue('');
              setIndex('');
            }
          }}
          className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600"
        >
          指定位置插入
        </button>
      </div>

      {/* 删除操作 */}
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="删除位置"
          className="border rounded px-2 py-1"
          min="0"
          max={maxIndex - 1}
          onChange={(e) => onDelete(parseInt(e.target.value))}
        />
      </div>

      {/* 搜索操作 */}
      <div className="flex space-x-2">
        <input
          type="number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="搜索值"
          className="border rounded px-2 py-1"
        />
        <button
          onClick={() => {
            if (searchValue) {
              onSearch(parseInt(searchValue));
              setSearchValue('');
            }
          }}
          className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
        >
          搜索
        </button>
      </div>
    </div>
  );
};

export default LinkedListOperations;
