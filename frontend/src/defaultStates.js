import uuidv4 from 'uuid/v4';

export const defaultPost = {
  id: uuidv4(),
  title: '',
  author: '',
  body: '',
  category: 'react',
  timestamp: Date.now(),
  deleted: false
};

export const defaultComment = {
  id: uuidv4(),
  parentId: '',
  author: '',
  body: '',
  timestamp: Date.now(),
  deleted: false
};
