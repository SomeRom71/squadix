import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentModal from './comment-modal';
import PostModal from './post-modal';
import ProductModal from './product-modal';
import ChangePassModal from './change-pass-modal';
import { closeModal } from '../../actions/modals-actions';
import { POST_MODAL, COMMENT_MODAL, PRODUCT_MODAL, CHANGE_PASS_MODAL } from '../../constants/modal.constants';

const Modals = () => {

  const dispatch = useDispatch();
  const onClose = (modal) => dispatch(closeModal(modal));
  
  const { commentModal, postModal, productModal, changePassModal } = useSelector(state => state.modals);

  return(
    <>
      {commentModal.show && <CommentModal closeModal={() => onClose(COMMENT_MODAL)} {...commentModal.params} />}
      {postModal.show && <PostModal closeModal={() => onClose(POST_MODAL)} {...postModal.params} />}
      {productModal.show && <ProductModal closeModal={() => onClose(PRODUCT_MODAL)} {...productModal.params} />}
      {changePassModal.show && <ChangePassModal closeModal={() => onClose(CHANGE_PASS_MODAL)} {...changePassModal.params} />}
    </>
  )
}

export default Modals;
