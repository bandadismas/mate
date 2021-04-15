import React from 'react';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import {likePost} from './postsSlice';

export const LikeButton = ({post}) => {
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
        }
    }

    let content;

    const includes = post.likes.includes(user.currentUser._id);

    if (includes) {
        content = <ThumbUpIcon />
    } else {
        content = <ThumbUpOutlinedIcon />
    }

    return(
        <button onClick={handleClick}>{content}</button>
    );
}
