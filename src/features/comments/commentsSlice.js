import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  comments: [],
  status: 'idle',
  error: null
}

export const createComment = createAsyncThunk('comments/createComment', async (data) => {
  console.log('commenting on a post');

  const {id, comment, headers} = data;

  const response = await axios.post(
    `http://localhost:4000/comment/${id}`,
     {body:comment}, {headers});
  console.log(response);
  return response.data;
});

export const likeComment = createAsyncThunk('comments/likeComment', async (data) => {
  console.log('liking comment');

  const {id, headers} = data;
  console.log(headers);

  const response = await axios.patch(
    `http://localhost:4000/likeComment/${id}`,
     {body:"please"}, {headers});
  console.log(response);
  return response.data;
});

export const dislikeComment = createAsyncThunk('comments/dislikeComment', async (data) => {
  console.log('disliking comment');

  const {id, headers} = data;
  console.log(headers);

  const response = await axios.patch(
    `http://localhost:4000/dislikeComment/${id}`,
     {body:"please"}, {headers});
  console.log(response);
  return response.data;
});

export const fetchComments = createAsyncThunk('comments/fetchComments', async (data) => {
  console.log('fetching comments...');

  const {postId} = data;

  const response = await axios.get(
    `http://localhost:4000/fetchComments/${postId}`,
     );
  console.log(response);
  return response.data;
})

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: {
      [createComment.fulfilled]: (state, action) => {
        console.log(action.payload)
        state.comments.push(action.payload.comment);
      },
      [fetchComments.fulfilled]: (state, action) => {
        // Add any fetched comments to the array
        console.log('payload: ',action.payload);
       
        state.comments = action.payload;
      },
      [likeComment.fulfilled]: (state, action) => {
        console.log(action.payload)
        const { _id } = action.payload
        const existingComment = state.comments.find(comment => comment._id === _id);
        if (existingComment) {
          existingComment.likes = action.payload.likes;
          existingComment.dislikes = action.payload.dislikes;
        }
      },
      [dislikeComment.fulfilled]: (state, action) => {
        console.log(action.payload);
        const { _id } = action.payload;
        const existingComment = state.comments.find(comment => comment._id === _id);
        if (existingComment) {
          existingComment.likes = action.payload.likes;
          existingComment.dislikes = action.payload.dislikes;
        }
      }
    }   
  });
  
  export default commentsSlice.reducer;

  export const selectCommentByPost = (state, postId) => 
    state.comments.comments.find(comment => comment.post===postId);