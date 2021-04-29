import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../button';
import Input from '../input';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../helpers/validation-schemas';
import { authUser } from '../../services/auth';
import { toast } from 'react-toastify';
import { ERRORS } from '../../constants/error.constants';
import { useHistory } from 'react-router-dom';

import s from './auth-form.module.scss';

const LoginForm = () => {

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, formState: { errors }, setValue } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await authUser(data);
      localStorage.setItem('accessToken', response.data.accessToken);
      history.push('/');
    } catch (e) {
      toast.error(ERRORS[e?.response?.data?.message])
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input 
          className={s.input}
          placeholder="Email"
          onChange={(value) => setValue('email', value)}
          error={errors?.email?.message}
        />
        <Input 
          className={s.input}
          placeholder="Пароль"
          type='password'
          onChange={(value) => setValue('password', value)}
          error={errors?.password?.message}
        />
        <Button
          type="submit"
          text="ВОЙТИ"
          disabled={isLoading}
          isLoading={isLoading}
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
