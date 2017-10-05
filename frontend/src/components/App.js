import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import PostsList from './PostsList';
import { getPosts } from '../actions'

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
    this.props.onGetPosts()
  }

  render() {
    return (
      <div className="container">
        <PostsList
          posts={this.props.posts}
          comments={this.props.comments}
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
  onGetPosts: () => dispatch(getPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
