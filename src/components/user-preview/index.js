import React from 'react';
import cn from 'classnames';
import moment from 'moment';

import s from './user-preview.module.scss';

const UserPreview = ({ name, avatar, date, localClassName }) => {

  return (
    <div className={cn(s.container, {[s[localClassName]]: localClassName })}>
      {avatar ? 
        <img src={avatar} className={s.img} alt="avatar" /> : 
        <div className={s.noAvatar}>
          {name?.[0]}  
        </div>
      }
      <div>
        <span className={s.name}>{name}</span>
        {date && <span className={s.date}>{moment(date).format('DD MMMM YYYY, HH:mm')}</span>}
      </div>
    </div>
  )
}

export default UserPreview;
