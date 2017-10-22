// TODO: make functional component
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import Voter from './Voter';
import DeleteButton from './DeleteButton';

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
        <td><Link to={`/posts/${id}`}>{title}</Link></td>
        <td>{author}</td>
        <td>{this.formatTimestamp(timestamp)}</td>
        <td>{commentCount}</td>
        <td>{voteScore}</td>
        <td>{category}</td>
        <td>
          <Voter onVote={onVote} id={id} direction="up" />
        </td>
        <td>
          <Voter onVote={onVote} id={id} direction="down" />
        </td>
        <td>
          <button className="button">
            <Link to={`/posts/${id}/edit`}>
              <i className="fa fa-pencil"></i>
            </Link>
          </button>
        </td>
        <td>
          <DeleteButton onDelete={onDeletePost} id={id} />
        </td>
      </tr>
    )
  }
}
