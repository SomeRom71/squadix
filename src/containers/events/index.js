import React, { useEffect } from 'react';
import Layout from '../layout';
import Feed from '../feed';
import { setEvents, clearEvents } from '../../actions/events-actions';
import { useDispatch, useSelector } from 'react-redux';

const EventsContainer = () => {

  const dispatch = useDispatch();
  const {content, totalPages, currentPage} = useSelector(state => state.events);

  useEffect(() => {
    dispatch(setEvents(0));
    return () => dispatch(clearEvents());
  }, []);

  const onChangePage = (page) => {
    dispatch(setEvents(page));
  }

  return (
    <Layout>
      <Feed 
        list={content}
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </Layout>
  )

}

export default EventsContainer;
