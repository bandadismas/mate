import React, {useState} from 'react';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import {likePost} from './postsSlice';

export const LikeButton = ({post}) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.currentUser);

    let headers = {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
        };

    const handleClick = async () => {
        if (Object.keys(user.currentUser).length!==0) {
            try {
                const resultAction = await dispatch(
                    likePost({id:post._id, headers:headers})
                );
                console.log('results: ', resultAction);
                unwrapResult(resultAction);
                
              } catch (err) {
                console.error('Failed to like post: ', err);
              } 
        } else {
            setOpen(true);
        }
    }

    const handleTooltipClose = () => {
        setOpen(false);
      };

    let content;

    const includes = post.likes.includes(user.currentUser._id);

    if (includes) {
        content = <ThumbUpIcon />
    } else {
        content = <ThumbUpOutlinedIcon />
    }

    return(
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <span className="mr-2">
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="You must be signed in in order to like a post"
              >
                <Button onClick={handleClick}>{content}</Button>
              </Tooltip>
            </span>
          </ClickAwayListener>
        
    );
}
