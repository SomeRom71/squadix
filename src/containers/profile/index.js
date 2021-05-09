import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { setUser } from '../../actions/user-actions';
import moment from 'moment';
import Layout from '../layout';

import s from './profile.module.scss';

const ProfileContainer = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const me = useSelector(state => state.user.me);
  const { 
    displayName, 
    profilePictureUrl,
    country,
    city,
    description,
    birthday,
    phone,
    team 
  } = useSelector(state => state.user.profile);
  
  useEffect(() => {
    if(me.id == id) {
      history.push('/me')
      return;
    }
    (async () => {
      await dispatch(setUser(id));
    })()
  }, [me]);

  return (
    <Layout>
      <div className={s.container}>
        {profilePictureUrl && <img className={s.img} src={profilePictureUrl} alt="avatar" />}
        <span className={s.name}>{displayName}</span>

        <div className={s.item}>
          <span className={s.subtitle}>Дата рождения</span>
          {moment(birthday).format('DD.MM.yyyy')}
        </div>
        <div className={s.item}>
          <span className={s.subtitle}>Страна</span>
          {country}
        </div>
        <div className={s.item}>
          <span className={s.subtitle}>Город</span>
          {city}
        </div>
        <div className={s.item}>
          <span className={s.subtitle}>Команда</span>
          {team}
        </div>
        <div className={s.item}>
          <span className={s.subtitle}>Телефон</span>
          {phone}
        </div>

        <div className={s.description}>
          О себе:
          <p className={s.text}>{description}</p>
        </div>
      </div>
    </Layout>
  )
}

export default ProfileContainer;
