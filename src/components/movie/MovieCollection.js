import React, { useContext, useEffect, useMemo } from 'react';

import { getCollection } from '../../services/storage';
import AppProvider from '../../services/context';
import { fetchMoviesCollection } from '../../actions';
import MovieList from './MovieList';
import Search from '../Search';

function MovieCollection({ collectionType }) {
  const { state: { movies }, dispatch } = useContext(AppProvider);

  const movieCollection = useMemo(() => getCollection('movies').filter(({ like, rating }) => {
    if (collectionType === 'rating') {
      return rating && rating !== '0';
    }

    if (collectionType === 'like') {
      return like && like;
    }

    return false;
  }), [collectionType]);

  useEffect(() => {
    if (movieCollection.length > 0) {
      dispatch(fetchMoviesCollection(movieCollection));
    }
  }, [dispatch, movieCollection]);

  const renderContent = () => {
    if (movieCollection.length > 0) {
      return (
        <>
          <div className="jumbotron">
            <h3 className="cover-heading text-center">
              Your
              {' '}
              {collectionType === 'rating' ? 'Rated' : 'Favorite'}
              {' '}
              Movies
            </h3>
          </div>
          <MovieList movies={movies} />
        </>
      );
    }
    return (
      <div className="jumbotron">
        <h3 className="cover-heading text-center">
          Sorry you have no
          {' '}
          {collectionType === 'rating' ? 'rated' : 'favorite'}
          {' '}
          movies. Search for a movie to add to your favorites.
        </h3>
        <Search fullWidth />
      </div>
    );
  };

  return (
    <>
      {renderContent()}
    </>
  );
}

export default MovieCollection;
