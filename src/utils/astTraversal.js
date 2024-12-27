export function traverse(node, visitors, context = {}) {
  const visit = visitors[node.type];
  if (visit && visit.enter) {
    visit.enter(node, context);
  }

  for (const key in node) {
    if (node[key] && typeof node[key] === 'object') {
      if (Array.isArray(node[key])) {
        node[key].forEach(child => traverse(child, visitors, context));
      } else if (node[key].type) {
        traverse(node[key], visitors, context);
      }
    }
  }

  if (visit && visit.exit) {
    visit.exit(node, context);
  }
}