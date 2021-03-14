import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  console.log('fetching posts');
  const response = await axios.get('http://localhost:4000/');
  console.log(response);
  return response.data
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
      [fetchPosts.pending]: (state, action) => {
        state.status = 'loading'
      },
      [fetchPosts.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload)
      },
      [fetchPosts.rejected]: (state, action) => {
        state.status = 'failed'
    console.log(action.error);

        state.error = action.error.message
      }
    }   
  })
  
  export default postsSlice.reducer;
  
  export const selectAllPosts = state => state.posts.posts
  
  export const selectPostById = (state, postId) =>
    state.posts.posts.find(post => post.id === postId)