import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class DestroyResource extends Component {
  componentDidMount() {
    const { resourceId, onDeleteResource, resource } = this.props;
    onDeleteResource(resourceId, resource);
  }

  render() {
    const { resource, parentId } = this.props;
    if (resource === 'posts') {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <Redirect to={`/posts/${parentId}`} />
    )
  }
}
