function executeNode(node, context) {
  switch (node.type) {
    case 'FunctionDeclaration':
      context[node.id.name] = function(...args) {
        const newContext = {...context};
        node.params.forEach((param, index) => {
          newContext[param.name] = args[index];
        });
        return executeNode(node.body, newContext);
      };
      break;
    case 'BlockStatement':
      let result;
      for (const statement of node.body) {
        result = executeNode(statement, context);
        if (result instanceof ReturnValue) return result.value;
      }
      return result;
    case 'ReturnStatement':
      return new ReturnValue(executeNode(node.argument, context));
    case 'BinaryExpression':
      const left = executeNode(node.left, context);
      const right = executeNode(node.right, context);
      switch (node.operator) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return left / right;
        // ... 其他操作符 ...
      }
    case 'Identifier':
      return context[node.name];
    case 'Literal':
      return node.value;
    // ... 其他节点类型 ...
  }
}

class ReturnValue {
  constructor(value) {
    this.value = value;
  }
}

export { executeNode };