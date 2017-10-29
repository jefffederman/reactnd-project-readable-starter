import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import queryString from 'query-string';
import PostsList from './PostsList';
import PostForm from './PostForm';
import PostDetail from './PostDetail';
import DestroyResource from './DestroyResource';
import CommentForm from './CommentForm';
import {
  getPosts,
  vote,
  getPost,
  deleteResource,
  getComments,
  getCategories
} from '../actions';

class App extends Component {
  state = {
    posts: [],
    currentPost: null,
    comments: [],
    categories: [],
    meta: {}
  }

  componentDidMount() {
    const { onGetPosts, search, onGetComments, onGetCategories } = this.props;
    const { sort, dir } = queryString.parse(search);
    onGetPosts(sort, dir)
    .then(({ posts }) => posts.forEach((post) => onGetComments(post.id)))
    onGetCategories();
  }

  render() {
    const {
      onGetPosts,
      onVote,
      onGetPost,
      currentPost,
      onDeleteResource,
      posts,
      comments,
      onGetComments,
      categories,
      meta
    } = this.props;
    return (
      <div className="container content">
        <Switch>
          <Route exact path="/posts/new" render={() => (
            <PostForm
              onGetPosts={onGetPosts}
              categories={categories}
            />
          )} />
          <Route path="/posts/:id/edit" render={({ match }) => (
            <PostForm
              postId={match.params.id}
              onGetPosts={onGetPosts}
              categories={categories}
            />
          )} />
          <Route path="/posts/:postId/comments/new" render={({ match }) => (
            <CommentForm
              parentId={match.params.postId}
              onGetComments={onGetComments}
            />
          )} />
          <Route path="/posts/:postId/comments/:id/edit" render={({ match }) => (
            <CommentForm
              parentId={match.params.postId}
              onGetComments={onGetComments}
              id={match.params.id}
            />
          )} />
          <Route path="/:resource/:id/destroy" render={({ match, location }) => {
            const { parentId } = queryString.parse(location.search);
            return (
              <DestroyResource
                resourceId={match.params.id}
                onGetPosts={onGetPosts}
                onDeleteResource={onDeleteResource}
                resourceType={match.params.resource}
                parentId={parentId}
              />
            )
          }} />
          <Route path="/posts/:id" render={({ match }) => (
            <PostDetail
              id={match.params.id}
              onVote={onVote}
              onGetPost={onGetPost}
              currentPost={currentPost}
              comments={comments}
            />
          )} />
          <Route exact path="/posts" render={({ location }) => (
            <PostsList
              posts={posts}
              comments={comments}
              search={location.search}
              meta={meta}
              onVote={onVote}
              redirect={location.path}
              categories={categories}
            />
          )} />
          <Route exact path="/:category" render={({ location, match }) => (
            <PostsList
              posts={posts}
              comments={comments}
              search={location.search}
              meta={meta}
              onVote={onVote}
              redirect={location.path}
              categories={categories}
              category={match.params.category}
            />
          )} />
          <Route exact path="/" render={() => (
            <Redirect to="/posts" />
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
  onDeleteResource: (id, resource) => dispatch(deleteResource(id, resource)),
  onGetComments: (id) => dispatch(getComments(id)),
  onGetCategories: () => dispatch(getCategories())
})

// FIXME: See https://github.com/reactjs/react-redux/blob/master/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(App);
