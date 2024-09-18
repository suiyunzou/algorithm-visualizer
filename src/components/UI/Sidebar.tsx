import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <h2>Data Structures</h2>
      <ul>
        <li><Link to="/data-structures/array">Array</Link></li>
        <li><Link to="/data-structures/linked-list">Linked List</Link></li>
        <li><Link to="/data-structures/stack">Stack</Link></li>
        <li><Link to="/data-structures/queue">Queue</Link></li>
        <li><Link to="/data-structures/binary-tree">Binary Tree</Link></li>
        <li><Link to="/data-structures/graph">Graph</Link></li>
        <li><Link to="/data-structures/hash-table">Hash Table</Link></li>
      </ul>
      <h2>Algorithms</h2>
      <ul>
        <li><Link to="/algorithms/bubble-sort">Bubble Sort</Link></li>
        <li><Link to="/algorithms/insertion-sort">Insertion Sort</Link></li>
        <li><Link to="/algorithms/selection-sort">Selection Sort</Link></li>
        <li><Link to="/algorithms/quick-sort">Quick Sort</Link></li>
        <li><Link to="/algorithms/merge-sort">Merge Sort</Link></li>
        <li><Link to="/algorithms/binary-search">Binary Search</Link></li>
        <li><Link to="/algorithms/dfs">Depth-First Search</Link></li>
        <li><Link to="/algorithms/bfs">Breadth-First Search</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;