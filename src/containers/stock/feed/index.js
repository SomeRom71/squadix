import React from 'react';
import FeedItem from './item';
import Pagination from '../../../components/pagination';
import Loader from '../../../components/loader';

import s from './feed.module.scss';

const StockFeed = ({list, totalPages, onChangePage, isLoading}) => {

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
          className={s.item}
          key={item.id} 
          info={item} 
        />
      ))}
    </div>
  )
}

export default StockFeed;
