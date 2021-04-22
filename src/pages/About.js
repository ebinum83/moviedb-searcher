import React from 'react';

function About() {
  return (
    <div className="jumbotron">
      <h1 className="display-4">MovieDB Searcher</h1>
      <p className="lead">This is a simple web-app that help you manage your favorite films</p>
      <hr className="my-4" />
      <img className="logo" src={`${process.env.PUBLIC_URL}/assets/image/movieDB-logo.png`} alt="Movie DB Logo" />
      <span>This product uses the TMDb API but is not endorsed or certified by TMDb.</span>
    </div>
  );
}

export default About;
