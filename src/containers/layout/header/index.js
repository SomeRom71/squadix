import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../../components/logo';
import UserPreview from '../../../components/user-preview';
import { useSelector } from 'react-redux';
import { NEWS_PATH, EVENTS_PATH, STOCK_PATH, HOME_PATH } from '../../../constants/routes.constants';

import s from './header.module.scss';

const Header = () => {

  const { displayName, profilePictureUrl } = useSelector(state => state.user); 

  return (
    <header className={s.header}>
      <Link to={HOME_PATH}>
        <Logo className={s.logo} />
      </Link>
      <NavLink to={NEWS_PATH} className={s.link} activeClassName="active-nav">
        Новости
      </NavLink>
      <NavLink to={EVENTS_PATH} className={s.link} activeClassName="active-nav">
        События
      </NavLink>
      <NavLink to={STOCK_PATH} className={s.link} activeClassName="active-nav">
        Барахолка
      </NavLink>
      <UserPreview 
        name={displayName}
        avatar={profilePictureUrl}
      />
    </header>
  )
}

export default Header;
