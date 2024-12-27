import React, { useState, useEffect } from 'react';
import { LinkedListStructure } from '../../models/LinkedListStructure';
import LinkedListVisualizer from './LinkedList/LinkedListVisualizer';
import LinkedListOperations from './LinkedList/LinkedListOperations';
import LinkedListComplexity from './LinkedList/LinkedListComplexity';

const LinkedList: React.FC = () => {
  const [linkedListStructure] = useState(() => {
    const initialList = new LinkedListStructure([10, 20, 30, 40, 50]);
    return initialList;
  });
  
  const [state, setState] = useState(() => linkedListStructure.getState());

  useEffect(() => {
    console.log('Subscribing to linked list structure updates');
    const unsubscribe = linkedListStructure.subscribe((newState) => {
      console.log('Linked list state updated:', newState);
      setState(newState);
    });
    return () => {
      console.log('Unsubscribing from linked list structure updates');
      unsubscribe();
    };
  }, [linkedListStructure]);

  const handlePrepend = async (value: any) => {
    await linkedListStructure.prepend(value);
  };

  const handleAppend = async (value: any) => {
    await linkedListStructure.append(value);
  };

  const handleInsert = async (value: any, index: number) => {
    await linkedListStructure.insert(value, index);
  };

  const handleDelete = async (index: number) => {
    await linkedListStructure.delete(index);
  };

  const handleSearch = async (value: any) => {
    await linkedListStructure.search(value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">链表可视化</h2>
      
      <LinkedListVisualizer 
        nodes={state?.nodes || []}
        highlightIndices={state?.highlightIndices || []}
      />
      
      <LinkedListOperations
        onPrepend={handlePrepend}
        onAppend={handleAppend}
        onInsert={handleInsert}
        onDelete={handleDelete}
        onSearch={handleSearch}
        maxIndex={state?.nodes ? state.nodes.length : 0}
      />
      
      <LinkedListComplexity />
    </div>
  );
};

export default LinkedList;