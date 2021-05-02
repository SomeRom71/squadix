import React from 'react';
import cn from 'classnames';
import UserPreview from '../../../../components/user-preview';
import { Link, useLocation } from 'react-router-dom';
import { FaRegCopy, FaExternalLinkAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

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
  }, 
  isPost,
  className
}) => {

  const { pathname } = useLocation(); 
  const backURL = pathname.split('/');

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
      {imageUrls?.length 
        ? <img 
            className={s.img} 
            src={imageUrls[0]}
            loading="lazy"
          /> 
        : null}
      <p>
        {description?.length > 255 ? description.slice(0, 255) + '...' : description}
      </p>
      <div className={s.footer}>
          
      </div>
    </div>
  )
}

export default FeedItem;
