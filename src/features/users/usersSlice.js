import { 
  createSlice, 
  createAsyncThunk, 
  createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const usersAdapter = createEntityAdapter({
  selectId: (user) => user._id
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:4000/users');
  console.log(response);
  return response.data;
})

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      return action.payload
    },
    [fetchUsers.rejected]: usersAdapter.setAll
  }
});

export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors(state => state.users)