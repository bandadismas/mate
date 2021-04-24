import React, {useState} from 'react';
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

export const PostActions = ({post}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDelDialog, setOpenDelDialog] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

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
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={() => setOpenDelDialog(true)}>Delete</MenuItem>
        </Menu>
        <Dialog
          open={openDelDialog}
          onClose={() => setOpenDelDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this post?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once you delete this post there is no restoring it.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDelDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog> 
        </React.Fragment>
    );
}