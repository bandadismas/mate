import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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

export const AddPostForm = () => {
  const [post, setPost] = useState('')

  const classes = useStyles();

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
            disabled={post===''?true:false}
          >
            Post
          </Button>
      </form>
    </section>
      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
    </Card>
  );
}

