import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import PostsList from './PostsList';
import { getPosts, vote, deletePost } from '../actions'

class App extends Component {
  state = {
    posts: [],
    comments: [],
    categories: []
  }

  baseURL = 'http://localhost:3001';
  headers = {
    'Authorization': 'totesauthd',
    'Content-Type': 'application/json'
  };

  componentDidMount() {
    const { baseURL, headers } = this;

    // get posts
    fetch(`${baseURL}/posts`, {
      method: 'GET',
      headers
    })
    .then((res) => res.json())
    .then((posts) => {
      this.setState({ posts });
      return posts;
    })
    // get comments
    .then((posts) => {
      posts.forEach((post) => {
        fetch(`${baseURL}/posts/${post.id}/comments`, {
          method: 'GET',
          headers
        })
        .then((res) => res.json())
        .then((postComments) => {
          this.setState({
            comments: [...this.state.comments, ...postComments]
          })
        })
      })
    });

    // get categories
    fetch(`${baseURL}/categories`, {
      method: 'GET',
      headers
    })
    .then((res) => res.json())
    .then((json) => this.setState({ categories: json.categories }));
  }

  onVote(id, option) {
    const { baseURL, headers } = this;

    fetch(`${baseURL}/posts/${id}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ option })
    })
  }

  onDelete(id) {
    const { baseURL, headers } = this;

    fetch(`${baseURL}/posts/${id}`, {
      method: 'DELETE',
      headers
    })
  }

  render() {
    return (
      <div className="container">
        <PostsList
          posts={this.state.posts}
          comments={this.state.comments}
          onVote={this.onVote}
          onDeletePost={this.onDelete.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ posts, comments, categories }) => {
  return {
    posts,
    comments,
    categories
  }
}

const mapDispatchToProps = (dispatch) => ({
  onGetPosts: () => dispatch(getPosts),
  onVote: (id, option) => dispatch(vote(id, option)),
  onDeletePost: (id) => dispatch(deletePost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
