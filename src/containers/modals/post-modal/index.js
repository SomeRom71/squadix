import React, { useState } from 'react';
import Button from '../../../components/button';
import { useForm } from 'react-hook-form';
import Modal from '../../../components/modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from '../../../helpers/validation-schemas';
import { toast } from 'react-toastify';
import { ERRORS } from '../../../constants/error.constants';
import { fileToDataUri, filterPassedTime } from '../../../helpers/form-helpers';
import DatePicker from 'react-datepicker';

import s from './post-modal.module.scss';

const PostModal = ({ closeModal, addPost, isEvent }) => {

  const [images, setImages] = useState([]);
  const [eventDate, setEventDate] = useState(new Date());

  const { handleSubmit, formState: { errors }, register } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onPost = async (data) => {
    try {
      await addPost({
        ...data, 
        images,
        ...(isEvent && { 
          eventDate,
          startTime: eventDate 
        }),
      });
      closeModal();
      toast.success('Пост успешно добавлен');
    } catch (e) {
      toast.error(ERRORS[e?.response?.data?.message]);
    }
  }

  const uploadImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImagesPromises = [];
      for (let i = 0; i < e.target.files.length; i++) {
        newImagesPromises.push(fileToDataUri(e.target.files[i]));
      }
      const newImages = await Promise.all(newImagesPromises);
      setImages(newImages);
    }
  }

  return (
    <Modal 
      onClose={closeModal}
    >
      Добавить пост
      <form onSubmit={handleSubmit(onPost)}>
        {isEvent && 
          <DatePicker 
            selected={eventDate} 
            onChange={date => setEventDate(date)} 
            minDate={new Date()}
            showTimeSelect
            filterTime={filterPassedTime}
            timeIntervals={5}
            dateFormat="dd/MM/yyyy HH:mm"
          />
        }
        <textarea
          className={s.textarea}
          placeholder="Описание" 
          {...register('description', {
            required: 'Введите описание',
          })}
        />
        <span className={s.error}>{errors?.description?.message}</span>
        <input 
          type="file"
          multiple 
          onChange={uploadImage}
          accept="image/jpeg, image/png"
        />
        <Button 
          text="Отправить"
          type="submit"
          disabled={errors?.description?.message}
        />
      </form>
    </Modal>
  )
}

export default PostModal;
