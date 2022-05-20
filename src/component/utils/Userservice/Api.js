import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserServices } from "./Service";


export const CREATE_USER = createAsyncThunk(
    "user/createUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await UserServices.createUser(data);
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const GET_ALL_USER = createAsyncThunk(
    "user/getAllUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await UserServices.getAllUser();
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const DELETE_USER = createAsyncThunk(
    "user/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await UserServices.deleteUser(id);
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const UPDATE_USER = createAsyncThunk(
    "user/updateUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await UserServices.updateUser(data);
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const USER_LOGIN = createAsyncThunk(
    "user/userLogin",
    async (data, { rejectWithValue }) => {
        try {
            const response = await UserServices.loginUser(data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

