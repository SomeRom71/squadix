import React from 'react';
import Loader from '../loader';
import cn from 'classnames';
import s from './button.module.scss';

const Button = ({
  text, 
  icon, 
  isLoading, 
  type = 'button', 
  disabled,
  className,
  styleType, 
  onClick = () => {}
}) => (
  <button 
    className={cn(s.button, className, s[styleType])}
    type={type}
    disabled={disabled}
    onClick={() => onClick()}
  >
    {isLoading ? 
      <Loader /> :
      <> 
        {text && text}
        {icon && icon}
      </>  
    }
  </button>
);

export default Button;
