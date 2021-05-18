import { 
  createSlice, 
  createAsyncThunk,
  createEntityAdapter,
  createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment._id
});

const initialState = commentsAdapter.getInitialState({
  status: 'idle',
  error: null
});

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
    `http://localhost:4000/fetchComments/${postId}`
     );
  console.log(response);
  return response.data;
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (data) => {
  console.log('deleting comment');

  const {id, headers} = data;

  const response = await axios.delete(
    `http://localhost:4000/deleteComment/${id}`,
    {headers}
     );
  console.log(response);
  return response.data;
});

export const editComment = createAsyncThunk('comments/editComment', async (data) => {
  console.log('editing comment');

  const {id, headers, commentValue} = data;

  const response = await axios.patch(
    `http://localhost:4000/editComment/${id}`,
    {body:commentValue}, {headers}
     );
  console.log(response);
  return response.data;
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: {
      [createComment.fulfilled]: commentsAdapter.addOne,
      [fetchComments.fulfilled]: (state, action) => {
        console.log('payload: ',action.payload);

       // Add any fetched comments to the array
       commentsAdapter.upsertMany(state, action.payload);
      },
      [likeComment.fulfilled]: (state, action) => {
        console.log(action.payload)

        const { _id } = action.payload

        const existingComment = state.entities[_id];

        if (existingComment) {
          existingComment.likes = action.payload.likes;
          existingComment.dislikes = action.payload.dislikes;
        }
      },
      [dislikeComment.fulfilled]: (state, action) => {
        console.log(action.payload);

        const { _id } = action.payload;

        const existingComment = state.entities[_id];
        if (existingComment) {
          existingComment.likes = action.payload.likes;
          existingComment.dislikes = action.payload.dislikes;
        }
      },
      [deleteComment.fulfilled]: (state, action) => {
        console.log('delete fulfilled ', action.payload);

        const {id} = action.payload;

        commentsAdapter.removeOne(state, id);
      },
      [editComment.fulfilled]: (state, action) => {
        console.log(action.payload);

        const { _id } = action.payload;

        let existingComment = state.entities[_id];
        if (existingComment) {
          existingComment.body = action.payload.body;
        }
      }
    }   
  });
  
export default commentsSlice.reducer;

const {
  selectAll: selectAllComments,
  // Pass in a selector that returns the posts slice of state
} = commentsAdapter.getSelectors(state => state.comments);

export const selectCommentsByPost = createSelector(
  [selectAllComments, (state, postId) => postId],
  (comments, postId) => comments.filter(comment => comment.post === postId)
);