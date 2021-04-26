import React from 'react';
import cn from 'classnames';

import s from './input.module.scss';

const Input = ({label, className, ...props}) => {

  return (
    <div>
      {label && <span className={s.label}>{label}</span>}
      <div className={cn(s.wrap, className)}>
        <input className={s.input} {...props} />
      </div>
    </div>
  )
}

export default Input;
