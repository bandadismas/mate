import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import {PostAuthor} from './PostAuthor';
import {TimeAgo} from './TimeAgo';
import {LikeButton} from './LikeButton';
import {DislikeButton} from './DislikeButton';
import {PostActions} from './PostActions';
import {selectPostById} from './postsSlice';
import { useSelector } from 'react-redux';

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

export const PostExcerpt = ({postId}) => {
  const post = useSelector(state => selectPostById(state, postId));
  const classes = useStyles();

  const comments = post.comments.length;
  const commentLabel = comments===1?"Comment":"Comments";

  return (
    <Card className={classes.root}> 
      <CardHeader
        avatar={
          <Avatar aria-label="post-author" className={classes.avatar}>
            <span><PostAuthor userId={post.author} avatar={true}></PostAuthor></span>
          </Avatar>
        }
        action={
          <PostActions post={post} />
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
        <Grid container justify="flex-start">
          <Grid className="mr-3" item>
            <span ><LikeButton post={post} />{post.likes.length}</span>
          </Grid>
        <Grid item><DislikeButton post={post} />{post.dislikes.length}</Grid>
        <Grid item className="ml-4">
          <Button>
            <Link to={`/posts/${post._id}`}>Comment</Link>
          </Button>
        </Grid>
        <Grid item className="ml-auto">{comments} {commentLabel}</Grid>
        </Grid>
        <hr />
      </CardActions>
    </Card>
  );
}
