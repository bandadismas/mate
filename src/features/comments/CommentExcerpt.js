import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

import {PostAuthor} from '../posts/PostAuthor';
import {TimeAgo} from '../posts/TimeAgo';
import {LikeButton} from './LikeButton';
import {DislikeButton} from './DislikeButton';
import {CommentActions} from './CommentActions';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    maxWidth: 700,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export const CommentExcerpt = ({comment, post}) => {
  const classes = useStyles();

  return (
    <div>
      <Grid>
          <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <span><PostAuthor userId={comment.author} avatar={true}></PostAuthor></span>
          </Avatar>
        }
        action={
          <CommentActions comment={comment} />
        }
        title= {<PostAuthor userId={comment.author}></PostAuthor>}
        subheader= {<TimeAgo timestamp={comment.createdAt}/>}
      />
      </Grid>
        <Typography variant="body2" color="textSecondary" component="p" className="mt-4 ml-3">
          {comment.body}
        </Typography>
        <div>
        <span className="mr-5"><LikeButton comment={comment} />{comment.likes.length}</span>
        <span><DislikeButton comment={comment} />{comment.dislikes.length}</span>
        </div>
      </div>
  );
}
