import React, { useState } from 'react';
import Button from '../../../components/button';
import { useForm, Controller } from 'react-hook-form';
import Modal from '../../../components/modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema } from '../../../helpers/validation-schemas';
import { toast } from 'react-toastify';
import { ERRORS } from '../../../constants/error.constants';
import { uploadImage } from '../../../helpers/form-helpers';
import Input from '../../../components/input';
import Checkbox from '../../../components/checkbox';
import Textarea from '../../../components/textarea';

import s from './product-modal.module.scss';


const ProductModal = ({ closeModal, addProduct, categories }) => {

  const [images, setImages] = useState([]);

  const { handleSubmit, formState: { errors }, register, setValue, getValues, control } = useForm({
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
          className={s.input}
          value={values.name}
        />
        <Input 
          placeholder="Местонахождение"
          onChange={(val) => setValue('region', val)}
          error={errors?.region?.message}
          className={s.input}
          value={values.region}
        />
        <select size="1" {...register('category')} className={s.select}>
          {categories?.map(({name}) => <option key={name} value={name}>{name}</option>)}
        </select>
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
        <Controller 
          control={control}
          name="postalDeliveryAvailable"
          render={({field: {value}}) => (
          <Checkbox 
            label="Доставка почтой"
            onChange={(val) => setValue('postalDeliveryAvailable', val)}
            checked={value}
            className={s.check}
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
        <Input 
          type="number"
          placeholder="Цена, BYN*"
          onChange={(val) => setValue('price', val)}
          error={errors?.price?.message}
          className={s.input}
          value={values.price}
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

export default ProductModal;
