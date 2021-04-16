import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  status: 'idle',
  error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  console.log('fetching posts');
  const response = await axios.get('http://localhost:4000/');
  console.log(response);
  return response.data;
});

export const fetchPost = createAsyncThunk('posts/fetchPost', async (data) => {
  console.log('fetching post');

  const {postId} = data;
  const response = await axios.get(`http://localhost:4000/getPost/${postId}`);
  console.log(response);
  return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (data) => {
  console.log('creating posts');

  const {body, headers} = data;
  console.log(headers);

  const response = await axios.post(
    'http://localhost:4000/createPost',
    {body}, {headers});
  console.log(response);
  return response.data;
})

export const likePost = createAsyncThunk('posts/likePost', async (data) => {
  console.log('liking post');

  const {id, headers} = data;

  const response = await axios.patch(
    `http://localhost:4000/likePost/${id}`,
     {body:"please"}, {headers});
  console.log(response);
  return response.data;
})

export const dislikePost = createAsyncThunk('posts/dislikePost', async (data) => {
  console.log('disliking post');

  const {id, headers} = data;

  const response = await axios.patch(
    `http://localhost:4000/dislikePost/${id}`,
     {body:"please"}, {headers});
  console.log(response);
  return response.data;
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

        state.error = action.error.message;
      },
      [fetchPost.fulfilled]: (state, action) => {
        console.log(action.payload);

        const { _id } = action.payload;

        let existingPost = state.posts.find(post => post._id === _id);
        if (existingPost) {
          existingPost.comments = action.payload.comments;
        }
      },
      [createPost.fulfilled]: (state, action) => {
        state.posts.push(action.payload);
      },
      [likePost.fulfilled]: (state, action) => {
        console.log(action.payload);
        const { _id } = action.payload;
        const existingPost = state.posts.find(post => post._id === _id);
        if (existingPost) {
          existingPost.likes = action.payload.likes;
          existingPost.dislikes = action.payload.dislikes;
        }
      },
      [dislikePost.fulfilled]: (state, action) => {
        console.log(action.payload);
        const { _id } = action.payload;
        const existingPost = state.posts.find(post => post._id === _id);
        if (existingPost) {
          existingPost.dislikes = action.payload.dislikes;
          existingPost.likes = action.payload.likes;
        }
      }
    }   
  })
  
  export default postsSlice.reducer;
  
  export const selectAllPosts = state => state.posts.posts
  
  export const selectPostById = (state, postId) =>
    state.posts.posts.find(post => post._id === postId);