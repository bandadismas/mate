import React from 'react';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import {dislikePost} from './postsSlice';

export const DislikeButton = ({post}) => {
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
        }
    }

    let content;

    const includes = post.dislikes.includes(user.currentUser._id);

    if (includes) {
        content = <ThumbDownIcon/>
    } else {
        content = <ThumbDownOutlinedIcon />
    }

    return(
        <button onClick={handleClick}>{content}</button>
    );
}

