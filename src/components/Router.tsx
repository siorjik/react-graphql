import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Movie from '../pages/Movie';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><Redirect to="/movie" /></Route>
        <Route exec path="/movie"><Movie /></Route>
      </Switch>
    </BrowserRouter>
  );
};
