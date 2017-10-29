import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import queryString from 'query-string';
import PostItem from './PostItem';

export default class PostsList extends Component {
  commentCount(post) {
    const { comments } = this.props;
    return comments.filter((comment) => {
      return comment.parentId === post.id && !comment.deleted
    }).length
  }

  posts() {
    const { posts, category } = this.props;
    if (category) {
      return posts.filter((post) => post.category === category);
    }
    return posts;
  }

  render() {
    const { onVote, categories } = this.props;
    const { dir } = this.props.meta;
    return (
      <div className="column">
        <div className="columns">
          <div className="column is-one-quarter">
            <h3>Categories</h3>
            <ul>
            {categories.map((category) => (
              <li><Link to={`/${category.name}`}>{category.name}</Link></li>
            ))}
              <li><Link to="/posts">All posts</Link></li>
            </ul>
          </div>
          <div className="column is-three-quarters">
            <h1>Posts</h1>
            <Link to="/posts/new" className="button is-primary">New Post</Link>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>
                    <Link to={{
                      pathname: '/',
                      search: queryString.stringify({
                        sort: 'timestamp',
                        dir
                      })
                    }}>
                      Created at
                    </Link>
                  </th>
                  <th>Comment count</th>
                  <th>
                    <Link to={{
                      pathname: '/',
                      search: queryString.stringify({
                        sort: 'voteScore',
                        dir
                      })
                    }}>
                      Current score
                    </Link>
                  </th>
                  <th>Category</th>
                  <th colSpan="4">Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.posts().map((post) => {
                  return (
                    <PostItem
                      post={post}
                      key={post.id}
                      commentCount={this.commentCount(post)}
                      onVote={onVote}
                    />
                  )
                }) }
              </tbody>
            </table>

          </div>
        </div>
      </div>
    )
  }
}
