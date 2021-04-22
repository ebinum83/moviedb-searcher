import React from 'react';
import { Link } from 'react-router-dom';

function Movie({
  id, title, overview, poster_path, release_date, vote_average,
}) {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card mb-4 shadow-sm">
        <img
          src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 'https://via.placeholder.com/500.png/343a40/fff'}
          className="card-img-top poster"
          alt={title}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{release_date}</h6>
          <p className="card-text">
            {overview.substring(0, 100)}
              ...
          </p>
          <Link className="btn btn-primary" to={`/movie/${id}`}>More Info</Link>
        </div>
        <div className="card-footer text-muted">
          <span>
            Rate
            {' '}
            {vote_average}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Movie;
