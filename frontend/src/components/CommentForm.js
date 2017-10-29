import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import uuidv4 from 'uuid/v4';

export default class CommentForm extends Component {

  state = {
    comment: {
      id: uuidv4(),
      parentId: this.props.parentId,
      author: '',
      body: '',
      timestamp: Date.now(),
      deleted: false
    },
    redirect: false
  }

  baseURL = 'http://localhost:3001'

  headers = {
    'Authorization': 'totesauthd',
    'Content-Type': 'application/json'
  };

  get heading() {
    if (this.props.id) return 'Edit Comment';
    return 'New Comment';
  }

  actionData(e) {
    const { id } = this.props;

    const url = `${this.baseURL}/comments`

    let options = {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(this.state.comment)
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
    const { url, options } = this.actionData(e);
    const { onGetComments, parentId } = this.props;
    fetch(url, options)
    .then(() => onGetComments(parentId))
    .then(() => this.setState({ redirect: true }))
  }

  handleChange(e) {
    const { name, value } = e.target;
    e.preventDefault()
    this.setState({
      comment: {
        ...this.state.comment,
        [name]: value
      }
    })
  }

  componentDidMount() {
    const { id } = this.props;

    if (id) {
      fetch(`${this.baseURL}/comments/${id}`, {
        method: 'GET',
        headers: this.headers
      })
      .then((res) => res.json())
      .then((comment) => this.setState({ comment }))
    }
  }

  render() {
    const { comment, redirect } = this.state;

    if (redirect) {
      return <Redirect push to={`/posts/${this.props.parentId}`} />;
    }

    return (
      <div className="column is-half">
        <h1>{this.heading}</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="field">
            <label className="label">Author</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="author"
                value={comment.author}
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
                value={comment.body}
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
