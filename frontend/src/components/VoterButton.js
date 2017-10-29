import React from 'react';

// direction must be either 'up' or 'down'
export default function VoterButton({ id, direction, onVote, resourceType }) {
  return (
    <button className="button" onClick={() => onVote(id, direction + 'Vote', resourceType)}>
      <i className={`fa fa-thumbs-o-${direction}`}></i>
    </button>
  );
}
