import React from 'react';
import Button from '../../../components/button';
import { useForm } from 'react-hook-form';
import Modal from '../../../components/modal';
import Input from '../../../components/input';
import { toast } from 'react-toastify';
import { ERRORS } from '../../../constants/error.constants';
import { changeSchema } from '../../../helpers/validation-schemas';
import { yupResolver } from '@hookform/resolvers/yup';

import s from './change-pass.module.scss';

const ChangePassModal = ({ closeModal, changePass }) => {

  const { handleSubmit, formState: { errors }, getValues, setValue } = useForm({
    resolver: yupResolver(changeSchema),
  });
  const values = getValues();

  const onChangePass = (data) => {
    try {
        changePass(data);
        toast.success('Пароль изменен');
      } catch (e) {
        toast.error(ERRORS[e?.response?.data?.message] || 'Ошибка');
      }
    closeModal();
  }

  return (
    <Modal 
      onClose={closeModal}
    >
      Сменить пароль
      <form onSubmit={handleSubmit(onChangePass)}>
        <Input 
            type="password"
            className={s.input}
            value={values.old}
            onChange={(val) => setValue('oldPassword', val)}
            error={errors?.oldPassword?.message}
            placeholder="Старый пароль"
        />
        <Input 
            type="password"
            className={s.input}
            value={values.old}
            onChange={(val) => setValue('newPassword', val)}
            error={errors?.newPassword?.message}
            placeholder="Новый пароль"
        />
        <Button 
          text="Отправить"
          type="submit"
          className={s.btn}
        />
      </form>
    </Modal>
  )
  
}

export default ChangePassModal;
