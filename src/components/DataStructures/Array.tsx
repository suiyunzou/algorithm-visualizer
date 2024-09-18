import React, { useState } from 'react';
import Visualization from '../Visualization';
import CodeDisplay from '../CodeDisplay';
import ComplexityAnalysis from '../ComplexityAnalysis';

const Array: React.FC = () => {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const arrayCode = `
const array = [1, 2, 3, 4, 5];

// Access element
const element = array[2];

// Add element to end
array.push(6);

// Remove last element
array.pop();
  `;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Array</h2>
      <p className="text-gray-700">An array is a collection of elements stored at contiguous memory locations.</p>
      
      <Visualization data={array} type="array" />
      
      <div className="flex space-x-4">
        <button className="bg-indigo-500 text-white px-4 py-2 rounded">Add Element</button>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded">Remove Element</button>
      </div>
      
      <CodeDisplay code={arrayCode} language="javascript" />
      
      <ComplexityAnalysis 
        timeComplexity="Access: O(1), Search: O(n), Insertion: O(n), Deletion: O(n)"
        spaceComplexity="O(n)"
      />
    </div>
  );
};

export default Array;