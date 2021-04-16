import React, {useState} from 'react';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import {dislikePost} from './postsSlice';

export const DislikeButton = ({post}) => {
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
                    dislikePost({id:post._id, headers:headers})
                );
                console.log('results: ', resultAction);
                unwrapResult(resultAction);
                
              } catch (err) {
                console.error('Failed to dislike post: ', err);
              } 
        } else {
            setOpen(true);
        }
    }

    const handleTooltipClose = () => {
        setOpen(false);
      };

    let content;

    const includes = post.dislikes.includes(user.currentUser._id);

    if (includes) {
        content = <ThumbDownIcon/>
    } else {
        content = <ThumbDownOutlinedIcon />
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
                title="You must be signed in in order to dislike a post"
              >
                <Button onClick={handleClick}>{content}</Button>
              </Tooltip>
            </span>
          </ClickAwayListener>
    );
}

