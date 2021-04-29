import React from 'react';
import cn from 'classnames';
import UserPreview from '../../../components/user-preview';
import { Link } from 'react-router-dom';
import { FaComment, FaHeart } from "react-icons/fa";
import Youtube from 'react-youtube';

import s from './item.module.scss';

const FeedItem = ({
  info: {
    id,
    description,
    imageUrls,
    authorId,
    authorName,
    authorAvatarUrl,
    createdAt,
    likesCount,
    commentsCount,
    videoUrl,
    liked,
  }, 
  className
}) => {

  return (
    <div className={cn(s.item, className)}>
      <div className={s.header}>
        <Link 
          className={s.link}
          to={`/profile/${authorId}`}
        >
          <UserPreview 
            name={authorName}
            avatar={authorAvatarUrl}
            date={createdAt}
            localClassName="post"
          />
        </Link>

      </div>
      {imageUrls.length 
        ? <img 
            className={s.img} 
            src={imageUrls[0]}
            loading="lazy"
          /> 
        : videoUrl
        ? <Youtube 
            videoId={videoUrl}
            className={s.video}
          />
        : null}
      <p>
        {description.length > 255 ? description.slice(0, 255) + '...' : description}
      </p>
      <div className={s.footer}>
        <div className={s.comments}>
          <FaComment
            className={s.commentIcon} 
          />
          {commentsCount}
        </div>
        <div className={s.likes}>
          <FaHeart 
            className={cn(s.likeIcon, {[s.active]: liked})}
          />
          {likesCount}
        </div>
      </div>
    </div>
  )

}

export default FeedItem;
