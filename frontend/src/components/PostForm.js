import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import { baseURL, headers } from '../apiConfig.js'

export default class PostForm extends Component {

  state = {
    redirect: false
  }

  get heading() {
    if (this.props.postId) return 'Edit Post';
    return 'New Post';
  }

  actionData(e) {
    const { postId, currentPost } = this.props;

    const url = `${baseURL}/posts`

    let options = {
      headers,
      method: 'POST',
      body: JSON.stringify(currentPost)
    };

    if (postId) {
      return {
        url: `${url}/${postId}`,
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
    this.props.onSubmitPost(url, options)
    .then(() => this.setState({ redirect: true }))
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { onPatchPost, currentPost } = this.props;
    e.preventDefault()
    onPatchPost(currentPost, name, value);
  }

  componentDidMount() {
    const { postId, onGetPost } = this.props;

    if (postId) {
      onGetPost(postId)
    }
  }

  render() {
    const { redirect } = this.state;

    const { currentPost, categories } = this.props;

    const { title, author, category, body } = currentPost;

    if (redirect) {
      return <Redirect push to="/" />;
    }

    return (
      <div className="column is-half">
        <Link to="/posts" className="is-pulled-right">Cancel</Link>
        <h1>{this.heading}</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={title}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Author</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="author"
                value={author}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Category</label>
            <div className="select">
              <select
                name="category"
                value={category}
                onChange={(e) => this.handleChange(e)}
              >
                {categories.map((category) => (
                  <option value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label className="label">Body</label>
            <div className="control">
              <textarea
                className="textarea"
                name="body"
                value={body}
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

PostForm.propTypes = {
  postId: PropTypes.string.isRequired,
  onGetPosts: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  }))
}
