import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import Button from '../button';
import Input from '../input';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetSchema, resetTokenSchema } from '../../helpers/validation-schemas';
import { askPasswordReset, resetPasswordConfirm } from '../../services/auth';
import { toast } from 'react-toastify';
import { ERRORS } from '../../constants/error.constants';
import { useHistory } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/routes.constants';

import s from './auth-form.module.scss';

const ResetForm = () => {

  const { token } = useParams();

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, formState: { errors }, setValue, control } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(token ? resetTokenSchema : resetSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      if(token) {
        await resetPasswordConfirm({
          ...data,
          resetPasswordToken: token,
        });
        toast.success('Пароль успешно изменен');
        setTimeout(() => history.push(LOGIN_PATH), 3000);
        return;
      }
      await askPasswordReset(data);
      toast.success('На вашу почту придет письмо с подтверждением')
    } catch (e) {
      toast.error(ERRORS[e?.response?.data?.message])
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {token ? 
          <Controller 
            control={control}
            name="newPassword"
            render={({field: { value }}) => (
              <Input 
                className={s.input}
                type="password"
                placeholder="Новый пароль"
                onChange={(value) => setValue('newPassword', value)}
                error={errors?.newPassword?.message}
                value={value}
              />
            )}
          />
          : <Controller 
            control={control}
            name="email"
            render={({field: { value }}) => (
              <Input 
                className={s.input}
                placeholder="Email"
                onChange={(value) => setValue('email', value)}
                error={errors?.email?.message}
                value={value}
              />
            )}
          />
        }
        <Button
          className={s.btn}
          type="submit"
          text="ОТПРАВИТЬ"
          disabled={isLoading}
          isLoading={isLoading}
        />
      </form>
      <Link
        className={s.link} 
        to={LOGIN_PATH}
      >
        Есть аккаунт? Войти
      </Link>
    </>
  )
}

export default ResetForm;
