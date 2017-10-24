import React, { Component } from 'react';
import Post from './Post';

export default class PostDetail extends Component {
  comments(postId) {
    const { comments } = this.props;
    return comments.filter((comment) => {
      return comment.parentId === postId && !comment.deleted
    })
  }

  componentDidMount() {
    const { id, onGetPost } = this.props;
    onGetPost(id)
  }

  render() {
    const { currentPost } = this.props;
    if (currentPost) {
      const { onVote, id } = this.props;
      return (
        <div className="columns">
          <div className="column">
            <Post post={currentPost} onVote={onVote} resource="posts" />
            <hr />
            <h4>{this.comments(id).length} Comments</h4>
            {this.comments(id).map((comment) => {
              return (
                <Post
                  post={comment}
                  onVote={onVote}
                  resource="comments"
                  key={comment.id}
                />
              )
            })}
          </div>
          <div className="column">
          </div>
        </div>
      );
    }
    return null;
  }
}
