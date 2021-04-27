import React from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';

import './assets/styles/app.scss';

const App = () => {
  return (
    <div className="main">
      <ToastContainer />
      <Routes />
    </div>
  );
}

export default App;
