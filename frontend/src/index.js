import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const defaultCurrentComment = {
  id: uuidv4(),
  parentId: '',
  author: '',
  body: '',
  timestamp: Date.now(),
  deleted: false
}

const store = createStore(
  reducer,
  {
    posts: [],
    currentPost: null,
    comments: [],
    currentComment: defaultCurrentComment,
    categories: [],
    meta: {}
  },
  composeEnhancers(applyMiddleware(thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
