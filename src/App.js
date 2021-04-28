import React, { useEffect } from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { configureInterceptors } from './services/axios';
import { setMe } from './actions/user-actions';
import { useDispatch } from 'react-redux';

import './assets/styles/app.scss';

const App = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      history.push('/login');
    }

    (async () => {
      await configureInterceptors(history, token);
      await dispatch(setMe(token))
    })();

  }, []);

  return (
    <div className="main">
      <ToastContainer />
      <Routes />
    </div>
  );
}

export default App;
