import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import { selectAllPosts, fetchPosts } from './postsSlice';
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
  const posts = useSelector(selectAllPosts);

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
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    content = orderedPosts.map(post => (
      <PostExcerpt key={post._id} post={post} className="mb-5"/>
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
