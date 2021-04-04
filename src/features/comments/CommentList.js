import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {CommentExcerpt} from './CommentExcerpt';
import {fetchComments} from './commentsSlice';


export const CommentsList = ({post}) => {

  const comments = useSelector(state => state.comments.comments)
  const dispatch = useDispatch();

  const postId = post._id
  console.log('comments: ', comments)
  useEffect(() => {
      dispatch(fetchComments({postId}))
      console.log('comments: ', comments)
  });
  
  let content = null;
    // // Sort comments in reverse chronological order by datetime string
    // const orderedComments = comments
    //   .slice()
    //   .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
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
