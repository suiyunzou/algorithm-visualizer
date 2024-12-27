interface Visitors {
  [key: string]: {
    enter?: (node: any, context: any) => void;
    exit?: (node: any, context: any) => void;
  };
}

export function traverse(node: any, visitors: Visitors, context: any = {}) {
  const visit = visitors[node.type];
  if (visit) {
    visit.enter && visit.enter(node, context);
  }

  for (const key in node) {
    if (node[key] && typeof node[key] === 'object') {
      if (Array.isArray(node[key])) {
        node[key].forEach((child: any) => traverse(child, visitors, context));
      } else if (node[key].type) {
        traverse(node[key], visitors, context);
      }
    }
  }

  if (visit) {
    visit.exit && visit.exit(node, context);
  }
}