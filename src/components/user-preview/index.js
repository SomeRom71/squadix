import React from 'react';

import s from './user-preview.module.scss';

const UserPreview = ({ name, avatar }) => {

  return (
    <div className={s.container}>
      {avatar ? 
        <img src={avatar} className={s.img} alt="avatar" /> : 
        <div className={s.noAvatar}>
          {name?.[0]}  
        </div>
      }
      <span className={s.name}>{name}</span>
    </div>
  )
}

export default UserPreview;
