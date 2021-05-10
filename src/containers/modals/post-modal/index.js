import React, { useState } from 'react';
import Button from '../../../components/button';
import { useForm, Controller } from 'react-hook-form';
import Modal from '../../../components/modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from '../../../helpers/validation-schemas';
import { toast } from 'react-toastify';
import { ERRORS } from '../../../constants/error.constants';
import { uploadImage, filterPassedTime } from '../../../helpers/form-helpers';
import DatePicker from 'react-datepicker';
import Textarea from '../../../components/textarea';

import s from './post-modal.module.scss';


const PostModal = ({ closeModal, addPost, isEvent }) => {

  const [images, setImages] = useState([]);
  const [eventDate, setEventDate] = useState(new Date());

  const { handleSubmit, formState: { errors }, setValue, control } = useForm({
    resolver: yupResolver(postSchema),
  });
  const onPost = async (data) => {

    if (isEvent && !images.length) {
      toast.error('Добавьте хотя бы одну картинку');
      return;
    }

    try {
      await addPost({
        ...data, 
        images,
        contentType: 'POST',
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
            className={s.dateInput}
            wrapperClassName={s.date}
          />
        }
        <Controller 
          control={control}
          name="description"
          render={({field: {value}}) => (
            <Textarea 
              className={s.text}
              value={value}
              onChange={(val) => setValue('description', val)}
              error={errors?.description?.message}
              placeholder="Введите описание"
            />
          )}
        />
        <input 
          type="file"
          multiple 
          onChange={(e) => uploadImage(e, setImages)}
          accept="image/jpeg, image/png"
          className={s.file}
        />
        <Button 
          className={s.btn}
          text="Отправить"
          type="submit"
          disabled={errors?.description?.message}
        />
      </form>
    </Modal>
  )
}

export default PostModal;
