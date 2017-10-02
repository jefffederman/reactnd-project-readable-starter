import { combineReducers } from 'redux';
import {
  GET_POSTS,
  SORT_POSTS,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  GET_COMMENTS,
  GET_CATEGORIES,
  VOTE
} from '../actions';

function posts(state = {}, action) {
  switch (action.type) {
  case GET_POSTS:
    return {
      ...state,
      posts: action.posts
    }

  case DELETE_POST:
    return {
      ...state,
      posts: state.posts.map((post) => {
        if (post.id === action.id) {
          post.deleted = true
        }
        return post
      })
    }

  case VOTE:
    return {
      ...state,
      posts: state.posts.map((post) => {
        if (post.id === action.post.id) {
          return action.post;
        }
        return post;
      })
    }

  default:
    return state;
  }
}

function comments(state = {}, action) {
  switch (action.type) {
  case GET_COMMENTS:
    return {
      ...state,
      comments: action.comments
    }

  default:
    return state;
  }
}

function categories(state = {}, action) {
  switch (action.type) {
  case GET_CATEGORIES:
    return {
      ...state,
      categories: action.categories
    }

  default:
    return state;
  }
}

export default combineReducers({
  posts,
  comments,
  categories
});
