import React, { useState } from 'react';
import cn from 'classnames';
import moment from 'moment';
import UserPreview from '../../../../components/user-preview';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FaRegCopy, FaExternalLinkAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Tag from '../../../../components/tag';
import FSLightbox from 'fslightbox-react';
import { ROLES } from '../../../../constants/user.constants';

import s from './item.module.scss';
import Button from '../../../../components/button';

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
    upTime,
    views
  }, 
  isPost,
  me,
  upProduct,
  className
}) => {

  const [isPhoneShow, setIsPhoneShow] = useState(false);
  const { pathname } = useLocation(); 
  const backURL = pathname.split('/');
  const history = useHistory();
  const [isSliderShow, setIsSliderShow] = useState(false);

  const copyLink = () => {
    const linkToCopy = isPost ? window.location.origin + pathname : `${window.location.origin}${pathname}/${id}`;
    navigator.clipboard.writeText(linkToCopy);
    toast.success('Ссылка скопирована.');
  }

  const isAdmin = me?.roles?.includes(ROLES.admin);
  const canUpProduct = moment(new Date).diff(upTime, 'hours') > 24 || isAdmin;

  return (
    <div className={cn(s.item, {[s.promo]: promoUrl}, className)}>
      <div className={s.header}>
        <UserPreview 
          name={authorName}
          avatar={authorAvatarUrl}
          date={promoUrl ? null : createdAt}
          localClassName="post"
          onClick={() => history.push(`/profile/${authorId}`)}
          className={s.link}
        />
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
              target={isPost ? '_self' : '_blank'} 
              rel="noopener noreferrer"
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
      <div className={s.row}>
        <h4>{name}</h4>
        <span className={s.views}>Просмотров: {views}</span>
      </div>
      {isPost && <p>{description}</p>}
      <div className={s.footer}>
        {(me?.id === authorId || isAdmin) && isPost &&
          <Button
            styleType="transparent"
            text="Поднять товар"
            className={s.btn}
            onClick={() => upProduct(id)}
            disabled={!canUpProduct}
          />
        }
        <div className={s.tags}>
          {category && <Tag className={s.tag} text={category} />}
          {region && <Tag className={s.tag} text={region} />}
          {postalDeliveryAvailable && <Tag className={s.tag} text="Доставка почтой" />}
          {reserved && <Tag className={s.tag} text="Зарезервировано" />}
          <span className={s.price}>{price} BYN</span>
        </div>
      </div>
    </div>
  )
}

export default FeedItem;
