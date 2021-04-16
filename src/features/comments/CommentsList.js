import React from 'react';
import { useSelector } from 'react-redux';

import {CommentExcerpt} from './CommentExcerpt';

export const CommentsList = ({post}) => {

  const comments = useSelector(state => state.comments.comments)
    .filter(comment => comment.post===post._id)
  
  console.log('comments: ', comments);

  let content = null;
    
  if (comments) {
    content = comments.map(comment => (
      <CommentExcerpt key={comment._id} comment={comment} post={post} className="mb-5"/>
    ));
    } else {
      content = <div>No comments</div>
    }
  

  return (
    <section>
      <h4>Comments</h4>
      {content}
    </section>
  )
}
