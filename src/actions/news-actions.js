import { getNews } from '../services/news';

export const setNews = (page) => {
  return async (dispatch) => {
    const news = await getNews(page);
    dispatch({
      type: 'setNews',
      payload: news?.data
    })
  }
}

export const clearNews = () => {
  return async (dispatch) => {
    dispatch({
      type: 'clearNews',
      payload: {}
    })
  }
}
