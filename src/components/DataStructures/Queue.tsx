import React, { useState, useEffect } from 'react';
import { QueueStructure } from '../../models/QueueStructure';
import QueueVisualizer from './Queue/QueueVisualizer';
import QueueOperations from './Queue/QueueOperations';
import QueueComplexity from './Queue/QueueComplexity';

const Queue: React.FC = () => {
  const [queueStructure] = useState(() => {
    // 创建一个最大容量为 8 的队列
    return new QueueStructure(8);
  });
  
  const [state, setState] = useState(() => queueStructure.getState());

  useEffect(() => {
    console.log('Subscribing to queue structure updates');
    const unsubscribe = queueStructure.subscribe((newState) => {
      console.log('Queue state updated:', newState);
      setState(newState);
    });
    return () => {
      console.log('Unsubscribing from queue structure updates');
      unsubscribe();
    };
  }, [queueStructure]);

  const handleEnqueue = async (value: any) => {
    return await queueStructure.enqueue(value);
  };

  const handleDequeue = async () => {
    return await queueStructure.dequeue();
  };

  const handlePeek = async () => {
    return await queueStructure.peek();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">队列可视化</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <QueueVisualizer 
            items={state?.items || []}
            highlightIndices={state?.highlightIndices || []}
            front={state?.front || -1}
            rear={state?.rear || -1}
          />
        </div>
        
        <div className="space-y-6">
          <QueueOperations
            onEnqueue={handleEnqueue}
            onDequeue={handleDequeue}
            onPeek={handlePeek}
            isFull={queueStructure.isFull()}
            isEmpty={queueStructure.isEmpty()}
          />
          
          <QueueComplexity />
        </div>
      </div>
    </div>
  );
};

export default Queue;
