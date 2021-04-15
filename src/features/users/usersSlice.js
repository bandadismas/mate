import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:4000/users');
  console.log(response);
  return response.data;
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      return action.payload
    },
    [fetchUsers.rejected]: (state, action) => {
      console.log(action.error);
    }
  }
});

export default usersSlice.reducer;


export const selectAllUsers = state => state.users;

export const selectUserById = (state, userId) =>
  state.users.find(user => user._id === userId);