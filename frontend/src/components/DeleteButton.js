import React from 'react';
import { Link } from 'react-router-dom';

// direction must be either 'up' or 'down'
export default function DeleteButton({ id, resource, parentId }) {
  return (
    <Link to={`/${resource}/${id}/destroy?parentId=${parentId}`} className="button is-outlined is-danger">
      <i className="fa fa-trash-o"></i>
    </Link>
  );
}
