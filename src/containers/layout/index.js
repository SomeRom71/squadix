import React from 'react';
import Header from './header';

import s from './layout.module.scss';

const Layout = ({children}) => (
  <div className={s.container}>
    <Header />
    {children}
  </div>
)

export default Layout;
