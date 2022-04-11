import { createSlice } from "@reduxjs/toolkit";
import { CREATE_USER, GET_ALL_USER, UPDATE_USER } from "../../utils/Userservice/Api";

const initialState = {
    isProcess: false,
    allUser: null,
    userCreatStatus: false
}
export const DashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,

    reducers: {
        createUser: (state, { payload }) => {
            // state.loginUser = payload;
        },
        resetCreateUserProgress: (state, { payload }) => {
            state.userCreatStatus = payload
        },
        clearState: () => initialState,
    },
    extraReducers: {
        [GET_ALL_USER.pending]: (state, { payload }) => {
            state.isProcess = true;
        },
        [GET_ALL_USER.fulfilled]: (state, { payload }) => {
            state.isProcess = false;
            state.allUser = payload.data
        },
        [GET_ALL_USER.rejected]: (state, { payload }) => {
            state.isProcess = false;
        },
        [CREATE_USER.pending]: (state, { payload }) => {
            // state.userCreatStatus = false
        },
        [CREATE_USER.fulfilled]: (state, { payload }) => {
            // state.userCreatStatus = true
        },
        [CREATE_USER.rejected]: (state, { payload }) => {
            // state.userCreatStatus = false
        },
        [UPDATE_USER.pending]: (state, { payload }) => {
            // state.userCreatStatus = false
        },
        [UPDATE_USER.fulfilled]: (state, { payload }) => {
            // state.userCreatStatus = false
        },
        [UPDATE_USER.rejected]: (state, { payload }) => {
            // state.userCreatStatus = false
        },
    }

})

export const { createUser, resetCreateUserProgress, clearState } = DashboardSlice.actions;
export default DashboardSlice.reducer;