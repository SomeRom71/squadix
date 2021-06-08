import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../layout';
import { useForm, Controller  } from 'react-hook-form';
import Datepicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import Input from '../../components/input';
import Button from '../../components/button';
import { updateAvatar, updateMe, removeAvatar } from '../../actions/user-actions';
import { openModal } from '../../actions/modals-actions';
import { toast } from 'react-toastify';
import { ERRORS } from '../../constants/error.constants';
import { CHANGE_PASS_MODAL } from '../../constants/modal.constants';
import { changePass } from '../../services/auth';
import { useHistory } from 'react-router';
import moment from 'moment';
import InputMask from 'react-input-mask';

import s from './me.module.scss';
registerLocale('ru', ru);

const MeContainer = () => {

  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const { 
    birthday, 
    city, 
    country, 
    displayName,
    profilePictureUrl,
    team,
    phone,
    description
  } = useSelector(state => state.user.me);

  const { handleSubmit, setValue, reset, control } = useForm({
    defaultValues: {
      birthday,
      city,
      country,
      displayName,
      team,
      phone,
      description
    }
  });

  const avatarChange = async (val) => {
    const formData = new FormData();
    formData.append("file", val[0]);
    try {
      await dispatch(updateAvatar(formData));
      toast.success('Аватар обновлен');
    } catch (e) {
      toast.error(ERRORS[e?.response?.data?.message]);
    }
  }

  const onSubmit = async (data) => {
    try {
      await dispatch(updateMe({
        ...data,
        birthday: data.birthday,
      }));
      toast.success('Данные обновлены');
      setIsEdit(false);
    } catch (e) {
      toast.error(ERRORS[e?.response?.data?.message] || 'Ошибка');
    }
  }

  const openChangeModal = () => {
    dispatch(openModal(CHANGE_PASS_MODAL, {
      changePass: (data) => changePass(data)
    }))
  }

  const rmAvatar = async () => {
    try {
      await dispatch(removeAvatar());
      toast.success('Аватар успешно удален');
    } catch (e) {
      toast.error(ERRORS[e?.response?.data?.message] || 'Ошибка');
    }
  }

  useEffect(() => {
    reset({
      birthday, 
      city, 
      country, 
      displayName,
      team,
      phone,
      description
    })
  }, [birthday])

  return (
    <Layout>
      <div className={s.container}>
        <div className={s.avatar}>
          {profilePictureUrl ? 
            <>
              <img className={s.img} src={profilePictureUrl} alt="avatar" />
              <button
                type="button" 
                onClick={() => rmAvatar()}
                className={s.remove}>
                x
              </button>
            </> :
            <div className={s.preview}>
              {displayName?.[0]}
            </div>
          }
          <div className={s.add}>
            <span>+</span>
            <input
              className={s.file} 
              type='file' 
              onChange={(e) => avatarChange(e.target.files)} 
              accept="image/jpeg, image/png"
            />
          </div>
        </div>
        {
          isEdit ? 
            <form onSubmit={handleSubmit(onSubmit)}>
              <span className={s.note}>Дата рождения</span>
              <Controller
                control={control}
                name="birthday"
                render={({
                  field: { value },
                }) => (
                  <Datepicker 
                    selected={value ? new Date(value) : null} 
                    onChange={(val) => setValue('birthday', val)} 
                    className={s.datepicker}
                    wrapperClassName={s.datecontainer}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Выберите дату рождения"
                    showYearDropdown
                    dropdownMode="select"
                    locale="ru"
                  />
                )} 
              />
              <Controller
                control={control}
                name="displayName"
                render={({
                  field: { value },
                }) => (
                  <Input
                    label="Отображаемое имя *"
                    className={s.input}
                    value={value}
                    onChange={(val) => setValue('displayName', val)}
                  />
                )}
              />
              <Controller
                control={control}
                name="country"
                render={({
                  field: { value },
                }) => (
                  <Input
                    disabled
                    label="Страна"
                    className={s.input}
                    value={'Беларусь'}
                    onChange={(val) => setValue('country', val)}
                  />
                )}
              />
              <Controller
                control={control}
                name="city"
                render={({
                  field: { value },
                }) => (
                  <Input
                    label="Город"
                    className={s.input}
                    value={value}
                    onChange={(val) => setValue('city', val)}
                  />
                )}
              />
              <Controller
                control={control}
                name="team"
                render={({
                  field: { value }
                }) => (
                  <Input
                    label="Команда"
                    className={s.input}
                    value={value}
                    onChange={(val) => setValue('team', val)}
                  />
                )}
              />
              <Controller
                control={control}
                name="phone"
                render={({
                  field: { value }
                }) => (
                  <InputMask 
                    mask="+375 999999999"
                    value={value}
                    onChange={(value) => setValue('phone', value)}
                  >
                    {(inputProps) => <Input 
                      className={s.input}
                      label='Телефон'
                      value={inputProps.value}
                      onChange={inputProps.onChange}
                    />}
                  </InputMask>
                )}
              />
              <span className={s.note}>О себе</span>
              <Controller
                control={control}
                name="description"
                render={({
                  field: { value }
                }) => (
                  <textarea
                    value={value}
                    className={s.textarea}
                    placeholder="O ceбе" 
                    onChange={(e) => setValue('description', e.target.value)}
                  />
                )}
              />
              <Button
                type="submit" 
                text="Сохранить" 
              />
            </form>
        : <div>
            <span className={s.name}>{displayName}</span>
            <div className={s.item}>
              <span className={s.subtitle}>Дата рождения</span>
              {moment(birthday).format('DD.MM.yyyy')}
            </div>
            {country && <div className={s.item}>
              <span className={s.subtitle}>Страна</span>
              {country}
            </div>}
            {city && <div className={s.item}>
              <span className={s.subtitle}>Город</span>
              {city}
            </div>}
            {team && <div className={s.item}>
              <span className={s.subtitle}>Команда</span>
              {team}
            </div>}
            <div className={s.item}>
              <span className={s.subtitle}>Телефон</span>
              {phone}
            </div>
            {description && <div className={s.description}>
              О себе:
              <p className={s.text}>{description}</p>
            </div>}
          </div>
        }
        {!isEdit && <Button
          type="button" 
          text="Редактировать"
          onClick={() => setIsEdit(!isEdit)} 
        />}
        <Button 
          styleType="red"
          text="Изменить пароль"
          className={s.change}
          onClick={openChangeModal}
        />
      </div>
    </Layout>
  )
}

export default MeContainer;
