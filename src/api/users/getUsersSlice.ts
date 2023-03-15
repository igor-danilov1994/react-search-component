import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'types';
import { getUsers } from "./getUsersThunk";

interface Users {
  users: User[],
  loading: boolean,
  error?: string
}

const initialState: Users = {
  users: [],
  loading: false,
  error: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    deleteUser: (state, action: PayloadAction<number>) => {
      const id = action.payload
      state.users = state.users.filter((user) => user.id !== id)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(getUsers.fulfilled, (state, action) => {
      if (action.payload){
        state.users = action.payload
      }
      state.loading = false
      state.error = undefined
    })
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false
      state.error = 'error'
    })
  }
})


// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
