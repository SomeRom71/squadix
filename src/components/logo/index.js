import React from 'react';
import logo from '../../assets/img/logo.png';
import cn from 'classnames';

import s from './logo.module.scss';

const Logo = ({className}) => (
    <div className={cn(s.container, className)}>
        <img 
            src={logo} 
            alt="logo"
            className={s.logo} 
        />
        <span className={s.name}>squadix</span>
    </div>
)

export default Logo;