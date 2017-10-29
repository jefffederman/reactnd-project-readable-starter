import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import queryString from 'query-string';
import PostItem from './PostItem';
import { titleFromCamel } from '../utils';

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

  dir(attribute) {
    const { sort, dir } = queryString.parse(this.props.search);
    if (sort === attribute) {
      const newDir = dir === 'asc' ? 'desc' : 'asc';
      return newDir;
    }
    return 'desc';
  }

  componentWillReceiveProps(nextProps) {
    const { search, onGetPosts } = nextProps;
    const oldSearch = this.props.search;
    if (search !== oldSearch) {
      const { sort, dir } = queryString.parse(search);
      onGetPosts(sort, dir);
    }
  }

  heading() {
    const { category } = this.props;
    if (category) {
      return `${titleFromCamel(category)} Posts`;
    }
    return 'Posts';
  }

  render() {
    const { onVote, categories } = this.props;
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
            <h1>{this.heading()}</h1>
            <Link to="/posts/new" className="button is-primary">New Post</Link>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>
                    <Link
                      to={{
                        search: queryString.stringify({
                          sort: 'timestamp',
                          dir: this.dir('timestamp')
                        })
                      }}
                      replace
                    >
                      Created at
                    </Link>
                  </th>
                  <th>Comment count</th>
                  <th>
                    <Link
                      to={{
                        search: queryString.stringify({
                          sort: 'voteScore',
                          dir: this.dir('voteScore')
                        })
                      }}
                      replace
                    >
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

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.string,
      voteScore: PropTypes.number.isRequired,
      body: PropTypes.string,
      id: PropTypes.string.isRequired,
      parentId: PropTypes.string
    })
  ),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      parentId: PropTypes.string,
      author: PropTypes.string,
      body: PropTypes.string,
      timestamp: PropTypes.string.isRequired,
      deleted: PropTypes.bool.isRequired
    })
  ),
  search: PropTypes.string,
  meta: PropTypes.shape({
    sort: PropTypes.string.isRequired,
    dir: PropTypes.string.isRequired
  }),
  onVote: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ),
  category: PropTypes.string,
  onGetPosts: PropTypes.func.isRequired
}
