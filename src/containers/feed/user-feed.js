import React from 'react';
import { useHistory } from 'react-router-dom';
import s from './feed.module.scss';
import UserPreview from '../../components/user-preview';
import Loader from '../../components/loader';
import Pagination from '../../components/pagination';

const UserFeed = ({list, totalPages, onChangePage, isLoading, currentPage }) => {

  const history = useHistory();

  return (
    <div className={s.feed}>
      {isLoading && <Loader preloader />}
      {totalPages > 1 &&
        <Pagination 
          totalPages={totalPages}
          onChangePage={onChangePage}
          forcePage={currentPage}
        />
      }
      {list?.map(({displayName, profilePictureUrl, id, country, city}) => (
        <div
          className={s.userItem}
          onClick={() => history.push(`/profile/${id}`)}
          key={id}
        >
          <UserPreview 
            name={displayName}
            avatar={profilePictureUrl}
            localClassName="post"
          />
          {country}{country && city && ","} {city}
        </div>
      ))}
    </div>
  )

}

export default UserFeed;
