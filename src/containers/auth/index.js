import React from 'react';
import Logo from '../../components/logo';
import s from './auth.module.scss';

const AuthContainer = ({children}) => {

  return (
    <div className={s.wrap} >
      <div className={s.form}>
        <Logo className={s.logo} />
        {children}
        <span className={s.copyright}>© Squadix, 2021.</span>
      </div>
    </div>
  )
}

export default AuthContainer;
