import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// direction must be either 'up' or 'down'
export default function EditButton({ parentResourceType, resourceType, id, parentId }) {
  let href = "";

  if (parentResourceType && parentId) {
    href = `/${parentResourceType}/${parentId}/${resourceType}/${id}/edit`
  } else {
    href = `/${resourceType}/${id}/edit`
  }

  return (
    <Link to={href} className="button">
      <i className="fa fa-pencil"></i>
    </Link>
  );
}

EditButton.propTypes = {
  resourceType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  parentResourceType: PropTypes.string,
  parentId: PropTypes.string
}
