import React, { Component } from 'react';
import Voter from './Voter';
import DeleteButton from './DeleteButton';

export default class Post extends Component {
  componentDidMount() {
    const { id, onGetPost } = this.props;
    onGetPost(id)
    // const baseURL = 'http://localhost:3001';
    // const headers = {
    //   'Authorization': 'totesauthd',
    //   'Content-Type': 'application/json'
    // };
    // fetch(`${baseURL}/posts/${id}`, {
    //   method: 'GET',
    //   headers
    // })
    // .then((res) => res.json())
    // .then((post) => {
    //   this.setState({ post });
    //   fetch(`${baseURL}/posts/${post.id}/comments`, {
    //     method: 'GET',
    //     headers
    //   })
    //   .then((res) => res.json())
    //   .then((comments) => this.setState({ comments }))
    // })
  }

  render() {
    const { currentPost } = this.props;
    if (currentPost) {
      const { title, author, body, voteScore } = currentPost;
      const { onVote, id } = this.props;
      const comments = [];
      return (
        <div className="column">
          <h2>{title}</h2>
          <h3>{author}</h3>
          <dl>
            <dt>Body</dt>
            <dd>{body}</dd>
            <dt>Comment count</dt>
            <dd>{comments.length}</dd>
            <dt>Vote score</dt>
            <dd>{ voteScore }</dd>
          </dl>
          <div>
            <Voter onVote={onVote} id={id} direction="up" />
            <Voter onVote={onVote} id={id} direction="down" />
          </div>
          <div>
            <DeleteButton id={id} />
          </div>
        </div>
      );
    }
    return null;
  }
}
