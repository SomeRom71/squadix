import React from 'react';
import Loader from '../loader';

import s from './button.module.scss';

const Button = ({text, icon, isLoading, type = 'button', disabled, onClick = () => {}}) => (
  <button 
    className={s.button}
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
