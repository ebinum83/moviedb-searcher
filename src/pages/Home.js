import React, {
  useEffect, useContext, useState,
} from 'react';
import Select from 'react-select';

import AppProvider from '../services/context';
import { fetchMovies } from '../actions';
import MovieList from '../components/movie/MovieList';

const selectItems = [{
  value: 'popular',
  label: 'Popular',
}, {
  value: 'top_rated',
  label: 'Top Rated',
}, {
  value: 'upcoming',
  label: 'Upcoming',
}, {
  value: 'now_playing',
  label: 'Now Playing',
}];

function Home() {
  const { state: { movies }, dispatch } = useContext(AppProvider);
  const [{ moviesFilter }, setLocalState] = useState({
    moviesFilter: selectItems[0],
  });

  useEffect(() => {
    dispatch(fetchMovies('popular'));
  }, [dispatch]);

  const onSelectChange = (data, e) => {
    setLocalState((prevState) => ({ ...prevState, [e.name]: data }));
    dispatch(fetchMovies(data.value));
  };

  return (
    <>
      <div className="row mb-3">
        <div className="col-12">
          <Select
            name="moviesFilter"
            value={moviesFilter}
            onChange={onSelectChange}
            options={selectItems}
          />
        </div>
      </div>
      <MovieList movies={movies} />
    </>
  );
}

export default Home;
