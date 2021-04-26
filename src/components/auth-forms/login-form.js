import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../input';

import s from './auth-form.module.scss';

const LoginForm = () => {

  const { handleSubmit } = useForm();

  const onSubmit = () => {
    console.log('send');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input 
        className={s.input}
        placeholder="E-mail"
      />
      <Input 
        className={s.input}
        placeholder="Password"
        type='password'
      />
    </form>
  )
}

export default LoginForm;
