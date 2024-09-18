import React, { useState } from 'react';
import VisualizationCanvas from '../Visualization/VisualizationCanvas';

interface Node {
  value: number;
  next: Node | null;
}

const LinkedList: React.FC = () => {
  const [list, setList] = useState<Node[]>([]);

  const addNode = (value: number) => {
    const newNode: Node = { value, next: null };
    setList(prevList => {
      if (prevList.length === 0) return [newNode];
      const newList = [...prevList];
      newList[newList.length - 1].next = newNode;
      return [...newList, newNode];
    });
  };

  const removeNode = () => {
    setList(prevList => {
      if (prevList.length <= 1) return [];
      const newList = prevList.slice(0, -1);
      newList[newList.length - 1].next = null;
      return newList;
    });
  };

  return (
    <div className="linked-list-visualization">
      <h2>Linked List Visualization</h2>
      <VisualizationCanvas data={list.map(node => node.value)} />
      <div className="controls">
        <button onClick={() => addNode(Math.floor(Math.random() * 100))}>
          Add Node
        </button>
        <button onClick={removeNode}>Remove Last Node</button>
      </div>
    </div>
  );
};

export default LinkedList;