import React from 'react';
import FeedItem from './item';
import ReactPaginate from 'react-paginate';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

import s from './feed.module.scss';

const StockFeed = ({list, totalPages, onChangePage}) => {

  return (
    <div className={s.feed}>
      {totalPages > 1 &&
        <ReactPaginate 
          pageCount={totalPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={10}
          onPageChange={(page) => onChangePage(page.selected)}
          containerClassName={s.pagination}
          activeClassName={s.paginationActive}
          previousLabel={<FaAngleLeft />}
          nextLabel={<FaAngleRight />}
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
