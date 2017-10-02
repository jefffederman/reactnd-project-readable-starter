export const GET_POSTS = 'GET_POSTS'
export const SORT_POSTS = 'SORT_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const VOTE = 'VOTE'

const baseURL = 'http://localhost:3001'
const headers = {
  'Authorization': 'totesauthd',
  'Content-Type': 'application/json'
};

export function getPosts() {
  return (dispatch) => {
    // get posts
    fetch(`${baseURL}/posts`, {
      method: 'GET',
      headers
    })
    .then((res) => res.json())
    .then((posts) => dispatch({
      type: GET_POSTS,
      posts
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

export function vote(id, option) {
  return (dispatch) => {
    fetch(`${baseURL}/posts/${id}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ option })
    })
    .then((res) => res.json())
    .then((post) => dispatch({
      type: VOTE,
      post
    }))
  }
}

export function deletePost(id) {
  return (dispatch) => {
    fetch(`${baseURL}/posts/${id}`, {
      method: 'DELETE',
      headers
    })
    .then((res) => res.json())
    .then(() => dispatch({
      type: DELETE_POST,
      id
    }))
  }
}
