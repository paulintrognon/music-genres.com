import React from 'react';
import './styles.css';

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getAllGenres } from '../../services/api';
import HashtagTitle from '../../components/HashtagTitle';

export default class GenresList extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
  }

  componentWillMount() {
    getAllGenres().then(res => {
      this.setState({ list: res.data.result });
    });
  }

  renderList = () => {
    if (this.state.list.length === 0) {
      return null;
    }

    let lastFirstLetter = '';
    const result = [];

    this.state.list.forEach((genre, i) => {
      const firstLetter = genre.name.substr(0, 1);
      if (firstLetter !== lastFirstLetter) {
        result.push(
          <div className="col-12" key={`${i}-${firstLetter}`} id={firstLetter}>
            <HashtagTitle>{firstLetter}</HashtagTitle>
          </div>
        );
      }
      result.push(
        <div className="col-12 col-md-6 col-lg-4" key={i}>
          <Link className="music-genre-link" to={`/${genre.slug}`}>
            {genre.name}
          </Link>
        </div>
      );
      lastFirstLetter = firstLetter;
    });
    return result;
  };

  render() {
    return (
      <div className="genres-list-container">
        <Helmet>
          <title>List of all music Genres</title>
          <meta
            name="description"
            content="Musical examples of all musical genres and styles."
          />
        </Helmet>
        <h1>List of all musical genres and styles</h1>
        <div className="row">{this.renderList()}</div>
      </div>
    );
  }
}
