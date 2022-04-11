import { createSlice } from "@reduxjs/toolkit";
import { USER_LOGIN } from "../utils/Userservice/Api";

export const UserSlice = createSlice({
    name: 'userSlice',
    initialState: {
        loginUser: null,
        inProgress: true
    },

    reducers: {
        setUser: (state, { payload }) => {
            state.loginUser = payload;
        },
        logOutUser: (state, { payload }) => {
            state.loginUser = null;
        },

    },
    extraReducers: {
        [USER_LOGIN.pending]: (state, { payload }) => {
            state.inProgress = true
        },
        [USER_LOGIN.fulfilled]: (state, { payload }) => {
            state.inProgress = false
            state.loginUser = payload.data
        }
    }

})

export const { setUser, logOutUser } = UserSlice.actions;
export default UserSlice.reducer;