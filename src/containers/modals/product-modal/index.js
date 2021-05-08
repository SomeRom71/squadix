import React, { useState } from 'react';
import Button from '../../../components/button';
import { useForm } from 'react-hook-form';
import Modal from '../../../components/modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema } from '../../../helpers/validation-schemas';
import { toast } from 'react-toastify';
import { ERRORS } from '../../../constants/error.constants';
import { fileToDataUri } from '../../../helpers/form-helpers';

import s from './product-modal.module.scss';
import Input from '../../../components/input';
import Checkbox from '../../../components/checkbox';

const ProductModal = ({ closeModal, addProduct, categories }) => {

  const [images, setImages] = useState([]);

  const { handleSubmit, formState: { errors }, register, setValue, getValues } = useForm({
    reValidateMode: 'onChange',
    resolver: yupResolver(productSchema),
    defaultValues: {
      postalDeliveryAvailable: false,
    }
  });

  const values = getValues();

  const onPost = async (data) => {
    try {
      await addProduct({
        ...data, 
        images,
      });
      closeModal();
      toast.success('Товар успешно добавлен и отправлен на модерацию');
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
      Добавить товар
      <form onSubmit={handleSubmit(onPost)}>
        <Input 
          placeholder="Наименование товара*"
          onChange={(val) => setValue('name', val)}
          error={errors?.name?.message}
        />
        <Input 
          placeholder="Местонахождение"
          onChange={(val) => setValue('region', val)}
          error={errors?.region?.message}
        />
        <select size="1" {...register('category')}>
          <option disabled>Выберите героя</option>
          {categories?.map(({name}) => <option value={name}>{name}</option>)}
        </select>
        <textarea
          className={s.textarea}
          placeholder="Описание" 
          {...register('description')}
        />
        <Checkbox 
          label="Доставка почтой"
          onChange={(val) => setValue('postalDeliveryAvailable', val)}
          checked={values.postalDeliveryAvailable}
        />
        <span className={s.error}>{errors?.description?.message}</span>
        <input 
          type="file"
          multiple 
          onChange={uploadImage}
          accept="image/jpeg, image/png"
        />
        <Input 
          type="number"
          placeholder="Цена, BYN*"
          onChange={(val) => setValue('price', val)}
          error={errors?.price?.message}
        />
        <Button 
          text="Отправить"
          type="submit"
        />
      </form>
    </Modal>
  )
}

export default ProductModal;
