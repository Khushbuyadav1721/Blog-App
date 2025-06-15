import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ NEW: Update only the profilePicture of currentUser
    updateUserProfilePicture: (state, action) => {
      if (state.currentUser) {
        state.currentUser.profilePicture = action.payload;
      }
    },
  },
});

export const {
  signInStart,
  signInFailure,
  signInSuccess,
  updateUserProfilePicture, // export the new action
} = userSlice.actions;

export default userSlice.reducer;
