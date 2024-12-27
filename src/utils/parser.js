import * as acorn from 'acorn';

export function parseCode(code) {
  return acorn.parse(code, {
    ecmaVersion: 2020,
    sourceType: 'module',
    locations: true // 添加位置信息，用于可视化
  });
}