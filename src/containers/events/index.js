import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import Feed from '../feed';
import { setEvents, clearEvents, toggleLikeEvent } from '../../actions/events-actions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ERRORS } from '../../constants/error.constants';

const EventsContainer = () => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {content, totalPages, currentPage} = useSelector(state => state.events);

  useEffect(() => {
    dispatch(setEvents(0));
    return () => dispatch(clearEvents());
  }, []);
  
  const onChangePage = async (page) => {
    try {
      setIsLoading(true);
      await dispatch(setEvents(page));
    } catch(e) {
      toast.error(ERRORS[e?.response?.data?.message])
    } finally {
      setIsLoading(false);
    } 
  }

  const eventLikeHandler = async (id) => {
    try {
      await dispatch(toggleLikeEvent(id));
    } catch(e) {
      toast.error(ERRORS[e?.response?.data?.message])
    }
  }

  return (
    <Layout>
      <Feed
        onLike={eventLikeHandler}
        isLoading={isLoading}
        list={content}
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </Layout>
  )

}

export default EventsContainer;
