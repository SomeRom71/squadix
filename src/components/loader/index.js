import React from 'react';
import cn from'classnames';

import s from './loader.module.scss';

const Loader = ({size, preloader}) => (
    <div className={cn({[s.wrap]: preloader})}>
        <div className={cn(s.loader, {[s[size]]: size})}></div>
    </div>
)

export default Loader;
