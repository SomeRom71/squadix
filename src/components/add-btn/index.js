import React from 'react';

import s from './add-btn.module.scss';

const AddButton = ({onClick}) => (
  <button
    onClick={onClick} 
    className={s.btn}
  >
    +
  </button>
);

export default AddButton;
