import { getNews } from '../services/news';

export const setNews = () => {
  return async (dispatch) => {
    const news = await getNews();
    dispatch({
      type: 'setNews',
      payload: news?.data
    })
  }
}
