import React from 'react';
import ReactPaginate from 'react-paginate';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import s from './pagination.module.scss';

const Pagination = ({totalPages, onChangePage}) => {
  return (
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
  )
}

export default Pagination;
