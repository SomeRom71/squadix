import React, { useState } from 'react';
import cn from 'classnames';

import s from './input.module.scss';

const Input = ({label, wrapperClassname, className, error, onChange, value, ...props}) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn(s.container, wrapperClassname)}>
      {label && <span className={s.label}>{label}</span>}
      <div className={cn(s.wrap, className, {[s.active]: isFocused})}>
        <input
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)} 
          className={s.input}
          onChange={(e) => onChange(e.target.value)} 
          value={value}
          {...props} 
        />
        {error && <span className={s.error}>{error}</span>}
      </div>
    </div>
  )
}

export default Input;
