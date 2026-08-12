import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState, 
    reducers: {
        signInstart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInsuccess: (state, action) => {
            state.loading = false;  
            state.currentUser = action.payload;
        },
        signInfailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearError: (state) => {
             state.error = null;
       },
       signOut: (state) => {
         state.currentUser = null;
       },
           // Update account
        updateUser: (state, action) => {
          state.currentUser = action.payload;
        },
    },
})

export const { signInstart,signInfailure,signInsuccess,clearError,signOut,updateUser } = userSlice.actions
export default userSlice.reducer