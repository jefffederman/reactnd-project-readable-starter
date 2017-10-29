import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import VoterButton from './VoterButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

export default function PostItem({ post, commentCount, onVote }) {
  function formatTimestamp(timestamp) {
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };

    return new Date(timestamp).toLocaleString('en-US', options);
  }

  const { title, author, voteScore, id, timestamp, category } = post;
  return (
    <tr>
      <td><Link to={`/posts/${id}`}>{title}</Link></td>
      <td>{author}</td>
      <td>{formatTimestamp(timestamp)}</td>
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
        <EditButton id={id} resourceType="posts" />
      </td>
      <td>
        <DeleteButton id={id} resourceType="posts" />
      </td>
    </tr>
  )
}

PostItem.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    voteScore: PropTypes.number.isRequired,
    body: PropTypes.string,
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string,
    deleted: PropTypes.bool.isRequired
  }).isRequired,
  commentCount: PropTypes.number.isRequired,
  onVote: PropTypes.func.isRequired
}
