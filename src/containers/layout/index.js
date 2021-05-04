import React, { useEffect } from 'react';
import Header from './header';
import cn from 'classnames';
import { configureInterceptors } from '../../services/axios';
import { useHistory } from 'react-router-dom';
import { setMe } from '../../actions/user-actions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import s from './layout.module.scss';
import AddButton from '../../components/add-btn';

const Layout = ({children, className}) => {

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    moment.locale('ru');

    (async () => {
      const token = localStorage.getItem('accessToken');
      await configureInterceptors(history, token);
      await dispatch(setMe(token));
    })()
  }, [])

  return (
    <div className={cn(s.container, className)}>
      <Header />
      {children}
    </div>
  )
}

export default Layout;
