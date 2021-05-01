import React from 'react';
import CommentItem from './item';
import { useDispatch } from 'react-redux';
import { openModal } from '../../actions/modals-actions';

import s from './comments.module.scss';

const Comments = ({list, onLike, addComment}) => {

  const dispatch = useDispatch();

  const openCommentModal = () => {
    dispatch(openModal('commentModal', {
      addComment: (data) => addComment(data),
    }))
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <span>Комментарии ({list?.length})</span>
        <button
          onClick={() => openCommentModal()}
          className={s.add}
        >
          Добавить комментарий
        </button>
      </div>
      {list?.map(item => (
        <CommentItem 
          info={item}
          onLike={onLike}
          key={item.id}
        />
      ))}
    </div>
  )
}

export default Comments;
