import React from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

interface CodeDisplayProps {
  code: string;
  language: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, language }) => {
  React.useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <pre>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

export default CodeDisplay;