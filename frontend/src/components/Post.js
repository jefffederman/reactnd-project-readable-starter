import React from 'react';
import PropTypes from 'prop-types';
import VoterButton from './VoterButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

export default function Post({ post, onVote, resourceType, parentResourceType }) {
  const { title, author, voteScore, body, id, parentId } = post;

  return (
    <article className="media">
      <div className="media-content">
        <div className="content">
          <h2>{title}</h2>
          <p>
            <strong>{ author }</strong> <small>({ voteScore })</small>
            <br />
            { body }
          </p>
          <div className="field is-grouped">
            <p className="control">
              <VoterButton
                id={id}
                direction="up"
                onVote={onVote}
                resourceType={resourceType}
              />
            </p>
            <p className="control">
              <VoterButton
                id={id}
                direction="down"
                onVote={onVote}
                resourceType={resourceType}
              />
            </p>
            <p className="control">
              <EditButton
                id={id}
                resourceType={resourceType}
                parentId={parentId}
                parentResourceType={parentResourceType}
              />
            </p>
            <p className="control">
              <DeleteButton
                id={id}
                resourceType={resourceType}
                parentId={parentId}
              />
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    voteScore: PropTypes.number.isRequired,
    body: PropTypes.string,
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string
  }),
  onVote: PropTypes.func.isRequired,
  resourceType: PropTypes.string.isRequired,
  parentResourceType: PropTypes.string
}
