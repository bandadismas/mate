import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  currentUser: {},
  token: '',
  error: null
};

export const signin = createAsyncThunk(
    'currentUser/signin', 
    async user => {
    console.log('Signining...');
    const response = await axios.post('http://localhost:4000/login', user);
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
      [signin.fulfilled]: (state, action) => {
        state.currentUser = action.payload.result;
        state.token = action.payload.token;
      },
      [signin.rejected]: (state, action) => {
        console.log(action.error);

        state.error = action.error.message;
      }
    }   
  })
  
  export default currentUserSlice.reducer;

  export const {signOut} = currentUserSlice.actions;
  