import React from 'react';
import cn from 'classnames';

import s from './tag.module.scss';

const Tag = ({text, className}) => {
  return (
    <div className={cn(s.tag, className)}>
      {text}
    </div>
  )
}

export default Tag;
