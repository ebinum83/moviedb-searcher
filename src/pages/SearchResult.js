import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AppProvider from '../services/context';
import { searchTerms } from '../actions';
import MovieList from '../components/movie/MovieList';

function SearchResult() {
  const { state: { movies }, dispatch } = useContext(AppProvider);
  const { terms } = useParams();

  useEffect(() => {
    dispatch(searchTerms(terms));
  }, [dispatch, terms]);

  return (
    <>
      <div className="row mb-3">
        <div className="col-12">
          <h1 className="display-5 text-center">
            Search &gt;
            {' '}
            {terms}
          </h1>
        </div>
      </div>
      <MovieList movies={movies} />
    </>
  );
}

export default SearchResult;
