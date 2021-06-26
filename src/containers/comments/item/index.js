import React, { useState } from 'react';
import UserPreview from '../../../components/user-preview';
import { FaHeart } from 'react-icons/fa';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';
import FSLightbox from 'fslightbox-react';
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
    imageUrls
  },
  className,
  onLike
}) => {

  const history = useHistory();
  const [slideState, setSlideState] = useState({
    toggler: false,
    slide: 0,
  });

  return (
    <div className={cn(s.container, className)}>
      <div className={s.header}>
        <UserPreview 
          name={userName}
          avatar={userAvatarUrl}
          date={createdAt}
          localClassName="post"
          onClick={() => history.push(`/profile/${userId}`)}
        />
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
      <div className={s.media}>
        {imageUrls?.map((item, index) => (
          <img 
            className={s.img} 
            src={item}
            onClick={() => setSlideState({toggler: !slideState.toggler, slide: index+1})}
            alt="slider"
          />     
        ))}
          <FSLightbox
            toggler={slideState.toggler}
            sources={imageUrls}
            type="image"
            slide={slideState.slide}
          />
      </div>
      <p>
        {text}
      </p>
    </div>
  )
}

export default CommentsItem;
