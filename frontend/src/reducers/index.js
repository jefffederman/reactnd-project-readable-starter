import { combineReducers } from 'redux';
import {
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  PATCH_POST,
  POST_POST,
  DELETE_COMMENT,
  GET_COMMENTS,
  GET_COMMENT,
  PATCH_COMMENT,
  POST_COMMENT,
  GET_CATEGORIES,
  VOTE
} from '../actions';

function posts(posts = [], action) {
  switch (action.type) {
  case GET_POSTS:
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
    if (action.resourceType === 'posts') {
      return posts.map((post) => {
        if (post.id === action.resource.id) {
          return action.resource;
        }
        return post;
      })
    }
    return posts;

  default:
    return posts;
  }
}

function currentPost(currentPost = null, action) {
  switch (action.type) {
  case GET_POST:
    return action.currentPost;

  case PATCH_POST:
    return action.currentPost;

  case VOTE:
    if (action.resourceType === 'posts') {
      return action.resource;
    }
    return currentPost;

  case POST_POST:
    return action.currentPost;

  default:
    return currentPost;
  }
}

function comments(comments = [], action) {
  switch (action.type) {
  case GET_COMMENTS:
    const actionCommentIds = action.comments.map((actionComment) => {
      return actionComment.id;
    });
    const prevComments = comments.filter((comment) => {
      return !actionCommentIds.includes(comment.id);
    })
    return prevComments.concat(action.comments);

  case VOTE:
    if (action.resourceType === 'comments') {
      return comments.map((comment) => {
        if (comment.id === action.resource.id) {
          return action.resource;
        }
        return comment;
      })
    }
    return comments;

  case DELETE_COMMENT:
    return comments.map((comment) => {
      if (comment.id === action.id) {
        comment.deleted = true
      }
      return comment
    })

  default:
    return comments;
  }
}

function currentComment(currentComment = null, action) {
  switch (action.type) {
  case GET_COMMENT:
    return action.currentComment
  case PATCH_COMMENT:
    return action.currentComment
  case POST_COMMENT:
    return action.currentComment
  default:
    return currentComment;
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
  currentComment,
  categories,
  meta
});
