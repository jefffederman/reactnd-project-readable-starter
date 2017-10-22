import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class DestroyPost extends Component {
  componentDidMount() {
    const { postId, onDeletePost } = this.props;
    onDeletePost(postId);
  }

  render() {
    return (
      <Redirect to="/" />
    )
  }
}
