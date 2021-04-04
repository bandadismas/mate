import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import {createComment} from './commentsSlice';
import {fetchPost} from '../posts/postsSlice';

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
  },
}));

export const AddCommentForm = ({postId}) => {
  const [comment, setComment] = useState('')
  const token = useSelector(state => state.currentUser.token);

  const dispatch = useDispatch()

  const classes = useStyles();

  let headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    }

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(
        createComment({id:postId, comment:comment, headers:headers})
      )
      console.log('results: ', resultAction)
      unwrapResult(resultAction)

      setComment('');

      dispatch(fetchPost({postId}))
      
    } catch (err) {
      console.error('Failed to create comment: ', err)
    } 
  }

  return (
    <section>
      <form className={classes.form}>
      <TextField
            id="postContent"
            name="postContent"
            variant="outlined"
            margin="normal"
            label="Comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={comment===''?true:false}
            onClick={handleSubmit}
          >
            Comment
          </Button>
      </form>
    </section>
  );
}

