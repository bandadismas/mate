import React from 'react';
import { useSelector } from 'react-redux';

export const PostAuthor = ({ userId, avatar }) => {
  const author = useSelector(state =>
    state.users.find(user => user._id === userId)
  );

  if (avatar) {
    return (<span>{author ? author.firstName.substring(0,1) : 'Un'}</span>);
  } 

  return (<span>{author ? `${author.firstName} ${author.lastName}`: 'Unknown author'}</span>);
  
}