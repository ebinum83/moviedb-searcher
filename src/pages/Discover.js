/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useEffect, useContext, useState, useMemo,
} from 'react';
import Select from 'react-select';

import MovieList from '../components/movie/MovieList';
import AppProvider from '../services/context';
import { fetchGenres, fetchDiscover } from '../actions';

const transformGenres = (data) => {
  const transform = Array.isArray(data) ? data.map(({ value }) => value) : [];
  return transform;
};

const { years, yearLength } = (() => {
  const yearsArray = [];
  const currentYear = new Date().getFullYear();

  for (let index = 1920; index <= currentYear; index++) {
    yearsArray.push({ value: index, label: index });
  }

  return {
    years: yearsArray,
    yearLength: yearsArray.length,
  };
})();

const sortByList = [
  { value: 'vote_average.desc', label: 'Ratings (Highest First)' },
  { value: 'vote_average.asc', label: 'Ratings (Lowest First)' },
  { value: 'primary_release_date.desc', label: 'Release Date (Latest First)' },
  { value: 'primary_release_date.asc', label: 'Release Date (Oldest First)' },
  { value: 'original_title.desc', label: 'Title (A to Z)' },
  { value: 'original_title.asc', label: ' Title (Z to A)' },
];

function Discover() {
  const { state: { movies, genres: genresList }, dispatch } = useContext(AppProvider);

  const [{
    fromYear, toYear, genres, sortBy,
  }, setLocalState] = useState({
    fromYear: years[0],
    toYear: years[yearLength - 1],
    genres: [],
    sortBy: sortByList[0],
  });

  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchDiscover(fromYear.value, toYear.value, transformGenres(genres), sortBy.value));
  }, [fromYear, toYear, genres, sortBy, dispatch]);

  const genresGenerator = useMemo(() => {
    const genresArray = genresList.map(({ id, name }) => ({ value: id, label: name }));
    return genresArray;
  }, [genresList]);


  const onSelectChange = (data, e) => {
    setLocalState((prevState) => ({ ...prevState, [e.name]: data }));
  };

  return (
    <>
      <div className="row mb-3">
        <div className="col-12">
          <h3 className="mb-3">Discover Movies</h3>
          <form>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">From Year</label>
              <Select
                className="col-sm-4"
                name="fromYear"
                value={fromYear}
                onChange={onSelectChange}
                options={years}
              />
              <label className="col-sm-2 col-form-label">To Year</label>
              <Select
                className="col-sm-4"
                name="toYear"
                value={toYear}
                onChange={onSelectChange}
                options={years}
              />
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Genres</label>
              <Select
                className="col-sm-10"
                name="genres"
                value={genres}
                onChange={onSelectChange}
                options={genresGenerator}
                isMulti
              />
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Sort By</label>
              <Select
                className="col-sm-10"
                name="sortBy"
                value={sortBy}
                onChange={onSelectChange}
                options={sortByList}
              />
            </div>
          </form>
        </div>
      </div>
      <MovieList movies={movies} />
    </>
  );
}

export default Discover;
