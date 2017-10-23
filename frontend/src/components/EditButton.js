import React from 'react';
import { Link } from 'react-router-dom';

// direction must be either 'up' or 'down'
export default function EditButton({ id }) {
  return (
    <Link to={`/posts/${id}/edit`} className="button">
      <i className="fa fa-pencil"></i>
    </Link>
  );
}
