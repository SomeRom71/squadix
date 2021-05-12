import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Events from './pages/events';
import Stock from './pages/stock';
import News from './pages/news';
import NewsPost from './pages/news-post';
import EventsPost from './pages/events-post';
import StockPost from './pages/stock-post';
import Profile from './pages/profile';
import Me from './pages/me';
import Policy from './pages/static/policy';
import Rules from './pages/static/rules';
import Terms from './pages/static/terms';
import Apps from './pages/static/apps';

import {
  HOME_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  EVENTS_PATH,
  STOCK_PATH,
  NEWS_PATH,
  NEWS_POST_PATH,
  EVENTS_POST_PATH,
  STOCK_POST_PATH,
  PROFILE_PATH,
  ME_PATH,
  POLICY_PATH,
  RULES_PATH,
  TERMS_PATH,
  APPS_PATH
} from './constants/routes.constants';

const Routes = () => (
  <Switch>
    <Route path={LOGIN_PATH} component={Login} />
    <Route path={REGISTER_PATH} component={Register} />
    <Route path={EVENTS_PATH} exact component={Events} />
    <Route path={STOCK_PATH} exact component={Stock} />
    <Route path={NEWS_PATH} exact component={News} />
    <Route path={NEWS_POST_PATH} component={NewsPost} />
    <Route path={EVENTS_POST_PATH} component={EventsPost} />
    <Route path={STOCK_POST_PATH} component={StockPost} />
    <Route path={PROFILE_PATH} component={Profile} />
    <Route path={ME_PATH} component={Me} />
    <Route path={POLICY_PATH} component={Policy} />
    <Route path={RULES_PATH} component={Rules} />
    <Route path={TERMS_PATH} component={Terms} />
    <Route path={APPS_PATH} component={Apps} />
    <Route path={HOME_PATH}>
      <Redirect to={NEWS_PATH} />
    </Route>
  </Switch>
);

export default Routes;
