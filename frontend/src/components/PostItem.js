import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';

export default class PostItem extends Component {
  render() {
    const { title, author, voteScore, id } = this.props.post;
    const { commentCount, onVote, onDeletePost } = this.props;
    return (
      <tr>
        <td>{title}</td>
        <td>{author}</td>
        <td>{commentCount}</td>
        <td>{voteScore}</td>
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
            <i className="fa fa-pencil"></i>
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
