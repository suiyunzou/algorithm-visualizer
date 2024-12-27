import React, { useState, useEffect } from 'react';
import { parseCode } from '../../utils/parser';
import { traverse } from '../../utils/astTraversal';
import ASTVisualizer from './ASTVisualizer';
import CodeDisplay from '../CodeDisplay';

interface CodeVisualizerProps {
  initialCode: string;
}

const CodeVisualizer: React.FC<CodeVisualizerProps> = ({ initialCode }) => {
  const [code, setCode] = useState(initialCode);
  const [ast, setAst] = useState<any>(null);
  const [output, setOutput] = useState('');
  const [currentLine, setCurrentLine] = useState(-1);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const visualizeCode = () => {
    const parsedAst = parseCode(code);
    setAst(parsedAst);

    let visualizationOutput = '';
    let lineNumber = 0;
    const visitors = {
      FunctionDeclaration: {
        enter: (node: any) => {
          visualizationOutput += `进入函数: ${node.id.name}\n`;
          setCurrentLine(node.loc.start.line - 1);
        },
        exit: (node: any) => {
          visualizationOutput += `离开函数: ${node.id.name}\n`;
          setCurrentLine(node.loc.end.line - 1);
        }
      },
      IfStatement: {
        enter: (node: any) => {
          visualizationOutput += `进入条件语句\n`;
          setCurrentLine(node.loc.start.line - 1);
        },
        exit: (node: any) => {
          visualizationOutput += `离开条件语句\n`;
          setCurrentLine(node.loc.end.line - 1);
        }
      },
      ForStatement: {
        enter: (node: any) => {
          visualizationOutput += `进入循环\n`;
          setCurrentLine(node.loc.start.line - 1);
        },
        exit: (node: any) => {
          visualizationOutput += `离开循环\n`;
          setCurrentLine(node.loc.end.line - 1);
        }
      },
      // 添加更多节点类型的访问器...
    };

    traverse(parsedAst, visitors);
    setOutput(visualizationOutput);
  };

  return (
    <div className="code-visualizer">
      <div className="flex mb-4">
        <div className="w-1/2 pr-2">
          <h3 className="text-lg font-semibold mb-2">代码编辑器</h3>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={15}
            className="w-full p-2 border rounded font-mono"
          />
        </div>
        <div className="w-1/2 pl-2">
          <h3 className="text-lg font-semibold mb-2">代码高亮显示</h3>
          <CodeDisplay code={code} language="javascript" currentLine={currentLine} />
        </div>
      </div>
      <button 
        onClick={visualizeCode}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        可视化执行
      </button>
      {ast && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">抽象语法树</h3>
          <ASTVisualizer ast={ast} />
        </div>
      )}
      <div className="output">
        <h3 className="text-lg font-semibold mb-2">执行过程:</h3>
        <pre className="bg-gray-100 p-2 rounded">{output}</pre>
      </div>
    </div>
  );
};

export default CodeVisualizer;