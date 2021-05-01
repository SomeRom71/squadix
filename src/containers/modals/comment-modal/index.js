import React from 'react';
import Button from '../../../components/button';
import { useForm } from 'react-hook-form';
import Modal from '../../../components/modal';

import s from './comment-modal.module.scss';

const CommentModal = ({ closeModal, addComment }) => {

  const { handleSubmit, formState: {errors}, register } = useForm();

  const onComment = (data) => {
    addComment(data);
    closeModal();
  }

  return (
    <Modal 
      onClose={closeModal}
    >
      Ваш комментарий
      <form onSubmit={handleSubmit(onComment)}>
        <textarea
          className={s.textarea} 
          {...register('text', {
            required: 'Введите комментарий',
          })}
        />
        <span className={s.error}>{errors?.text?.message}</span>
        <Button 
          text="Отправить"
          type="submin"
        />
      </form>
    </Modal>
  )
  
}

export default CommentModal;
