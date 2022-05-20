import { createAsyncThunk } from "@reduxjs/toolkit";
import { WallboardServices } from "./Service";

//new supervisors screen agent api. replace of getliloData

//get All supervisores api
export const GET_ALL_SUPERVISORS_10Mins = createAsyncThunk(
    "wallboard/getAllSupervisors10Min",
    async (_, { rejectWithValue }) => {
        try {
            const response = await WallboardServices.GetAllSupervisor10Min()
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

//get All supervisores api
export const GET_ALL_SUPERVISORS = createAsyncThunk(
    "wallboard/getAllSupervisors",
    async (_, { rejectWithValue }) => {
        try {
            const response = await WallboardServices.GetAllSupervisor()
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

//get All karachi supervisores api
export const GET_ALL_KHI_SUPERVISORS = createAsyncThunk(
    "wallboard/getAllKHISupervisors",
    async (_, { rejectWithValue }) => {
        try {
            const response = await WallboardServices.GetAllKHISupervisor()
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

//get All lahore supervisores api
export const GET_ALL_LHR_SUPERVISORS = createAsyncThunk(
    "wallboard/getAllLHRSupervisors",
    async (_, { rejectWithValue }) => {
        try {
            const response = await WallboardServices.GetAllLHRSupervisor()
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);


export const GET_WAIT_CALL = createAsyncThunk(
    "wallboard/getWaitCall",
    async (_, { rejectWithValue }) => {
        try {
            const response = await WallboardServices.getWaitCall()
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
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
export const GET_MTDSL_SERVICES = createAsyncThunk(
    "wallboard/getMTDSLService",
    async (_, { rejectWithValue }) => {
        try {
            const response = await WallboardServices.GetMTDService()
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
export const GET_AHT_SERVICES = createAsyncThunk(
    "wallboard/getAHTServices",
    async (_, { rejectWithValue }) => {
        try {
            const response = await WallboardServices.GETAHTSERVICE()
            return JSON.parse(response);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

