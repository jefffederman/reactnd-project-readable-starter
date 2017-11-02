import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import uuidv4 from 'uuid/v4';
import { baseURL, headers } from '../apiConfig.js'

export default class CommentForm extends Component {

  state = {
    redirect: false
  }

  get heading() {
    if (this.props.id) return 'Edit Comment';
    return 'New Comment';
  }

  actionData() {
    const { id, currentComment } = this.props;

    const url = `${baseURL}/comments`

    let options = {
      headers,
      method: 'POST',
      body: JSON.stringify(currentComment)
    };

    if (id) {
      return {
        url: `${url}/${id}`,
        options: {
          ...options,
          method: 'PUT'
        }
      }
    }

    return { url, options };
  }

  handleSubmit(e) {
    e.preventDefault()
    const { url, options } = this.actionData();
    this.props.onSubmitComment(url, options, this.props.parentId)
    .then(() => this.setState({ redirect: true }))
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { onPatchComment, currentComment } = this.props;
    e.preventDefault()
    onPatchComment(currentComment, name, value)
  }

  componentDidMount() {
    const { id, onGetComment } = this.props;

    if (id) {
      onGetComment(id)
    }
  }

  render() {
    const { redirect } = this.state;
    const { currentComment } = this.props;

    const parentHref = `/posts/${this.props.parentId}`;

    if (redirect) {
      return <Redirect push to={parentHref} />;
    }

    return (
      <div className="column is-half">
        <Link to={parentHref} className="is-pulled-right">Cancel</Link>
        <h1>{this.heading}</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="field">
            <label className="label">Author</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="author"
                value={currentComment.author}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Body</label>
            <div className="control">
              <textarea
                className="textarea"
                name="body"
                value={currentComment.body}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
          </div>

          <div className="control">
            <button className="is-primary button">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

CommentForm.propTypes = {
  id: PropTypes.string,
  parentId: PropTypes.string.isRequired,
  onSubmitComment: PropTypes.func.isRequired,
  currentComment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string,
    timestamp: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired
  }).isRequired,
  onPatchComment: PropTypes.func.isRequired
}
