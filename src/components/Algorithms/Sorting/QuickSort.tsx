import React, { useState, useEffect } from 'react';
import VisualizationCanvas from '../../Visualization/VisualizationCanvas';
import AnimationControls from '../../Visualization/AnimationControls';

const QuickSort: React.FC = () => {
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

  const quickSort = async () => {
    setSorting(true);
    await quickSortHelper(0, array.length - 1);
    setSorting(false);
  };

  const quickSortHelper = async (low: number, high: number) => {
    if (low < high) {
      const pivotIndex = await partition(low, high);
      await quickSortHelper(low, pivotIndex - 1);
      await quickSortHelper(pivotIndex + 1, high);
    }
  };

  const partition = async (low: number, high: number) => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        setArray([...array]);
        await new Promise(resolve => setTimeout(resolve, 1000 / speed));
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    setArray([...array]);
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    return i + 1;
  };

  return (
    <div className="quick-sort">
      <h2>Quick Sort Visualization</h2>
      <VisualizationCanvas data={array} />
      <AnimationControls
        onStart={quickSort}
        onReset={resetArray}
        onSpeedChange={setSpeed}
        disabled={sorting}
      />
    </div>
  );
};

export default QuickSort;