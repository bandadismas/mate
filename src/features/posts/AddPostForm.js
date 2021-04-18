import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import {createPost} from './postsSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    marginTop: 10,
    maxWidth: 700,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    // position: 'relative',
  },
  loader: {
    position: 'absolute',
    right: 5,
  }
}));

export const AddPostForm = () => {
  const [post, setPost] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const user = useSelector(state => state.currentUser);
  
  const dispatch = useDispatch();

  const classes = useStyles();

  const canSave = post!=='' && addRequestStatus==='idle';

  const openLoader = addRequestStatus === 'pending' ? true : false;

  let headers = {
    'Authorization': `Bearer ${user.token}`,
    'Content-Type': 'application/json'
    };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setAddRequestStatus('pending');

      const resultAction = await dispatch(
        createPost({body:post, headers:headers})
      );
      console.log('results: ', resultAction);
      unwrapResult(resultAction);

      setPost('');
      
    } catch (err) {
      console.error('Failed to create post: ', err);
    } finally {
      setAddRequestStatus('idle');
    }
  }

  let loader = null;

  if (openLoader) {
    loader = <CircularProgress color="primary" size={25} className={classes.loader}/>
  }

  if (Object.keys(user.currentUser).length!==0) {
    return (
      <Card className={classes.root}> 
    <CardContent>
  <section>
    <form className={classes.form}>
    <TextField
          id="postContent"
          name="postContent"
          variant="outlined"
          margin="normal"
          fullWidth
          label="What's on your mind"
          value={post}
          onChange={e => setPost(e.target.value)}
        />
      <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={!canSave}
          onClick={handleSubmit}
        >
          Post
          {loader}
        </Button>
    </form>
  </section>
    </CardContent>
    <CardActions disableSpacing>
    </CardActions>
  </Card>
    );
  } else {
      return (
        null
      );
  }
}

