import React, { useEffect } from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import { matchPath } from 'react-router'; 
import Modals from './containers/modals';
import { LOGIN_PATH, APPS_PATH, UNAUTHORIZED_PAGES_PATH, RESTORE_TOKEN_PATH } from './constants/routes.constants';
import { detectMob } from './helpers/device-helpers';

import './assets/styles/app.scss';


const App = () => {

  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
      const isMobile = detectMob();
      if (isMobile) {
        history.push(APPS_PATH);
        return;
      };
      const token = localStorage.getItem('accessToken');
      if (!token 
          && !UNAUTHORIZED_PAGES_PATH.includes(pathname)
          && matchPath(pathname, {path: RESTORE_TOKEN_PATH, exact: true, strict: false}) === null 
      ) {
        history.push(LOGIN_PATH);
      }
  }, []);

  return (
    <div className="main">
      <ToastContainer />
      <Routes />
      <Modals />
    </div>
  );
}

export default App;
