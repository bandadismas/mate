import React from 'react';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import {dislikeComment} from './commentsSlice';

export const DislikeButton = ({comment}) => {
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
                    dislikeComment({id:comment._id, headers:headers})
                );
                console.log('results: ', resultAction);
                unwrapResult(resultAction);
                
              } catch (err) {
                console.error('Failed to dislike comment: ', err);
              } 
        }
    }

    let content;

    const includes = comment.dislikes.includes(user.currentUser._id);

    if (includes) {
        content = <ThumbDownIcon/>
    } else {
        content = <ThumbDownOutlinedIcon />
    }

    return(
        <Button onClick={handleClick}>{content}</Button>
    );
}

