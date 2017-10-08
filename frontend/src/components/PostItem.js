import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import { vote, deletePost } from '../actions'

class PostItem extends Component {
  render() {
    const { title, author, voteScore, id } = this.props.post;
    const { commentCount, onVote, onDeletePost } = this.props;
    return (
      <tr>
        <td>{title}</td>
        <td>{author}</td>
        <td>{commentCount}</td>
        <td>{voteScore}</td>
        <td className="field is-grouped">
          <p className="control">
            <button className="button" onClick={() => onVote(id, 'upVote')}>
              <i className="fa fa-thumbs-o-up"></i>
            </button>
          </p>
          <p className="control">
            <button className="button" onClick={() => onVote(id, 'downVote')}>
              <i className="fa fa-thumbs-o-down"></i>
            </button>
          </p>
          <p className="control">
            <button className="button">
              <Link to={`/posts/${id}/edit`}>
                <i className="fa fa-pencil"></i>
              </Link>
            </button>
          </p>
          <p className="control">
            <button className="button is-outlined is-danger" onClick={() => onDeletePost(id)}>
              <i className="fa fa-trash-o"></i>
            </button>
          </p>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = ({ posts, comments, categories }) => {
  return {
    posts,
    comments,
    categories
  }
}

const mapDispatchToProps = (dispatch) => ({
  onVote: (id, option) => dispatch(vote(id, option)),
  onDeletePost: (id) => dispatch(deletePost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)
