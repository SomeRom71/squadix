import React from 'react';
import Button from '../../../components/button';
import { useForm } from 'react-hook-form';
import Modal from '../../../components/modal';

import s from './post-modal.module.scss';

const PostModal = ({ closeModal, addPost }) => {

  const { handleSubmit, formState: {errors}, register } = useForm();

  const onPost = (data) => {
    addPost(data);
    closeModal();
  }

  return (
    <Modal 
      onClose={closeModal}
    >
      Добавить пост
      <form onSubmit={handleSubmit(onPost)}>
        <textarea
          className={s.textarea}
          placeholder="Описание" 
          {...register('text', {
            required: 'Введите комментарий',
          })}
        />
        <input type="file" />
        <span className={s.error}>{errors?.text?.message}</span>
        <Button 
          text="Отправить"
          type="submin"
        />
      </form>
    </Modal>
  )
  
}

export default PostModal;
