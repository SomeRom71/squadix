import React from 'react';
import cn from 'classnames';
import s from './checkbox.module.scss';

const Checkbox = ({onChange, checked, label, id, className}) => {

  return (
    <label className={cn(s.container, className)} htmlFor={id}>
      <input 
        id={id}
        type="checkbox" 
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <span className={s.checkmark}></span>
      {label && <span className={s.label} htmlFor={id}>{label}</span>}
    </label>
  )
}

export default Checkbox;
