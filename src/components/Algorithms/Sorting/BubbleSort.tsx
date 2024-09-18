import React, { useState, useEffect } from 'react';
import VisualizationCanvas from '../../Visualization/VisualizationCanvas';
import AnimationControls from '../../Visualization/AnimationControls';

const BubbleSort: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
  };

  const bubbleSort = async () => {
    setSorting(true);
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise(resolve => setTimeout(resolve, 1000 / speed));
        }
      }
    }

    setSorting(false);
  };

  return (
    <div className="bubble-sort">
      <h2>Bubble Sort Visualization</h2>
      <p>
        Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, 
        compares adjacent elements and swaps them if they are in the wrong order. 
        The pass through the list is repeated until the list is sorted.
      </p>
      <h3>Time Complexity</h3>
      <ul>
        <li>Best Case: O(n) when the array is already sorted</li>
        <li>Average Case: O(n^2)</li>
        <li>Worst Case: O(n^2) when the array is reverse sorted</li>
      </ul>
      <VisualizationCanvas data={array} />
      <AnimationControls
        onStart={bubbleSort}
        onReset={resetArray}
        onSpeedChange={setSpeed}
        disabled={sorting}
      />
    </div>
  );
};

export default BubbleSort;