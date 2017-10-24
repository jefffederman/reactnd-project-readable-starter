import React from 'react';
import VoterButton from './VoterButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

export default function Post({ post, onVote, resource }) {
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
              <VoterButton id={id} direction="up" onVote={onVote} resource={resource} />
            </p>
            <p className="control">
              <VoterButton id={id} direction="down" onVote={onVote} resource={resource} />
            </p>
            <p className="control">
              <EditButton id={id} />
            </p>
            <p className="control">
              <DeleteButton id={id} resource={resource} parentId={parentId} />
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
