import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

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

DestroyResource.propTypes = {
  resourceId: PropTypes.string.isRequired,
  resourceType: PropTypes.string.isRequired,
  onDeleteResource: PropTypes.func.isRequired,
  parentId: PropTypes.string,
}
