import React, { useEffect, useRef } from 'react';
import cn from 'classnames';

import s from './modal.module.scss';

const Modal = ({children, onClose, className}) => {

  const modalRef = useRef();

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])

  return (
    <div 
      className={s.container}
    >
      <div
        ref={modalRef} 
        className={cn(s.modal, className)}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal;
