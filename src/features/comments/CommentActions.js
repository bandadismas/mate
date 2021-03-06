import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import {deleteComment} from './commentsSlice';
import {editComment} from './commentsSlice';

const useStyles = makeStyles((theme) => ({
  loader: {
    position: 'absolute',
  }
}));

export const CommentActions = ({comment}) => {
    const [commentValue, setComment] = useState(comment.body);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDelDialog, setOpenDelDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const user = useSelector(state => state.currentUser);

    const dispatch = useDispatch();

    const classes = useStyles();

    const openLoader = addRequestStatus === 'pending' ? true : false;

    const canSave = commentValue!=='' && addRequestStatus==='idle';

    const headers = {
      'Authorization': `Bearer ${user.token}`,
      'Content-Type': 'application/json'
      };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
    const handleDelete = async ()  => {
      try {
        setAddRequestStatus('pending');

        const deleted = await dispatch(
            deleteComment({id:comment._id, headers})
        );

        unwrapResult(deleted);

        setOpenDelDialog(false);
        setAnchorEl(null);
      } catch {
        console.log('Error deleting comment');
      } finally {
        setAddRequestStatus('idle');
      }
    }

    const handleEdit = async ()  => {
        try {
          setAddRequestStatus('pending');
  
          const edited = await dispatch(
            editComment({id:comment._id, headers, commentValue})
          );
  
          unwrapResult(edited);
  
          setOpenEditDialog(false);
          setAnchorEl(null);
        } catch {
          console.log('Error editing comment');
        } finally {
          setAddRequestStatus('idle');
        }
      }

    let loader = null;

    if (openLoader) {
      loader = <CircularProgress color="primary" size={25} className={classes.loader}/>
    }

    if (user.currentUser._id===comment.author) {
    return(
        <React.Fragment>
        <IconButton 
            aria-label="settings" 
            aria-controls="change-menu" 
            aria-haspopup="true" 
            onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
          id="change-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          transformOrigin={{vertical: 'top', horizontal: 'center'}}
        >
          <MenuItem onClick={() => setOpenEditDialog(true)}>Edit</MenuItem>
          <MenuItem onClick={() => setOpenDelDialog(true)}>Delete</MenuItem>
        </Menu>
        <Dialog
          open={openDelDialog}
          onClose={() => setOpenDelDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this comment?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once you delete this post there is no restoring it.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDelDialog(false)} color="primary">
              Cancel
            </Button>
            <Button 
              onClick={handleDelete} 
              color="primary" 
              autoFocus
              disabled={openLoader}>
              Delete
              {loader}
            </Button>
          </DialogActions>
        </Dialog> 
        <Dialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          aria-labelledby="edit-dialog-title"
          aria-describedby="edit-dialog-description"
        >
          <DialogTitle id="edit-dialog-title">{"Edit Comment"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="edit-dialog-description">
                <Grid container className="ml-3">
                    <Grid item>
                        <form className={classes.form} display="inline">
                            <TextField
                                    id="postContent"
                                    name="postContent"
                                    variant="outlined"
                                    margin="normal"
                                    label="Comment"
                                    value={commentValue}
                                    onChange={e => setComment(e.target.value)}
                                />
                        </form>
                    </Grid>
                </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} color="primary">
              Cancel
            </Button>
            <Button 
              onClick={handleEdit} 
              color="primary" 
              autoFocus
              disabled={!canSave}>
              Edit
              {loader}
            </Button>
          </DialogActions>
        </Dialog> 
        </React.Fragment>
    );
    }
    
  return (null);
}