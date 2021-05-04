import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentModal from './comment-modal';
import PostModal from './post-modal';
import { closeModal } from '../../actions/modals-actions';

const Modals = () => {

  const dispatch = useDispatch();
  const { commentModal, postModal } = useSelector(state => state.modals);

  const onClose = (modal) => dispatch(closeModal(modal));

  return(
    <>
      {commentModal.show && <CommentModal closeModal={() => onClose('commentModal')} {...commentModal.params} />}
      {postModal.show && <PostModal closeModal={() => onClose('postModal')} {...postModal.params} />}
    </>
  )
}

export default Modals;
