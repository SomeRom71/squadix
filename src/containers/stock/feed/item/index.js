import React, { useState } from 'react';
import cn from 'classnames';
import UserPreview from '../../../../components/user-preview';
import { Link, useLocation } from 'react-router-dom';
import { FaRegCopy, FaExternalLinkAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Tag from '../../../../components/tag';
import FSLightbox from 'fslightbox-react';

import s from './item.module.scss';

const FeedItem = ({
  info: {
    id,
    description,
    name,
    price,
    postalDeliveryAvailable,
    category,
    region,
    promoUrl,
    reserved,
    authorPhone,
    imageUrls,
    authorId,
    authorName,
    authorAvatarUrl,
    createdAt,
  }, 
  isPost,
  className
}) => {

  const [isPhoneShow, setIsPhoneShow] = useState(false);
  const { pathname } = useLocation(); 
  const backURL = pathname.split('/');

  const [isSliderShow, setIsSliderShow] = useState(false);

  const copyLink = () => {
    const linkToCopy = isPost ? pathname : `${pathname}/${id}`;
    navigator.clipboard.writeText(linkToCopy);
    toast.success('Ссылка скопирована.');
  }

  return (
    <div className={cn(s.item, {[s.promo]: promoUrl}, className)}>
      <div className={s.header}>
        <Link 
          className={s.link}
          to={`/profile/${authorId}`}
        >
          <UserPreview 
            name={authorName}
            avatar={authorAvatarUrl}
            date={promoUrl ? null : createdAt}
            localClassName="post"
          />
        </Link>
        {!promoUrl && <>
          {isPhoneShow ?
            <a className={s.phone} href={`tel:${authorPhone}`}>{authorPhone}</a> : 
            <button
              className={s.showPhone}
              onClick={() => setIsPhoneShow(true)}
            >
              Показать телефон
            </button>  
          }
          <button
            className={s.headerBtn}
            title="Скопировать URL"
            onClick={() => copyLink()}
          >
            <FaRegCopy />
          </button>
          </>
        }
        {promoUrl ? 
          <a
            target="blank" 
            href={promoUrl} 
            rel="noreferrer nofollow"
          >
            <FaExternalLinkAlt />
          </a>
          : <Link
            className={s.headerBtn}
            to={isPost ? `/${backURL[1]}` : `${pathname}/${id}`}
            title={`Перейти к ${isPost ? 'ленте' : 'посту'}`} 
          >
            <FaExternalLinkAlt />
          </Link>
        }
      </div>
      <div className={s.media}>
        {imageUrls?.length 
          ? 
            <>
              <img 
                className={s.img} 
                src={imageUrls[0]}
                onClick={() => setIsSliderShow(!isSliderShow)}
                alt="slider"
              />     
              
            </>
          : null}
          <FSLightbox
            toggler={isSliderShow}
            sources={imageUrls}
            type="image"
          />
      </div>
      <h4>
        {name}
      </h4>
      {isPost && <p>{description}</p>}
      <div className={s.footer}>
        {category && <Tag className={s.tag} text={category} />}
        {region && <Tag className={s.tag} text={region} />}
        {postalDeliveryAvailable && <Tag className={s.tag} text="Доставка почтой" />}
        {reserved && <Tag className={s.tag} text="Зарезервировано" />}
        <span className={s.price}>{price} BYN</span>
      </div>
    </div>
  )
}

export default FeedItem;
