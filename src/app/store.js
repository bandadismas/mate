import { configureStore } from '@reduxjs/toolkit';

import postsReducer from '../features/posts/postsSlice'
import currentUserSlice from '../features/currentUser/currentUserSlice'
import usersSlice from '../features/users/usersSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    currentUser: currentUserSlice,
    users: usersSlice
  },
});
