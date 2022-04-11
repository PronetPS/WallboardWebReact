import { createSlice } from "@reduxjs/toolkit";
import { Get_Main_Screen_StatsV1, Get_Main_Screen_StatsV2, GET_WAIT_CALL, Get_Slider_Stat, GET_TABLE_KHI_LHR, GET_SUPERVISOR_DATA, GET_KARACHI_TABLE_DATA } from "../../utils/WallboardService/Api";


const initialState = {
    call_wait: null,
    getMainStatsV1: null,
    getMainStatsV2: null,
    getSliderStat: null,
    getTableKHILHR: null,
    getTableKHI: null,
    superVisorTableData: null,
    filterdData: null,
    TotalActiveAgent: null,
    TotalNotReady: null,
    TotalLogOut: null,
    isShowTenMinutes: false

}
export const ManagerdSlice = createSlice({
    name: 'managerdSlice',
    initialState,

    reducers: {
        filterAgents: (state, { payload }) => {
            if (payload === "RY") {
                state.filterdData = state.TotalActiveAgent
            } else if (payload === "NR") {
                state.filterdData = state.TotalNotReady
            } else if (payload === "LO") {
                state.filterdData = state.TotalLogOut
            } else if (payload === "all") {
                state.filterdData = null
            }
        },

        searchTableAgent: (state, { payload }) => {
            state.filterdData = payload
        },
        handleIsTenMinutes: (state, { payload }) => {
            state.isShowTenMinutes = payload
        },
        updateTotalAgent: (state, { payload }) => {
            state.filterdData = payload
        },

        clearSupervisorData: (state, { payload }) => {
            state.superVisorTableData = null
            state.filterdData = null
            state.TotalActiveAgent = null
            state.TotalNotReady = null
            state.TotalLogOut = null
        }

    },
    extraReducers: {
        [GET_WAIT_CALL.pending]: (state, { payload }) => {
            // state.isProcess = true;
        },
        [GET_WAIT_CALL.fulfilled]: (state, { payload }) => {
            state.call_wait = payload?.data[0]
        },
        [GET_WAIT_CALL.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },
        [Get_Main_Screen_StatsV1.pending]: (state, { payload }) => {
            // state.isProcess = true;
        },
        [Get_Main_Screen_StatsV1.fulfilled]: (state, { payload }) => {
            state.getMainStatsV1 = payload?.data[0]
        },
        [Get_Main_Screen_StatsV1.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },
        [Get_Main_Screen_StatsV2.pending]: (state, { payload }) => {
            // state.isProcess = true;
        },
        [Get_Main_Screen_StatsV2.fulfilled]: (state, { payload }) => {
            state.getMainStatsV2 = payload.data
        },
        [Get_Main_Screen_StatsV2.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },
        [Get_Slider_Stat.pending]: (state, { payload }) => {
            // state.isProcess = true;
        },
        [Get_Slider_Stat.fulfilled]: (state, { payload }) => {
            state.getSliderStat = payload.data
        },
        [Get_Slider_Stat.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },
        [GET_TABLE_KHI_LHR.pending]: (state, { payload }) => {
            // state.isProcess = true;
        },
        [GET_TABLE_KHI_LHR.fulfilled]: (state, { payload }) => {
            state.getTableKHILHR = payload.data
        },
        [GET_TABLE_KHI_LHR.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },

        [GET_SUPERVISOR_DATA.pending]: (state, { payload }) => {
            // state.isProcess = true;
        },
        [GET_SUPERVISOR_DATA.fulfilled]: (state, { payload }) => {

            const arr_main = payload?.data;

            var arr = arr_main;
            const ids = arr?.map(o => o.AgentLogin)
            const filtered = arr?.filter(({ AgentLogin }, index) => !ids.includes(AgentLogin, index + 1))
            const final_data = filtered?.reverse()
            console.log(filtered?.reverse())
            state.superVisorTableData = final_data
            state.TotalActiveAgent = final_data.filter(item => item.EventType === "RY")
            state.TotalNotReady = final_data.filter(item => item.EventType === "NR")
            state.TotalLogOut = final_data.filter(item => item.EventType === "LO")
        },
        [GET_SUPERVISOR_DATA.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },
        [GET_KARACHI_TABLE_DATA.pending]: (state, { payload }) => {
            // state.isProcess = true;
        },
        [GET_KARACHI_TABLE_DATA.fulfilled]: (state, { payload }) => {
            state.getTableKHI = payload.data
        },
        [GET_KARACHI_TABLE_DATA.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },
    }
})

export const { filterAgents, searchTableAgent, handleIsTenMinutes, updateTotalAgent, clearSupervisorData } = ManagerdSlice.actions;
export default ManagerdSlice.reducer;