import React, { useEffect } from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import './assets/styles/app.scss';
import Modals from './containers/modals';

const App = () => {

  const history = useHistory();

  useEffect(() => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        history.push('/login');
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
