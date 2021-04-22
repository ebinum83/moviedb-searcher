import {
  FETCH_MOVIES,
  FETCH_MOVIE,
  FETCH_GENRES,

} from '../actions';

function reducer(state, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return { ...state, movies: action.payload };
    case FETCH_MOVIE:
      return { ...state, movie: action.payload };
    case FETCH_GENRES:
      return { ...state, genres: action.payload };
    default:
      return state;
  }
}

export default reducer;
