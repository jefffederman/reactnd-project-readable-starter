import { combineReducers } from 'redux';
import {
  GET_POSTS,
  CREATE_POST,
  GET_POST,
  EDIT_POST,
  DELETE_POST,
  GET_COMMENTS,
  GET_CATEGORIES,
  VOTE
} from '../actions';

function posts(posts = [], action) {
  switch (action.type) {
  case GET_POSTS:
    // FIXME: get routing to trigger action dispatch for query params
    const { sort, dir } = action;
    const sorted = action.posts.sort((a, b) => a[sort] - b[sort]);
    if (dir === 'desc') {
      return sorted.reverse()
    }
    return sorted;

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

function currentPost(currentPost = null, action) {
  switch (action.type) {
  case GET_POST:
    return action.currentPost;

  case VOTE:
    return action.post;

  default:
    return currentPost;
  }
}

function comments(comments = [], action) {
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

function meta(meta = {}, action) {
  switch (action.type) {
  case GET_POSTS:
    const { sort, dir } = action;
    if (sort === meta.sort) {
      const dir = dir === 'asc' ? 'desc' : 'asc'
    }
    return {
      ...meta,
      sort,
      dir
    }
  default:
    return meta;
  }
}

export default combineReducers({
  posts,
  currentPost,
  comments,
  categories,
  meta
});
