import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Events from './pages/events';
import Stock from './pages/stock';
import News from './pages/news';
import NewsPost from './pages/news-post';
import EventsPost from './pages/events-post';

const Routes = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/events" exact component={Events} />
    <Route path="/stock" component={Stock} />
    <Route path="/news" exact component={News} />
    <Route path="/news/:id" component={NewsPost} />
    <Route path="/events/:id" component={EventsPost} />
    <Route path="/">
      <Redirect to="/news" />
    </Route>
  </Switch>
);

export default Routes;
