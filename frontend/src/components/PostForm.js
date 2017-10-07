import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';

export default class PostForm extends Component {
  // perhaps save bare attrs instead of namespaced under post
  state = {
    post: {
      title: '',
      author: ''
    }
  }

  baseURL = 'http://localhost:3001'

  headers = {
    'Authorization': 'totesauthd',
    'Content-Type': 'application/json'
  };

  get heading() {
    if (this.props.postId) return 'Edit Post';
    return 'New Post';
  }

  actionData(e) {
    const { postId } = this.props;

    const url = `${this.baseURL}/posts`

    let options = {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(e.target.value)
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
    fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.info(json))
  }

  handleChange(e) {
    const { name, value } = e.target;
    e.preventDefault()
    this.setState({
      post: {
        ...this.state.post,
        [name]: value
      }
    })
  }

  componentDidMount() {
    // get the post
    fetch(`${this.baseURL}/posts/${this.props.postId}`, {
      method: 'GET',
      headers: this.headers
    })
    .then((res) => res.json())
    .then((post) => this.setState({ post }))
  }

  render() {
    const { post } = this.state;

    return (
      <div className="column is-half">
        <h1>{this.heading}</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={post.title}
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
                value={post.author}
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
                value={post.body}
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
