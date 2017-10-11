import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import PostsList from './PostsList';
import PostForm from './PostForm';

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

  render() {
    return (
      <div className="container content">
        <div className="columns">
          <Route path="/posts/new" render={() => (
            <PostForm />
          )}>
          </Route>
          <Route path="/posts/:id/edit" render={({ match }) => (
            <PostForm
              postId={match.params.id}
            />
          )}>
          </Route>
          <Route exact path="/" render={({ location }) => (
            <PostsList
              posts={this.props.posts}
              comments={this.props.comments}
              search={location.search}
            />
          )} />
        </div>
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

// FIXME: See https://github.com/reactjs/react-redux/blob/master/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux
export default connect(mapStateToProps, null, null, { pure: false })(App);
