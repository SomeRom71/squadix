import React from 'react';
import FeedItem from './item';

import s from './feed.module.scss';

import Loader from '../../components/loader';
import Pagination from '../../components/pagination';

const Feed = ({list, totalPages, onChangePage, isLoading, onLike}) => {

  return (
    <div className={s.feed}>
      {isLoading && <Loader preloader />}
      {totalPages > 1 &&
        <Pagination 
          totalPages={totalPages}
          onChangePage={onChangePage}
        />
      }
      {list?.map(item => (
        <FeedItem
          onLike={onLike}
          className={s.item}
          key={item.id} 
          info={item} 
        />
      ))}
    </div>
  )

}

export default Feed;
