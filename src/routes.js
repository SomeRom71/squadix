import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Events from './pages/events';
import Stock from './pages/stock';
import News from './pages/news';

const Routes = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/events" component={Events} />
    <Route path="/stock" component={Stock} />
    <Route path="/news" component={News} />
    <Route path="/">
      <Redirect to="/news" />
    </Route>
  </Switch>
);

export default Routes;
