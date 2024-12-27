class ReturnValue {
  constructor(public value: any) {}
}

export function executeNode(node: any, context: any): any {
  switch (node.type) {
    case 'FunctionDeclaration': {
      context[node.id.name] = function(...args: any[]) {
        const newContext = {...context};
        node.params.forEach((param: any, index: number) => {
          newContext[param.name] = args[index];
        });
        return executeNode(node.body, newContext);
      };
      return;
    }
    case 'BlockStatement': {
      let result;
      for (const statement of node.body) {
        result = executeNode(statement, context);
        if (result instanceof ReturnValue) return result.value;
      }
      return result;
    }
    case 'ReturnStatement': {
      return new ReturnValue(executeNode(node.argument, context));
    }
    case 'BinaryExpression': {
      const left = executeNode(node.left, context);
      const right = executeNode(node.right, context);
      switch (node.operator) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return left / right;
        default: throw new Error(`Unsupported binary operator: ${node.operator}`);
      }
    }
    case 'Identifier': {
      return context[node.name];
    }
    case 'Literal': {
      return node.value;
    }
    case 'IfStatement': {
      const test = executeNode(node.test, context);
      if (test) {
        return executeNode(node.consequent, context);
      } else if (node.alternate) {
        return executeNode(node.alternate, context);
      }
      return;
    }
    case 'CallExpression': {
      const func = executeNode(node.callee, context);
      const args = node.arguments.map((arg: any) => executeNode(arg, context));
      return func(...args);
    }
    default: {
      throw new Error(`Unsupported node type: ${node.type}`);
    }
  }
}