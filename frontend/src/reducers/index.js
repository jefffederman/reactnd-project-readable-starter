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

function posts(posts = [], action) {
  switch (action.type) {
  case GET_POSTS:
    return action.posts;

  case DELETE_POST:
    return posts.map((post) => {
      if (post.id === action.id) {
        post.deleted = true
      }
      return post
    })

  case VOTE:
    return posts.map((post) => {
      if (post.id === action.post.id) {
        return action.post;
      }
      return post;
    })

  default:
    return posts;
  }
}

function comments(comments = [], action) {
  console.log(action.comments)
  switch (action.type) {
  case GET_COMMENTS:
    return comments.concat(action.comments);

  default:
    return comments;
  }
}

function categories(categories = [], action) {
  switch (action.type) {
  case GET_CATEGORIES:
    return action.categories;

  default:
    return categories;
  }
}

export default combineReducers({
  posts,
  comments,
  categories
});
