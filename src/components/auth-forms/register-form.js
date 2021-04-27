import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../button';
import Input from '../input';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../helpers/validation-schemas';
import { createUser } from '../../api/auth';
import { toast } from 'react-toastify';
import { ERRORS } from '../../constants/error.constants';

import s from './auth-form.module.scss';

const RegisterForm = () => {

  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, formState: { errors }, setValue } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await createUser(data);
      toast.success('Пользователь успешно зарегистрирован');
      
    } catch (e) {
      toast.error(ERRORS[e.response.data.message] || e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input 
          className={s.input}
          placeholder='Отображаемое имя'
          onChange={(value) => setValue('displayName', value)}
          error={errors?.name?.message}
        />
        <Input 
          className={s.input}
          placeholder='Email'
          onChange={(value) => setValue('email', value)}
          error={errors?.email?.message}
        />
        <Input 
          className={s.input}
          placeholder='Пароль'
          type='password'
          onChange={(value) => setValue('password', value)}
          error={errors?.password?.message}
        />
        <Input 
          className={s.input}
          placeholder='Пароль'
          type='password'
          onChange={(value) => setValue('confirmPassword', value)}
          error={errors?.confirmPassword?.message}
        />
        <Input 
          className={s.input}
          placeholder='Телефон'
          onChange={(value) => setValue('phone', value)}
          error={errors?.phone?.message}
        />
        <Button
          type='submit'
          text='Зарегистрироваться'
          disabled={isLoading}
          isLoading={isLoading}
        />
      </form>
      <Link
        className={s.link} 
        to='/login'
      >
        Есть аккаунт? Войдите.
      </Link>
    </>
  )
}

export default RegisterForm;
