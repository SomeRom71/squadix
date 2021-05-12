import React, { useEffect } from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Modals from './containers/modals';
import { LOGIN_PATH, APPS_PATH } from './constants/routes.constants';
import { API_URL } from './constants/api.constants';
import { detectMob } from './helpers/device-helpers';

import './assets/styles/app.scss';


const App = () => {

  const history = useHistory();
  
  useEffect(() => {
      const isMobile = detectMob();
      if (isMobile) {
        history.push(APPS_PATH);
        return;
      };
      
      const token = localStorage.getItem('accessToken');
      if (!token) {
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
