import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import queryString from 'query-string';
import PostsList from './PostsList';
import PostForm from './PostForm';
import Post from './Post';
import { getPosts, vote, getPost } from '../actions';

class App extends Component {
  state = {
    posts: [],
    currentPost: null,
    comments: [],
    categories: [],
    meta: {}
  }

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
          <Route exact path="/posts/:id" render={({ match }) => (
            <Post
              id={match.params.id}
              onVote={this.props.onVote}
              onGetPost={this.props.onGetPost}
              currentPost={this.props.currentPost}
            />
          )}>
          </Route>
          <Route exact path="/" render={({ location }) => (
            <PostsList
              posts={this.props.posts}
              comments={this.props.comments}
              search={location.search}
              meta={this.props.meta}
              onVote={this.props.onVote}
            />
          )} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, currentPost, comments, categories, meta }) => {
  return {
    posts,
    currentPost,
    comments,
    categories,
    meta
  }
}

const mapDispatchToProps = (dispatch) => ({
  onGetPosts: (sort, dir) => dispatch(getPosts(sort, dir)),
  onVote: (id, option) => dispatch(vote(id, option)),
  onGetPost: (id) => dispatch(getPost(id))
})

// FIXME: See https://github.com/reactjs/react-redux/blob/master/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(App);
