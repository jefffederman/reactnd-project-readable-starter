import { baseURL, headers } from '../apiConfig.js'
export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const VOTE = 'VOTE'
export const GET_COMMENT = 'GET_COMMENT'
export const PATCH_COMMENT = 'PATCH_COMMENT'

export function getPosts(sort, dir) {
  if (typeof sort === 'undefined') {
    sort = 'createdAt';
  }

  if (typeof dir === 'undefined') {
    dir = 'desc';
  }

  return (dispatch) => {
    return fetch(`${baseURL}/posts`, {
      method: 'GET',
      headers
    })
    .then((res) => res.json())
    .then((posts) => dispatch({
      type: GET_POSTS,
      posts,
      sort,
      dir
    }))
  }
}

export function getComments(postId) {
  return (dispatch) => {
    return fetch(`${baseURL}/posts/${postId}/comments`, {
      method: 'GET',
      headers
    })
    .then((res) => res.json())
    .then((comments) => dispatch({
      type: GET_COMMENTS,
      comments
    }))
  }
}

// type is either 'posts' or 'comments'
export function vote(id, option, type = 'posts') {
  return (dispatch) => {
    return fetch(`${baseURL}/${type}/${id}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ option })
    })
    .then((res) => res.json())
    .then((resource) => dispatch({
      type: VOTE,
      resourceType: type,
      resource: resource
    }))
  }
}

export function getPost(id) {
  return (dispatch) => {
    return fetch(`${baseURL}/posts/${id}`, {
      method: 'GET',
      headers
    })
    .then((res) => res.json())
    .then((currentPost) => dispatch({
      type: GET_POST,
      currentPost
    }))
  }
}

export function deleteResource(id, resource) {
  return (dispatch) => {
    return fetch(`${baseURL}/${resource}/${id}`, {
      method: 'DELETE',
      headers
    })
    .then((res) => res.json())
    .then(() => {
      if (resource === 'posts') {
        dispatch({
          type: DELETE_POST,
          id
        })
      } else {
        dispatch({
          type: DELETE_COMMENT,
          id
        })
      }
    })
    .then(() => getPosts()(dispatch))
    .then(() => getComments(id)(dispatch))
  }
}

export function getCategories() {
  return (dispatch) => {
    return fetch(`${baseURL}/categories`, {
      method: 'GET',
      headers
    })
    .then((res) => res.json())
    .then(({ categories }) => dispatch({
      type: GET_CATEGORIES,
      categories
    }))
  }
}

export function submitComment(url, options, parentId) {
  return (dispatch) => {
    return fetch(url, options)
    .then(() => getComments(parentId)(dispatch))
  }
}

export function getComment(id) {
  return (dispatch) => {
    return fetch(`${baseURL}/comments/${id}`, {
      method: 'GET',
      headers
    })
    .then((res) => res.json())
    .then((currentComment) => dispatch({
      type: GET_COMMENT,
      currentComment
    }))
  }
}

export function patchComment(comment, name, value) {
  return (dispatch) => {
    dispatch({
      type: PATCH_COMMENT,
      currentComment: {
        ...comment,
        [name]: value
      }
    })
  }
}
