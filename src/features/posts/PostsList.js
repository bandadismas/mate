import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import { selectPostIds, fetchPosts } from './postsSlice';
import {PostExcerpt} from './PostExcerpt';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    placeItems: 'center',
    height: theme.spacing(50),
  },
}));

export const PostsList = () => {
  const dispatch = useDispatch();
  const orderedPostIds = useSelector(selectPostIds);

  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  const classes = useStyles();

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  
  if (postStatus === 'loading') {
    content = <div className={classes.root}>
                <CircularProgress />
              </div>
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map(postId => (
      <PostExcerpt key={postId} postId={postId} className="mb-5"/>
    ));
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
}
