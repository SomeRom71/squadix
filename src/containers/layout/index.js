import React, { useEffect } from 'react';
import Header from './header';
import { configureInterceptors } from '../../services/axios';
import { useHistory } from 'react-router-dom';
import { setMe } from '../../actions/user-actions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import s from './layout.module.scss';

const Layout = ({children}) => {

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    moment.locale('ru');

    (async () => {
      const token = localStorage.getItem('accessToken');
      await configureInterceptors(history, token);
      await dispatch(setMe(token));
    })()
    console.log('layout');
  }, [])

  return (
    <div className={s.container}>
      <Header />
      {children}
    </div>
  )
}

export default Layout;
