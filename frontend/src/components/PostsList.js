import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import PostItem from './PostItem';

export default class PostsList extends Component {
  commentCount(post) {
    const { comments } = this.props;
    return comments.filter((comment) => {
      return comment.parentId === post.id
    }).length
  }

  render() {
    const { posts, onVote, onDelete } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Comment count</th>
            <th>Current score</th>
            <th colSpan='4'>Actions</th>
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
                onDelete={onDelete}
              />
            )
          }) }
        </tbody>
      </table>
    )
  }
}
