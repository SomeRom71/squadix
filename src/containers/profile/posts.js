import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import Feed from '../feed';
import { setProfileNews, clearNews, toggleLikeNews } from '../../actions/news-actions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ERRORS } from '../../constants/error.constants';
import { useParams } from 'react-router';
import { NEWS_POST_PATH } from '../../constants/routes.constants';

const ProfileNewsContainer = () => {

    const { id } = useParams(); 

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {content, totalPages, currentPage} = useSelector(state => state.news.profileNews);

  useEffect(() => {
    dispatch(setProfileNews(id, 0));
    return () => dispatch(clearNews());
  }, []);

  const onChangePage = async (page) => {
    try {
      setIsLoading(true);
      await dispatch(setProfileNews(id, page));
    } catch(e) {
      toast.error(ERRORS[e?.response?.data?.message])
    } finally {
      setIsLoading(false);
    } 
  }

  const NewsLikeHandler = async (id) => {
    try {
      await dispatch(toggleLikeNews(id));
    } catch(e) {
      toast.error(ERRORS[e?.response?.data?.message])
    }
  }

  return (
    <Layout>
      <Feed 
        onLike={NewsLikeHandler}
        isLoading={isLoading}
        list={content}
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
        pathname={NEWS_POST_PATH}
      />
    </Layout>
  )

}

export default ProfileNewsContainer;
