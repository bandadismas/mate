import React from 'react';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import Button from '@material-ui/core/Button';

import {likeComment} from './commentsSlice';

export const LikeButton = ({comment}) => {
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
                    likeComment({id:comment._id, headers:headers})
                );
                console.log('results: ', resultAction);
                unwrapResult(resultAction);
                
              } catch (err) {
                console.error('Failed to like comment: ', err);
              } 
        }
    }

    let content;

    const includes = comment.likes.includes(user.currentUser._id);

    if (includes) {
        content = <ThumbUpIcon />
    } else {
        content = <ThumbUpOutlinedIcon />
    }

    return(
        <Button 
            
            onClick={handleClick}>
                {content}
        </Button>
    );
}
