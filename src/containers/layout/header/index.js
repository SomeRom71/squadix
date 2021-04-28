import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../../components/logo';
import UserPreview from '../../../components/user-preview';
import { useSelector } from 'react-redux';

import s from './header.module.scss';

const Header = () => {

  const { displayName, profilePictureUrl } = useSelector(state => state.user); 

  return (
    <header className={s.header}>
      <Link to='/'>
        <Logo className={s.logo} />
      </Link>
      <NavLink to="/news" className={s.link} activeClassName="active-nav">
        Новости
      </NavLink>
      <NavLink to="/events" className={s.link} activeClassName="active-nav">
        События
      </NavLink>
      <NavLink to="/stock" className={s.link} activeClassName="active-nav">
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
