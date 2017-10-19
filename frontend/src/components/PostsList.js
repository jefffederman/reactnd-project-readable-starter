import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import queryString from 'query-string';
import PostItem from './PostItem';
import { deletePost } from '../actions';

class PostsList extends Component {
  commentCount(post) {
    const { comments } = this.props;
    return comments.filter((comment) => {
      return comment.parentId === post.id
    }).length
  }

  render() {
    const { posts, onDeletePost, onVote } = this.props;
    const { dir } = this.props.meta;
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
                    dir
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
                    dir
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
                  onDeletePost={onDeletePost}
                  onVote={onVote}
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
  onDeletePost: (id) => dispatch(deletePost(id))
})

export default connect(null, mapDispatchToProps)(PostsList);
