import React from 'react';

import s from './auth.module.scss';

const AuthContainer = ({children}) => {

  return (
    <div className={s.wrap} >
      <div className={s.form}>
        {children}
      </div>
    </div>
  )
}

export default AuthContainer;
