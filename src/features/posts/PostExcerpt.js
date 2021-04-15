import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import {PostAuthor} from './PostAuthor';
import {TimeAgo} from './TimeAgo';
import {LikeButton} from './LikeButton';
import {DislikeButton} from './DislikeButton';

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

export const PostExcerpt = ({post}) => {
  const classes = useStyles();

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
        <div>
        <span className="mr-5"><LikeButton post={post} />{post.likes.length}</span>
        <span><DislikeButton post={post} />{post.dislikes.length}</span>
        </div>
        <hr />
      </CardActions>
    </Card>
  );
}
