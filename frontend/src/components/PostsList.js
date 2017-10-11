import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import queryString from 'query-string';
import PostItem from './PostItem';
import { getPosts, vote, deletePost } from '../actions';

class PostsList extends Component {
  commentCount(post) {
    const { comments } = this.props;
    return comments.filter((comment) => {
      return comment.parentId === post.id
    }).length
  }

  componentDidMount() {
    const { onGetPosts, search } = this.props;
    const { sort, dir } = queryString.parse(search);
    onGetPosts(sort, dir)
  }

  render() {
    const { posts, onVote, onDeletePost } = this.props;
    return (
      <div className="column">
        <h1>Posts</h1>
        <Link to="/posts/new" className="button is-primary">New Post</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>
                <Link to={{
                  pathname: '/',
                  search: queryString.stringify({
                    sort: 'timestamp',
                    dir: 'desc'
                  })
                }}>
                  Created at
                </Link>
              </th>
              <th>Comment count</th>
              <th>
                <Link to={{
                  pathname: '/',
                  search: queryString.stringify({
                    sort: 'voteScore',
                    dir: 'desc'
                  })
                }}>
                  Current score
                </Link>
              </th>
              <th>Category</th>
              <th colSpan="4">Actions</th>
            </tr>
          </thead>
          <tbody>
            { posts.map((post) => {
              return (
                <PostItem
                  post={post}
                  key={post.id}
                  commentCount={this.commentCount(post)}
                  onVote={onVote}
                  onDeletePost={onDeletePost}
                />
              )
            }) }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  onGetPosts: (sort, dir) => dispatch(getPosts(sort, dir)),
  onVote: (id, option) => dispatch(vote(id, option)),
  onDeletePost: (id) => dispatch(deletePost(id))
})

export default connect(null, mapDispatchToProps)(PostsList);
