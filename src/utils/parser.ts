import * as acorn from 'acorn';

export function parseCode(code: string) {
  return acorn.parse(code, {
    ecmaVersion: 2020,
    sourceType: 'module'
  });
}