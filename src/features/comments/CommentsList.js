import React from 'react';
import { useSelector } from 'react-redux';

import {CommentExcerpt} from './CommentExcerpt';

export const CommentsList = ({post}) => {

  const comments = useSelector(state => state.comments.comments)
    .filter(comment => comment.post===post._id)
  
  console.log('comments: ', comments);

  let content = <div>No comments</div>;
    
  if (comments) {
    content = comments.map(comment => (
      <CommentExcerpt key={comment._id} comment={comment} post={post} />
    ));
    } else {
      content = <div>No comments</div>
    }
  

  return (
    <div className="mb-3 ml-3">
      <h5 className="mb-3">Comments</h5>
      {content}
    </div>
  )
}
