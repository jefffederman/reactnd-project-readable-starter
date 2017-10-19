import React from 'react';

// direction must be either 'up' or 'down'
export default function Voter({ onVote, id, direction }) {
  return (
    <button className="button" onClick={() => onVote(id, direction + 'Vote')}>
      <i className={`fa fa-thumbs-o-${direction}`}></i>
    </button>
  );
}
