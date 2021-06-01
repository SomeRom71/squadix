import React, { useState } from 'react';
import cn from 'classnames';
import UserPreview from '../../../components/user-preview';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FaComment, FaHeart } from "react-icons/fa";
import Youtube from 'react-youtube';
import { FaRegCopy, FaExternalLinkAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import FSLightbox from 'fslightbox-react';
import moment from 'moment';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import s from './item.module.scss';


const FeedItem = ({
  info: {
    id,
    shortDescription,
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
    eventDate,
    eventLatitude,
    eventLongitude,
    eventAddress,
    startTime
  },
  onLike, 
  isPost,
  className
}) => {

  const location = useLocation();
  const pathname = location.pathname; 
  const backURL = pathname.split('/');
  const [isSliderShow, setIsSliderShow] = useState(false);
  const history = useHistory();
  
  const copyLink = () => {
    const linkToCopy = isPost ? window.location.origin + pathname : `${window.location.origin}${pathname}/${id}`;
    navigator.clipboard.writeText(linkToCopy);
    toast.success('Ссылка скопирована.');
  }

  return (
    <div className={cn(s.item, className)}>
      <div className={s.header}>
        <UserPreview 
          name={authorName}
          avatar={authorAvatarUrl}
          date={createdAt}
          localClassName="post"
          onClick={() => history.push(`/profile/${authorId}`)}
        />
        <button
          className={s.headerBtn}
          title="Скопировать URL"
          onClick={() => copyLink()}
        >
          <FaRegCopy />
        </button>
        {<Link
          target={isPost ? '_self' : '_blank'}
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
      {eventDate && <div>Дата: <b>{moment(eventDate).format('DD.MM.yyyy')}</b></div>}
      {startTime && <div>Время: <b>{moment(startTime).format('HH:mm')}</b></div>}
      {eventAddress && <div>Адрес: <b>{eventAddress}</b></div>}
      {shortDescription && <h4>{shortDescription}</h4>}
      <p>
        {description?.length > 255 && !isPost ? description.slice(0, 255) + '...' : description}
      </p>
      {eventLatitude && eventLongitude && isPost &&
        <YMaps>
          <b>Координаты:</b>
          <Map
            className={s.map}
            width="100%"
            height="350px" 
            defaultState={{
              center: [eventLatitude, eventLongitude], zoom: 12 
            }}
          >
            <Placemark 
              geometry={[eventLatitude, eventLongitude]} 
            />
          </Map>
        </YMaps>
      }
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
