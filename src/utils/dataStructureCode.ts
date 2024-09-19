export const linkedListCode = {
  insert: `
function insert(value) {
  const newNode = { value, next: null };
  if (!head) {
    head = newNode;
  } else {
    let current = head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
}`,
  delete: `
function deleteNode(index) {
  if (index === 0) {
    head = head.next;
    return;
  }
  let current = head;
  for (let i = 0; i < index - 1; i++) {
    if (!current.next) return;
    current = current.next;
  }
  if (current.next) {
    current.next = current.next.next;
  }
}`
};