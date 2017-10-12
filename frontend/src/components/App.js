import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import queryString from 'query-string';
import PostsList from './PostsList';
import PostForm from './PostForm';
import { getPosts } from '../actions';

class App extends Component {
  state = {
    posts: [],
    comments: [],
    categories: [],
    meta: {}
  }

  baseURL = 'http://localhost:3001';
  headers = {
    'Authorization': 'totesauthd',
    'Content-Type': 'application/json'
  };

  componentDidMount() {
    const { onGetPosts, search } = this.props;
    const { sort, dir } = queryString.parse(search);
    onGetPosts(sort, dir)
  }

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
              meta={this.props.meta}
            />
          )} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, comments, categories, meta }) => {
  return {
    posts,
    comments,
    categories,
    meta
  }
}

const mapDispatchToProps = (dispatch) => ({
  onGetPosts: (sort, dir) => dispatch(getPosts(sort, dir))
})

// FIXME: See https://github.com/reactjs/react-redux/blob/master/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(App);
