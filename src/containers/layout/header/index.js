import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../../components/logo';
import { useSelector } from 'react-redux';
import { NEWS_PATH, EVENTS_PATH, STOCK_PATH, HOME_PATH, SEARCH_PATH } from '../../../constants/routes.constants';

import s from './header.module.scss';
import HeaderMenu from '../../../components/header-menu';

const Header = () => {

  const { displayName, profilePictureUrl } = useSelector(state => state.user.me); 

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
      <NavLink to={SEARCH_PATH} className={s.link} activeClassName="active-nav">
        Поиск
      </NavLink>
      <HeaderMenu 
        className={s.me}
        displayName={displayName}
        profilePictureUrl={profilePictureUrl}        
      />
    </header>
  )
}

export default Header;
