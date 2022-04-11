// import {createAsyncThunk} from "@reduxjs/toolkit";
// import { wallBoardServices } from "./wallBoardServices";


// export const GET_ALL_USER = createAsyncThunk(
//     "timeZone/getAllUser",
//     async (_, {rejectWithValue}) => {
//         try {
//             const response = await wallBoardServices.getAllUser();
//             console.log(JSON.parse(response));
//             return JSON.parse(response);
//         } catch (e) {
//             return rejectWithValue(e.response.data);
//         }
//     }
// );

// export const DELETE_USER = createAsyncThunk(
//     "timeZone/deleteUser",
//     async (id, {rejectWithValue}) => {
//         try {
//             const response = await wallBoardServices.deleteUser(id);
//             console.log(JSON.parse(response));
//             return JSON.parse(response);
//         } catch (e) {
//             return rejectWithValue(e.response.data);
//         }
//     }
// );

// export const CREATE_USER = createAsyncThunk(
//     "timeZone/createUser",
//     async (data, {rejectWithValue}) => {
//         try {
//             const response = await wallBoardServices.createUser(data);
//             console.log(JSON.parse(response));
//             return JSON.parse(response);
//         } catch (e) {
//             return rejectWithValue(e.response.data);
//         }
//     }
// );