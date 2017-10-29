import React from 'react';
import PropTypes from 'prop-types';

// direction must be either 'up' or 'down'
export default function VoterButton({ id, direction, onVote, resourceType }) {
  return (
    <button className="button" onClick={() => onVote(id, direction + 'Vote', resourceType)}>
      <i className={`fa fa-thumbs-o-${direction}`}></i>
    </button>
  );
}

VoterButton.propTypes = {
  id: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  onVote: PropTypes.func.isRequired,
  resourceType: PropTypes.string.isRequired
}
