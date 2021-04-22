import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Rate from './pages/Rate';
import About from './pages/About';
import Discover from './pages/Discover';
import MovieIndividual from './pages/MovieIndividual';
import SearchResult from './pages/SearchResult';

function RouteApp() {
  return (
    <Switch>
      <Route path="/favorite" component={Favorite} />
      <Route path="/rate" component={Rate} />
      <Route path="/about" component={About} />
      <Route path="/discover" component={Discover} />
      <Route path="/movie/:movieId" component={MovieIndividual} />
      <Route path="/search/:terms" component={SearchResult} />
      <Route component={Home} />
    </Switch>
  );
}

export default RouteApp;
