import React from 'react';
import UserPreview from '../../../components/user-preview';
import { FaHeart } from 'react-icons/fa';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import s from './item.module.scss';

const CommentsItem = ({
  info: {
    id,
    text,
    userId,
    userName,
    userAvatarUrl,
    createdAt,
    likesCount,
    liked,
  },
  className,
  onLike
}) => {

  return (
    <div className={cn(s.container, className)}>
      <div className={s.header}>
        <Link 
          to={`/profile/${userId}`}
        >
          <UserPreview 
            name={userName}
            avatar={userAvatarUrl}
            date={createdAt}
            localClassName="post"
          />
        </Link>
        <div className={s.likes}>
          <button
            onClick={() => onLike(id)}
          >
            <FaHeart 
              className={cn(s.likeIcon, {[s.active]: liked})}
            />
          </button>
          {likesCount}
        </div>
      </div>
      <p>
        {text}
      </p>
    </div>
  )
}

export default CommentsItem;
