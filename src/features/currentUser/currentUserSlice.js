import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  currentUser: {},
  token: '',
  error: null,
  status: 'idle',
};

export const signin = createAsyncThunk(
    'currentUser/signin', 
    async user => {
    console.log('Signing in...');
    const response = await axios.post('http://localhost:4000/login', user);
    console.log(response);
  return response.data;
})

export const signup = createAsyncThunk(
  'currentUser/signup', 
  async user => {
  console.log('Signing up...');
  const response = await axios.post('http://localhost:4000/signup', user);
  console.log(response);
return response.data;
})

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
      signOut(state, action) {
        console.log('In sign out reducer');

        const {id} = action.payload;

        console.log('id: ', id)
      }
    },
    extraReducers: {
      [signin.pending]: (state, action) => {
        state.status = 'loading';
      },
      [signin.fulfilled]: (state, action) => {
        state.currentUser = action.payload.result;
        state.token = action.payload.token;
      },
      [signin.rejected]: (state, action) => {
        console.log(action.error);

        state.status = 'failed';
        state.error = action.error.message;
      },
      [signup.pending]: (state, action) => {
        state.status = 'loading';
      },
      [signup.fulfilled]: (state, action) => {
        state.status = 'success';
      },
      [signup.rejected]: (state, action) => {
        console.log(action.error);

        state.status = 'failed';
        state.error = action.error.message;
      }
    }   
  })
  
  export default currentUserSlice.reducer;

  export const {signOut} = currentUserSlice.actions;
  