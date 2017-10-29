import React from 'react';
import { Link } from 'react-router-dom';

// direction must be either 'up' or 'down'
export default function DeleteButton({ id, resourceType, parentId }) {
  let href = `/${resourceType}/${id}/destroy`

  if (parentId) {
    href += `?parentId=${parentId}`
  }

  return (
    <Link to={href} className="button is-outlined is-danger">
      <i className="fa fa-trash-o"></i>
    </Link>
  );
}
