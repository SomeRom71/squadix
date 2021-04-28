import React from 'react';
import FeedItem from './item';

const Feed = ({list}) => {
  
  return (
    <div>
      {list?.map(item => (
        <FeedItem key={item.id} info={item} />
      ))}
    </div>
  )

}

export default Feed;
