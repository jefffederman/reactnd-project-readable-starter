import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
    if (!currentPost || !Object.keys(currentPost).length) {
      return (
        <div className="columns">
          <div className="column">
            <Link to="/posts">
              <i className="fa fa-arrow-left"></i>&nbsp;Back to Posts
            </Link>
            <p>That post does not exist.</p>
          </div>
        </div>
      )
    }
    if (currentPost && Object.keys(currentPost).length) {
      const { onVote, id } = this.props;
      return (
        <div className="columns">
          <div className="column">
            <Link to="/posts">
              <i className="fa fa-arrow-left"></i>&nbsp;Back to Posts
            </Link>
            <Post post={currentPost} onVote={onVote} resourceType="posts" />
            <hr />
            <h4>{this.comments(id).length} Comments</h4>
            <Link to={`/posts/${id}/comments/new`} className="button is-primary">New Comment</Link>
            {this.comments(id).map((comment) => {
              return (
                <Post
                  post={comment}
                  onVote={onVote}
                  resourceType="comments"
                  parentResourceType="posts"
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

PostDetail.propTypes = {
  id: PropTypes.string.isRequired,
  onVote: PropTypes.func.isRequired,
  onGetPost: PropTypes.func.isRequired,
  currentPost: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    voteScore: PropTypes.number.isRequired,
    body: PropTypes.string,
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string,
    deleted: PropTypes.bool.isRequired
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      parentId: PropTypes.string,
      author: PropTypes.string,
      body: PropTypes.string,
      timestamp: PropTypes.string.isRequired,
      deleted: PropTypes.bool.isRequired
    })
  )
};
