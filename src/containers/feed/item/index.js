import React, { useState } from 'react';
import cn from 'classnames';
import UserPreview from '../../../components/user-preview';
import { Link, useLocation } from 'react-router-dom';
import { FaComment, FaHeart } from "react-icons/fa";
import Youtube from 'react-youtube';
import { FaRegCopy, FaExternalLinkAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import FSLightbox from 'fslightbox-react';

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
  onLike, 
  isPost,
  className
}) => {

  const { pathname } = useLocation(); 
  const backURL = pathname.split('/');
  const [isSliderShow, setIsSliderShow] = useState(false);

  const copyLink = () => {
    const linkToCopy = isPost ? pathname : `${pathname}/${id}`;
    navigator.clipboard.writeText(linkToCopy);
    toast.success('Ссылка скопирована.');
  }

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
        <button
          className={s.headerBtn}
          title="Скопировать URL"
          onClick={() => copyLink()}
        >
          <FaRegCopy />
        </button>
        {<Link
          className={s.headerBtn}
          to={isPost ? `/${backURL[1]}` : `${pathname}/${id}`}
          title={`Перейти к ${isPost ? 'ленте' : 'посту'}`} 
        >
          <FaExternalLinkAlt />
        </Link>}
      </div>
      <div className={s.media}>
        {imageUrls?.length 
          ? <>
              <img 
                className={s.img} 
                src={imageUrls[0]}
                onClick={() => setIsSliderShow(!isSliderShow)}
                alt="preview"
              /> 
              <FSLightbox
                toggler={isSliderShow}
                sources={imageUrls}
                type="image"
              />
            </>
          : videoUrl
          ? <Youtube 
              videoId={videoUrl}
              className={s.video}
            />
        : null}
      </div>
      <p>
        {description?.length > 255 ? description.slice(0, 255) + '...' : description}
      </p>
      <div className={s.footer}>
        {!isPost && 
          <Link
            to={`${pathname}/${id}`} 
            className={s.comments}
          >
            <FaComment
              className={s.commentIcon} 
            />
            {commentsCount}
          </Link>
        }
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
    </div>
  )

}

export default FeedItem;
