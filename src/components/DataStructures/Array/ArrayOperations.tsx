import React, { useState } from 'react';

interface ArrayOperationsProps {
  onInsert: (value: any, index?: number) => void;
  onDelete: (index: number) => void;
  onSearch: (value: any) => void;
  onSort: () => void;
  onReverse: () => void;
  maxIndex: number;
}

const ArrayOperations: React.FC<ArrayOperationsProps> = ({
  onInsert,
  onDelete,
  onSearch,
  onSort,
  onReverse,
  maxIndex
}) => {
  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg">
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
          placeholder="位置(可选)"
          className="border rounded px-2 py-1 w-24"
          min="0"
          max={maxIndex}
        />
        <button
          onClick={() => {
            if (value) {
              onInsert(parseInt(value), index ? parseInt(index) : undefined);
              setValue('');
              setIndex('');
            }
          }}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          插入
        </button>
      </div>

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
          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        >
          搜索
        </button>
      </div>

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

      <div className="flex space-x-2">
        <button
          onClick={onSort}
          className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600"
        >
          排序
        </button>
        <button
          onClick={onReverse}
          className="bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-600"
        >
          反转
        </button>
      </div>
    </div>
  );
};

export default ArrayOperations;