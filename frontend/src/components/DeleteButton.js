import React from 'react';

// direction must be either 'up' or 'down'
export default function DeleteButton({ id, onDelete }) {
  return (
    <button className="button is-outlined is-danger" onClick={() => onDelete(id)}>
      <i className="fa fa-trash-o"></i>
    </button>
  );
}
