import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/news';

const Routes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
    <Route exact path="/">
      <Home />
    </Route>
  </Switch>
);

export default Routes;
