import { createAsyncThunk } from "@reduxjs/toolkit";
import { WallboardServices } from "./Service";


export const GET_WAIT_CALL = createAsyncThunk(
    "wallboard/getWaitCall",
    async (_, { rejectWithValue }) => {
        try {
            const response = await WallboardServices.getWaitCall()
            console.log(JSON.parse(response));
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);


export const Get_Main_Screen_StatsV1 = createAsyncThunk(
    "wallboard/getMainScreenStatsV1",
    async (_, { rejectWithValue }) => {
        try {
            const response = await WallboardServices.getMainScreenStatsV1()
            console.log(JSON.parse(response));
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const Get_Main_Screen_StatsV2 = createAsyncThunk(
    "wallboard/getMainScreenStatsV2",
    async (_, { rejectWithValue }) => {
        try {
            const response = await WallboardServices.getMainScreenStatsV2()
            console.log(JSON.parse(response));
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
export const Get_Slider_Stat = createAsyncThunk(
    "wallboard/getSliderStat",
    async (_, { rejectWithValue }) => {
        try {
            const response = await WallboardServices.getSliderStat()
            console.log(JSON.parse(response));
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const GET_TABLE_KHI_LHR = createAsyncThunk(
    "wallboard/getTableKhiLhr",
    async (_, { rejectWithValue }) => {
        try {
            const response = await WallboardServices.getTableKHILHR()
            console.log(JSON.parse(response));
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const GET_TABLE_KHI = createAsyncThunk(
    "wallboard/getTableKHI",
    async (_, { rejectWithValue }) => {
        try {
            const response = await WallboardServices.getTableKHI()
            console.log(JSON.parse(response));
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
export const GET_KARACHI_TABLE_DATA = createAsyncThunk(
    "wallboard/getKarachiTableData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await WallboardServices.getTableKHI()
            console.log(JSON.parse(response));
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const GET_SUPERVISOR_DATA = createAsyncThunk(
    "wallboard/getTableKHI",
    async (_, { rejectWithValue }) => {
        try {
            const response = await WallboardServices.getSupervisorData()
            console.log(JSON.parse(response));
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
