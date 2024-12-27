import { parseCode } from '../../parser.js';
import { traverse } from '../../astTraversal.js';
import { executeNode } from '../../executor.js';

const code = `
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
`;

const ast = parseCode(code);

const visitors = {
  FunctionDeclaration: {
    enter(node) {
      console.log(`进入函数: ${node.id.name}`);
    },
    exit(node) {
      console.log(`离开函数: ${node.id.name}`);
    }
  },
  IfStatement: {
    enter(node) {
      console.log('进入if语句');
    },
    exit(node) {
      console.log('离开if语句');
    }
  },
  ReturnStatement: {
    enter(node) {
      console.log('进入return语句');
    },
    exit(node) {
      console.log('离开return语句');
    }
  },
  BinaryExpression: {
    enter(node) {
      console.log(`进入二元表达式: ${node.operator}`);
    },
    exit(node) {
      console.log(`离开二元表达式: ${node.operator}`);
    }
  },
  CallExpression: {
    enter(node) {
      console.log(`进入函数调用: ${node.callee.name}`);
    },
    exit(node) {
      console.log(`离开函数调用: ${node.callee.name}`);
    }
  }
};

const executionContext = {};
traverse(ast, visitors, executionContext);

const result = executeNode(ast, executionContext);
console.log('执行结果:', result);