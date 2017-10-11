// TODO: make functional component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';

export default class PostItem extends Component {
  formatTimestamp(timestamp) {
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }
    return new Date(timestamp).toLocaleString('en-US', options)
  }

  render() {
    const { title, author, voteScore, id, timestamp, category } = this.props.post;
    const { commentCount, onVote, onDeletePost } = this.props;
    return (
      <tr>
        <td>{title}</td>
        <td>{author}</td>
        <td>{this.formatTimestamp(timestamp)}</td>
        <td>{commentCount}</td>
        <td>{voteScore}</td>
        <td>{category}</td>
        <td>
          <button className="button" onClick={() => onVote(id, 'upVote')}>
            <i className="fa fa-thumbs-o-up"></i>
          </button>
        </td>
        <td>
          <button className="button" onClick={() => onVote(id, 'downVote')}>
            <i className="fa fa-thumbs-o-down"></i>
          </button>
        </td>
        <td>
          <button className="button">
            <Link to={`/posts/${id}/edit`}>
              <i className="fa fa-pencil"></i>
            </Link>
          </button>
        </td>
        <td>
          <button className="button is-outlined is-danger" onClick={() => onDeletePost(id)}>
            <i className="fa fa-trash-o"></i>
          </button>
        </td>
      </tr>
    )
  }
}
