import React, {useState} from 'react';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import {likeComment} from './commentsSlice';

export const LikeButton = ({comment}) => {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(state => state.currentUser);

    let headers = {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
        };
    
    let content;

    const includes = comment.likes.includes(user.currentUser._id) && user.loggedIn;

    const handleClick = async () => {
        if (user.loggedIn) {
            try {
                const resultAction = await dispatch(
                    likeComment({id:comment._id, headers:headers})
                );
                console.log('results: ', resultAction);
                unwrapResult(resultAction);
                
              } catch (err) {
                console.error('Failed to like comment: ', err);
              } 
        } else {
            setOpen(true);
        }
    }

    const handleTooltipClose = () => {
        setOpen(false);
    };    

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
                title="You must be signed in order to like a comment"
              >
                <Button onClick={handleClick}>{content}</Button>
              </Tooltip>
            </span>
          </ClickAwayListener>
    );
}
