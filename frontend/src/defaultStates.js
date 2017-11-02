import uuidv4 from 'uuid/v4';

export function defaultPost() {
  return {
    id: uuidv4(),
    title: '',
    author: '',
    body: '',
    category: 'react',
    timestamp: Date.now(),
    deleted: false
  }
};

export function defaultComment() {
  return {
    id: uuidv4(),
    parentId: '',
    author: '',
    body: '',
    timestamp: Date.now(),
    deleted: false
  }
};
