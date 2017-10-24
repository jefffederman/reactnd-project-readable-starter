export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'
export const DELETE_POST = 'DELETE_POST'
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const VOTE = 'VOTE'

const baseURL = 'http://localhost:3001'
const headers = {
  'Authorization': 'totesauthd',
  'Content-Type': 'application/json'
};

export function getPosts(sort, dir) {
  if (typeof sort === 'undefined') {
    sort = 'createdAt';
  }

  if (typeof dir === 'undefined') {
    dir = 'desc';
  }

  return (dispatch) => {
    // get posts
    fetch(`${baseURL}/posts`, {
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
    // get comments
    .then(({ posts }) => {
      posts.forEach((post) => {
        fetch(`${baseURL}/posts/${post.id}/comments`, {
          method: 'GET',
          headers
        })
        .then((res) => res.json())
        .then((comments) => dispatch({
          type: GET_COMMENTS,
          comments
        }))
      })
    });
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

export function deletePost(id) {
  return (dispatch) => {
    return fetch(`${baseURL}/posts/${id}`, {
      method: 'DELETE',
      headers
    })
    .then((res) => res.json())
    .then(() => dispatch({
      type: DELETE_POST,
      id
    }))
    .then(() => getPosts()(dispatch))
  }
}
