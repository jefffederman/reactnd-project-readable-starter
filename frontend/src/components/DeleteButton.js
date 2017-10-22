import React from 'react';
import { Link } from 'react-router-dom';

// direction must be either 'up' or 'down'
export default function DeleteButton({ id }) {
  return (
    <Link to={`/posts/${id}/destroy`} className="button is-outlined is-danger">
      <i className="fa fa-trash-o"></i>
    </Link>
  );
}
