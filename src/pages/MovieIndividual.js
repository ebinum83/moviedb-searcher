import React, {
  useEffect, useContext, useState, useMemo,
} from 'react';
import { useParams } from 'react-router-dom';

import { fetchMovie } from '../actions';
import AppProvider from '../services/context';
import { getItem, setItem } from '../services/storage';

function MovieIndividual() {
  const {
    state: {
      movie: {
        id = 0,
        poster_path = 'https://via.placeholder.com/800.png/343a40/fff',
        title = '',
        release_date = '',
        overview = '',
        vote_average = 0,
      },
    }, dispatch,
  } = useContext(AppProvider);

  const movieItem = useMemo(() => getItem('movies', id), [id]);

  const initialLocalState = {
    rating: movieItem ? movieItem.rating : '0',
    like: movieItem ? movieItem.like : false,
  };

  const [{ rating, like }, setLocalState] = useState(initialLocalState);

  useEffect(() => {
    setLocalState(initialLocalState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const { movieId } = useParams();

  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  const onSelectChange = (e) => {
    const { name, value } = e.target;
    setLocalState((prevState) => ({ ...prevState, [name]: value }));

    setItem('movies', id, { rating: value });
  };

  const onLike = () => {
    setLocalState((prevState) => ({ ...prevState, like: !like }));
    setItem('movies', id, { like: !like });
  };

  return (
    <div className="col-md-12">
      <div className="card mb-4 shadow-sm">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          className="card-img-top"
          alt={title}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{release_date}</h6>
          <p className="card-text">{overview}</p>
        </div>
        <div className="card-footer text-muted text-center">
          <span>
            Rate
            {' '}
            {vote_average}
          </span>
          <form className="form-inline justify-content-center">
            <label className="my-1 mr-2" htmlFor="rating">
              My Ratings
              <select className="custom-select ml-2 my-1 mr-sm-2" name="rating" id="rating" value={rating} onChange={onSelectChange}>
                <option value="0">Not rated</option>
                <option value="1">★</option>
                <option value="2">★★</option>
                <option value="3">★★★</option>
                <option value="4">★★★★</option>
                <option value="5">★★★★★</option>
              </select>
            </label>
            <button type="button" className="btn btn-primary ml-2" name="like" onClick={onLike}>
              {like ? 'Unlike' : 'Like'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MovieIndividual;
