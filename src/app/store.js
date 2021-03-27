import { configureStore } from '@reduxjs/toolkit';

import postsReducer from '../features/posts/postsSlice'
import currentUserSlice from '../features/currentUser/currentUserSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    currentUser: currentUserSlice
  },
});
