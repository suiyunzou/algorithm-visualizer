import React, { useState, useEffect } from 'react';
import { StackStructure } from '../../models/StackStructure';
import StackVisualizer from './Stack/StackVisualizer';
import StackOperations from './Stack/StackOperations';
import StackComplexity from './Stack/StackComplexity';

const Stack: React.FC = () => {
  const [stackStructure] = useState(() => {
    // 创建一个最大容量为 8 的栈，初始包含 3 个元素
    return new StackStructure([10, 20, 30], 8);
  });
  
  const [state, setState] = useState(() => stackStructure.getState());

  useEffect(() => {
    console.log('Subscribing to stack structure updates');
    const unsubscribe = stackStructure.subscribe((newState) => {
      console.log('Stack state updated:', newState);
      setState(newState);
    });
    return () => {
      console.log('Unsubscribing from stack structure updates');
      unsubscribe();
    };
  }, [stackStructure]);

  const handlePush = async (value: any) => {
    return await stackStructure.push(value);
  };

  const handlePop = async () => {
    return await stackStructure.pop();
  };

  const handlePeek = async () => {
    return await stackStructure.peek();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">栈可视化</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <StackVisualizer 
            items={state?.items || []}
            highlightIndices={state?.highlightIndices || []}
            maxSize={stackStructure.getMaxSize()}
          />
        </div>
        
        <div className="space-y-6">
          <StackOperations
            onPush={handlePush}
            onPop={handlePop}
            onPeek={handlePeek}
            isFull={stackStructure.isFull()}
            isEmpty={stackStructure.isEmpty()}
          />
          
          <StackComplexity />
        </div>
      </div>
    </div>
  );
};

export default Stack;
