import React from 'react';

// direction must be either 'up' or 'down'
export default function VoterButton({ id, direction, onVote, resource }) {
  return (
    <button className="button" onClick={() => onVote(id, direction + 'Vote', resource)}>
      <i className={`fa fa-thumbs-o-${direction}`}></i>
    </button>
  );
}
