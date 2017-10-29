import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class DestroyResource extends Component {
  componentDidMount() {
    const { resourceId, onDeleteResource, resourceType } = this.props;
    onDeleteResource(resourceId, resourceType);
  }

  render() {
    const { resourceType, parentId } = this.props;

    let href = "/posts";

    if (resourceType === 'comments') {
      href += `/${parentId}`
    }

    return (
      <Redirect to={href} />
    )
  }
}
