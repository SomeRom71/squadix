import React, { useState } from 'react';
import Button from '../../../components/button';
import { useForm } from 'react-hook-form';
import Modal from '../../../components/modal';
import { uploadImage } from '../../../helpers/form-helpers';
import s from './comment-modal.module.scss';

const CommentModal = ({ closeModal, addComment }) => {

  const [images, setImages] = useState([]);
  const { handleSubmit, formState: {errors}, register } = useForm();

  const onComment = (data) => {
    addComment({...data, imageUrls: images});
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
        <input 
          type="file"
          multiple 
          onChange={(e) => uploadImage(e, setImages)}
          accept="image/jpeg, image/png"
          className={s.file}
        />
        <Button 
          text="Отправить"
          type="submit"
        />
      </form>
    </Modal>
  )
  
}

export default CommentModal;
