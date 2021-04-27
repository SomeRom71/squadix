import React, { useState } from 'react';
import cn from 'classnames';

import s from './input.module.scss';

const Input = ({label, className, error, ...props}) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={s.container}>
      {label && <span className={s.label}>{label}</span>}
      <div className={cn(s.wrap, className, {[s.active]: isFocused})}>
        <input
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)} 
          className={s.input} 
          {...props} 
        />
        {error && <span className={s.error}>{error}</span>}
      </div>
    </div>
  )
}

export default Input;
