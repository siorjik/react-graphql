import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MovieList from './containers/MovieList';
import Info from './containers/Info';

export default () => {
  return (
    <Switch>
      <Route exact path="/movie"><MovieList /></Route>
      <Route exact path="/movie/:id"><Info /></Route>
    </Switch>
  );
};
