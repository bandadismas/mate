import { 
  createSlice, 
  createAsyncThunk, 
  createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const usersAdapter = createEntityAdapter({
  selectId: (user) => user._id
});

const initialState = usersAdapter.getInitialState();

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
    [fetchUsers.fulfilled]: usersAdapter.setAll,
    [fetchUsers.rejected]: (state, action) => {
      console.log(action.error);
    }
  }
});

export default usersSlice.reducer;

export const { 
  selectAll: selectAllUsers, 
  selectById: selectUserById 
} = usersAdapter.getSelectors(state => state.users)