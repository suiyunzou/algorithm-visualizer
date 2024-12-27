import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

interface CodeDisplayProps {
  code: string;
  language: string;
  currentLine: number;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, language, currentLine }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, currentLine]);

  const lines = code.split('\n');

  return (
    <pre className="relative">
      <code className={`language-${language}`}>
        {lines.map((line, index) => (
          <div 
            key={index} 
            className={`${index === currentLine ? 'bg-yellow-200' : ''}`}
          >
            {line}
          </div>
        ))}
      </code>
    </pre>
  );
};

export default CodeDisplay;