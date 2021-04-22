import qs from 'qs';
import moment from 'moment';

import api from '../services/api';
import { maxResult } from '../keys';

const FETCH_MOVIES = 'FETCH_MOVIES';
const FETCH_MOVIE = 'FETCH_MOVIE';
const FETCH_GENRES = 'FETCH_GENRES';

const fetchMovies = (listType) => async (dispatch) => {
  const ref = (await api.get(`/movie/${listType}`)).data.results;

  const payload = ref.sort((movieA, movieB) => {
    const dateMovieA = moment(movieA.release_date);
    const dateMovieB = moment(movieB.release_date);

    return dateMovieB.diff(dateMovieA);
  }).slice(0, maxResult);

  dispatch({
    type: FETCH_MOVIES,
    payload,
  });
};

const fetchMovie = (movieId) => async (dispatch) => {
  const ref = (await api.get(`/movie/${movieId}`)).data;

  dispatch({
    type: FETCH_MOVIE,
    payload: ref,
  });
};

const fetchMoviesCollection = (moviesCollection) => async (dispatch) => {
  const allRefs = await Promise.all(moviesCollection.map(async ({ id }) => {
    const ref = (await api.get(`/movie/${id}`)).data;
    return ref;
  }));

  dispatch({
    type: FETCH_MOVIES,
    payload: allRefs,
  });
};

const fetchGenres = () => async (dispatch) => {
  const ref = (await api.get('/genre/movie/list')).data.genres;

  dispatch({
    type: FETCH_GENRES,
    payload: ref,
  });
};

const fetchDiscover = (fromYear, toYear, genres, sortBy) => async (dispatch) => {
  const params = {
    'primary_release_date.gte': `${fromYear}-01-01`,
    'primary_release_date.lte': `${toYear}-12-31`,
    sort_by: sortBy,
    ...(genres.length > 0 && { with_genres: genres }),
  };

  const paramsStringify = qs.stringify(params, { arrayFormat: 'comma' });

  const ref = (await api.get(`/discover/movie?${paramsStringify}`)).data.results.slice(0, maxResult);

  dispatch({
    type: FETCH_MOVIES,
    payload: ref,
  });
};

const searchTerms = (terms) => async (dispatch) => {
  const ref = (await api.get(`/search/movie?query=${terms}`)).data.results;

  dispatch({
    type: FETCH_MOVIES,
    payload: ref,
  });
};

export {
  fetchMovies,
  fetchMovie,
  fetchMoviesCollection,
  fetchGenres,
  fetchDiscover,
  searchTerms,
  FETCH_MOVIES,
  FETCH_MOVIE,
  FETCH_GENRES,
};
