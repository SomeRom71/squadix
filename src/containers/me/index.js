import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../layout';
import { useForm, Controller  } from 'react-hook-form';
import Datepicker, { setDefaultLocale, registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import Input from '../../components/input';
import Button from '../../components/button';
import { updateAvatar, updateMe } from '../../actions/user-actions';
import { toast } from 'react-toastify';
import { ERRORS } from '../../constants/error.constants';

import s from './me.module.scss';

registerLocale('ru', ru);

const MeContainer = () => {

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

  const { handleSubmit, setValue, getValues, reset, control } = useForm({
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

  const values = getValues();

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.avatar}>
            {profilePictureUrl ? 
              <img className={s.img} src={profilePictureUrl} /> :
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
                label="Страна"
                className={s.input}
                value={value}
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
              <Input
                label="Телефон"
                className={s.input}
                value={value}
                onChange={(val) => setValue('phone', val)}
              />
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
      </div>
    </Layout>
  )
}

export default MeContainer;
