import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  comments: [],
}

export const createComment = createAsyncThunk('comments/createComment', async (data) => {
  console.log('commenting on a post');

  const {id, comment, headers} = data;

  const response = await axios.post(
    `http://localhost:4000/comment/${id}`,
     {body:comment}, {headers});
  console.log(response);
  return response.data
})

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: {
      [createComment.fulfilled]: (state, action) => {
        console.log(action.payload)
        state.comments.push(action.payload.comment);

        const { _id } = action.payload.post
        let existingPost = state.posts.find(post => post._id === _id)
        if (existingPost) {
          existingPost.comments = action.payload.post.comments;
        }
      }
    }   
  })
  
  export default commentsSlice.reducer;
  