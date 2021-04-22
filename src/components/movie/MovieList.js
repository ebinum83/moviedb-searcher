import React, { memo, useCallback } from 'react';
import Movie from './Movie';

function MovieList({ movies }) {
  const renderMovies = useCallback(
    () => movies.map(({ id, ...props }) => (
      <Movie key={id} id={id} {...props} />
    )),
    [movies],
  );

  return (
    <div className="row">
      {renderMovies()}
    </div>
  );
}

export default memo(MovieList);
