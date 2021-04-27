import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../button';
import Input from '../input';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../helpers/validation-schemas';
import { authUser } from '../../api/auth';

import s from './auth-form.module.scss';

const LoginForm = () => {

  const { handleSubmit, formState: { errors }, register } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    await authUser(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input 
          className={s.input}
          placeholder="Email"
          {...register("email")}
          error={errors?.email?.message}
        />
        <Input 
          className={s.input}
          placeholder="Пароль"
          type='password'
          {...register("password")}
          error={errors?.password?.message}
        />
        <Button
          type="submit"
          text="ВОЙТИ" 
        />
      </form>
      <Link
        className={s.link} 
        to="/register"
      >
        Все еще нет аккаунта? Зарегистрируйтесь.
      </Link>
    </>
  )
}

export default LoginForm;
