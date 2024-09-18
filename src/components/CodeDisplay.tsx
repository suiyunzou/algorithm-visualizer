import React from 'react';
import { motion } from 'framer-motion';

interface CodeDisplayProps {
  code: string[];
  currentLine: number;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, currentLine }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <pre className="text-sm">
        {code.map((line, index) => (
          <motion.div
            key={index}
            initial={{ backgroundColor: 'transparent' }}
            animate={{
              backgroundColor: index === currentLine ? '#FECACA' : 'transparent',
            }}
            transition={{ duration: 0.3 }}
          >
            {line}
          </motion.div>
        ))}
      </pre>
    </div>
  );
};

export default CodeDisplay;