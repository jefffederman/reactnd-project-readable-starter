// TODO: make functional component
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import VoterButton from './VoterButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

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
    const { commentCount, onVote } = this.props;
    return (
      <tr>
        <td><Link to={`/posts/${id}`}>{title}</Link></td>
        <td>{author}</td>
        <td>{this.formatTimestamp(timestamp)}</td>
        <td>{commentCount}</td>
        <td>{voteScore}</td>
        <td>{category}</td>
        <td>
          <VoterButton id={id} direction="up" onVote={onVote} />
        </td>
        <td>
          <VoterButton id={id} direction="down" onVote={onVote} />
        </td>
        <td>
          <EditButton id={id} />
        </td>
        <td>
          <DeleteButton id={id} />
        </td>
      </tr>
    )
  }
}
