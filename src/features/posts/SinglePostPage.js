import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux'

import {PostAuthor} from './PostAuthor';
import {TimeAgo} from './TimeAgo';
import {LikeButton} from './LikeButton';
import {DislikeButton} from './DislikeButton';
import {selectPostById} from './postsSlice'
import {CommentsList} from '../comments/CommentsList'
import {fetchComments} from '../comments/commentsSlice';

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

export const SinglePostPage = ({match}) => {
  const dispatch = useDispatch();
  
  const { postId } = match.params;
  
  const post = useSelector(state => selectPostById(state, postId));

  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchComments({postId}));
}, [dispatch, postId]);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const comments = post.comments.length;
  const commentLabel = comments===1?"Comment":"Comments";
  return (
    <Card className={classes.root}> 
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <span>{(<PostAuthor userId={post.author}></PostAuthor>)}.substring(0,1)</span>
          </Avatar>
        }
        
        title= {<PostAuthor userId={post.author}></PostAuthor>}
        subheader= {<TimeAgo timestamp={post.createdAt}/>}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions >
        <Grid container justify="start">
          <Grid className="mr-3" item>
            <span ><LikeButton post={post} />{post.likes.length}</span>
          </Grid>
        <Grid item><DislikeButton post={post} />{post.dislikes.length}</Grid>
        <Grid item className="ml-auto">{comments} {commentLabel}</Grid>
        </Grid>
        <hr />
        <Grid container justify="start">
            <CommentsList post={post} />
        </Grid>
      </CardActions>
    </Card>
  );
}
