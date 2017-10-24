import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import queryString from 'query-string';
import PostsList from './PostsList';
import PostForm from './PostForm';
import PostDetail from './PostDetail';
import DestroyPost from './DestroyPost';
import { getPosts, vote, getPost, deletePost } from '../actions';

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
    const {
      onGetPosts,
      onVote,
      onGetPost,
      currentPost,
      onDeletePost,
      posts,
      comments,
      meta
    } = this.props;
    return (
      <div className="container content">
        <Switch>
          <Route exact path="/posts/new" render={() => (
            <PostForm
              onGetPosts={onGetPosts}
            />
          )} />
          <Route path="/posts/:id/edit" render={({ match }) => (
            <PostForm
              postId={match.params.id}
              onGetPosts={onGetPosts}
            />
          )} />
          <Route path="/posts/:id/destroy" render={({ match }) => (
            <DestroyPost
              postId={match.params.id}
              onGetPosts={onGetPosts}
              onDeletePost={onDeletePost}
            />
          )} />
          <Route path="/posts/:id" render={({ match }) => (
            <PostDetail
              id={match.params.id}
              onVote={onVote}
              onGetPost={onGetPost}
              currentPost={currentPost}
              comments={comments}
            />
          )} />
          <Route exact path="/" render={({ location }) => (
            <PostsList
              posts={posts}
              comments={comments}
              search={location.search}
              meta={meta}
              onVote={onVote}
              redirect={location.path}
            />
          )} />
        </Switch>
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
  onVote: (id, option, type) => dispatch(vote(id, option, type)),
  onGetPost: (id) => dispatch(getPost(id)),
  onDeletePost: (id) => dispatch(deletePost(id))
})

// FIXME: See https://github.com/reactjs/react-redux/blob/master/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(App);
