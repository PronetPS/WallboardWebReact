import { createSlice } from "@reduxjs/toolkit";
import {
    Get_Main_Screen_StatsV1, Get_Main_Screen_StatsV2, GET_WAIT_CALL, Get_Slider_Stat,
    GET_TABLE_KHI_LHR, GET_SUPERVISOR_DATA, GET_KARACHI_TABLE_DATA, GET_MTDSL_SERVICES,
    GET_AHT_SERVICES,
    GET_ALL_SUPERVISORS,
    GET_ALL_LHR_SUPERVISORS,
    GET_ALL_KHI_SUPERVISORS,
    GET_ALL_SUPERVISORS_10Mins,
} from "../../utils/WallboardService/Api";


const initialState = {
    call_wait: null,
    getMainStatsV1: null,
    getMainStatsV2: null,
    getSliderStat: null,
    getTableKHILHR: null,
    getTableKHI: null,
    superVisorTableData: null,
    filterdData: [],
    TotalActiveAgent: null,
    TotalNotReady: null,
    TotalLogOut: null,
    isShowTenMinutes: false,
    MTDSL: null,
    AHTData: null,
    ALL_Supervisors: null, // Supervisors drop down khi and lahore supervisors.
    ALL_KARACHI_AGENT: null,
    ALL_LAHORE_AGENT: null,
    filterDeparmentID: "all",
    tenMintLogoutAgent: null,
    StateWiseData: null,
    selectedSuperVisorState: [],
    saveSearchInputValue: ""
}
export const ManagerdSlice = createSlice({
    name: 'managerdSlice',
    initialState,

    reducers: {
        saveSearchInput: (state, { payload }) => {
            state.saveSearchInputValue = payload;
        },
        filterByDepartment: (state, { payload }) => {
            state.saveSearchInputValue = "";
            if (payload === 'all') {
                state.filterdData = null
                state.filterDeparmentID = "all"
            } else if (payload === "karachi") {
                state.filterdData = state.ALL_KARACHI_AGENT
                state.filterDeparmentID = "karachi"
            } else if (payload === "lahore") {
                state.filterdData = state.ALL_LAHORE_AGENT
                state.filterDeparmentID = "lahore"
            }
        },
        filterAgents: (state, { payload }) => {
            state.saveSearchInputValue = "";
            state.StateWiseData = null
            state.filterdData = null
            if (payload === "RY") {
                if (state.filterDeparmentID === "karachi") {
                    state.filterdData = state.ALL_KARACHI_AGENT.filter(item => item.STATE === "IDLE ")
                    state.StateWiseData = state.ALL_KARACHI_AGENT.filter(item => item.STATE === "IDLE ")

                } else if (state.filterDeparmentID === "lahore") {
                    state.filterdData = state.ALL_LAHORE_AGENT.filter(item => item.STATE === "IDLE ")
                    state.StateWiseData = state.ALL_LAHORE_AGENT.filter(item => item.STATE === "IDLE ")

                } else if (state.filterDeparmentID === "all") {
                    state.filterdData = state.TotalActiveAgent
                    state.StateWiseData = state.TotalActiveAgent

                }

            } else if (payload === "NR") {
                if (state.filterDeparmentID === "karachi") {
                    state.filterdData = state.ALL_KARACHI_AGENT.filter(item => item.STATE === "NOTRDY ")
                    state.StateWiseData = state.ALL_KARACHI_AGENT.filter(item => item.STATE === "NOTRDY ")

                } else if (state.filterDeparmentID === "lahore") {
                    state.filterdData = state.ALL_LAHORE_AGENT.filter(item => item.STATE === "NOTRDY ")
                    state.StateWiseData = state.ALL_LAHORE_AGENT.filter(item => item.STATE === "NOTRDY ")

                } else if (state.filterDeparmentID === "all") {
                    state.filterdData = state.TotalNotReady
                    state.StateWiseData = state.TotalNotReady

                }


            } else if (payload === "LO") {
                if (state.filterDeparmentID === "karachi") {
                    state.filterdData = state.ALL_KARACHI_AGENT.filter(item => item.STATE === "Logout")
                    state.StateWiseData = state.ALL_KARACHI_AGENT.filter(item => item.STATE === "Logout")

                } else if (state.filterDeparmentID === "lahore") {
                    state.filterdData = state.ALL_LAHORE_AGENT.filter(item => item.STATE === "Logout")
                    state.StateWiseData = state.ALL_LAHORE_AGENT.filter(item => item.STATE === "Logout")

                } else if (state.filterDeparmentID === "all") {
                    state.filterdData = state.TotalLogOut
                    state.StateWiseData = state.TotalLogOut

                }

            } else if (payload === "all") {
                if (state.filterDeparmentID === "karachi") {
                    state.filterdData = state.ALL_KARACHI_AGENT
                    state.StateWiseData = state.ALL_KARACHI_AGENT

                } else if (state.filterDeparmentID === "lahore") {
                    state.filterdData = state.ALL_LAHORE_AGENT
                    state.StateWiseData = state.ALL_LAHORE_AGENT

                } else if (state.filterDeparmentID === "all") {
                    state.filterdData = null
                    state.StateWiseData = state.filterdData
                }

            }
        },
        // filterAgents: (state, { payload }) => {
        //     if (payload === "RY") {
        //         state.filterdData = state.TotalActiveAgent
        //     } else if (payload === "NR") {
        //         state.filterdData = state.TotalNotReady
        //     } else if (payload === "LO") {
        //         state.filterdData = state.TotalLogOut
        //     } else if (payload === "all") {
        //         state.filterdData = null
        //     }
        // },

        searchTableAgent: (state, { payload }) => {
            state.filterdData = payload
        },
        handleIsTenMinutes: (state, { payload }) => {
            state.isShowTenMinutes = payload
        },
        updateTotalAgent: (state, { payload }) => {
            state.filterdData = payload
        },

        selectedSuperVisor: (state, { payload }) => {
            state.selectedSuperVisorState = payload
        },

        clearSelectedSuperVisor: (state, { payload }) => {
            state.selectedSuperVisorState = []
        },

        clearSupervisorFilterData: (state, { payload }) => {
            if (state.filterDeparmentID === "karachi") {
                state.superVisorTableData = state.ALL_KARACHI_AGENT;
                state.filterdData = null
            } else if (state.filterDeparmentID === "lahore") {
                state.superVisorTableData = state.ALL_LAHORE_AGENT;
                state.filterdData = null
            } else if (state.filterDeparmentID === "all") {
                state.superVisorTableData = state.superVisorTableData;
                state.filterdData = null
            }

            state.selectedSuperVisorState = []
        },

        clearSupervisorData: (state, { payload }) => {
            state.superVisorTableData = null
            state.filterdData = null
            state.TotalActiveAgent = null
            state.TotalNotReady = null
            state.TotalLogOut = null
            state.ALL_Supervisors = null
            state.ALL_KARACHI_AGENT = null
            state.ALL_LAHORE_AGENT = null
            state.AHTData = null
            state.getMainStatsV1 = null
            state.getMainStatsV2 = null
            state.getSliderStat = null
            state.getTableKHI = null
            state.getTableKHILHR = null
            state.call_wait = null
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
            if (payload.status) {
                state.getMainStatsV1 = payload?.data[0]
            }

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
            if (payload.status) {
                state.getSliderStat = payload.data
            }
        },
        [Get_Slider_Stat.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },
        [GET_TABLE_KHI_LHR.pending]: (state, { payload }) => {
            // state.isProcess = true;
        },
        [GET_TABLE_KHI_LHR.fulfilled]: (state, { payload }) => {
            if (payload.status) {
                state.getTableKHILHR = payload.data
            }
        },
        [GET_TABLE_KHI_LHR.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },
        [GET_SUPERVISOR_DATA.pending]: (state, { payload }) => {
            // state.isProcess = true;
        },
        [GET_SUPERVISOR_DATA.fulfilled]: (state, { payload }) => {
            if (payload.status) {
                const final_data = payload?.data
                state.superVisorTableData = final_data
                state.ALL_KARACHI_AGENT = final_data.filter(item => item.Department === "Karachi") //for deparment filter
                state.ALL_LAHORE_AGENT = final_data.filter(item => item.Department === "Lahore") //for deparment filter

                state.TotalActiveAgent = final_data.filter(item => item.STATE === "IDLE ") //for agents state filter
                state.TotalNotReady = final_data.filter(item => item.STATE === "NOTRDY ") //for agents state filter
                state.TotalLogOut = final_data.filter(item => item.STATE === "Logout") //for agents state filter

                // const arr_main = payload?.data;
                // var arr = arr_main;
                // const ids = arr?.map(o => o.AgentLogin)
                // const filtered = arr?.filter(({ AgentLogin }, index) => !ids.includes(AgentLogin, index + 1))
                // const final_data = filtered?.reverse()
                // state.superVisorTableData = final_data
                // state.TotalActiveAgent = final_data.filter(item => item.EventType === "RY")
                // state.TotalNotReady = final_data.filter(item => item.EventType === "NR")
                // state.TotalLogOut = final_data.filter(item => item.EventType === "LO")
            }

        },
        [GET_SUPERVISOR_DATA.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },
        [GET_KARACHI_TABLE_DATA.pending]: (state, { payload }) => {
            // state.isProcess = true;
        },
        [GET_KARACHI_TABLE_DATA.fulfilled]: (state, { payload }) => {
            if (payload.status) {
                state.getTableKHI = payload.data
            }
        },
        [GET_KARACHI_TABLE_DATA.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },
        [GET_MTDSL_SERVICES.pending]: (state, { payload }) => {
            // state.isProcess = true;
        },
        [GET_MTDSL_SERVICES.fulfilled]: (state, { payload }) => {
            if (payload.status) {
                state.MTDSL = payload.data
            }
        },
        [GET_MTDSL_SERVICES.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },
        [GET_AHT_SERVICES.pending]: (state, { payload }) => {
            // state.isProcess = true;
        },
        [GET_AHT_SERVICES.fulfilled]: (state, { payload }) => {
            if (payload.status) {
                state.AHTData = payload.data //recied just data of array
            }
        },
        [GET_AHT_SERVICES.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },
        [GET_ALL_SUPERVISORS.pending]: (state, { payload }) => {
            // state.isProcess = true;
        },
        [GET_ALL_SUPERVISORS.fulfilled]: (state, { payload }) => {
            if (payload.status) {
                state.ALL_Supervisors = payload.data //recied just data of array
            }
        },
        [GET_ALL_SUPERVISORS.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },
        [GET_ALL_KHI_SUPERVISORS.pending]: (state, { payload }) => {
            // state.isProcess = true;
        },
        [GET_ALL_KHI_SUPERVISORS.fulfilled]: (state, { payload }) => {
            if (payload.status) {
                state.ALL_Supervisors = payload.data //recied just data of array
            }
        },
        [GET_ALL_KHI_SUPERVISORS.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },
        [GET_ALL_LHR_SUPERVISORS.pending]: (state, { payload }) => {
            // state.isProcess = true;
        },
        [GET_ALL_LHR_SUPERVISORS.fulfilled]: (state, { payload }) => {
            if (payload.status) {
                state.ALL_Supervisors = payload.data //recied just data of array
            }
        },
        [GET_ALL_LHR_SUPERVISORS.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },
        [GET_ALL_SUPERVISORS_10Mins.pending]: (state, { payload }) => {
            // state.isProcess = true;
        },
        [GET_ALL_SUPERVISORS_10Mins.fulfilled]: (state, { payload }) => {
            if (payload.status) {
                if (state.filterDeparmentID === "karachi") {
                    state.filterdData = payload.data.filter(item => item.Department === "Karachi")
                } else if (state.filterDeparmentID === "lahore") {
                    state.filterdData = payload.data.filter(item => item.Department === "Lahore")
                } else if (state.filterDeparmentID === "all") {
                    state.filterdData = payload.data
                    state.tenMintLogoutAgent = payload.data
                }
            }
        },
        [GET_ALL_SUPERVISORS_10Mins.rejected]: (state, { payload }) => {
            // state.isProcess = false;
        },

    }
})

export const { filterAgents, searchTableAgent, handleIsTenMinutes, updateTotalAgent,
    clearSupervisorData, filterByDepartment, clearSupervisorFilterData, selectedSuperVisor, clearSelectedSuperVisor,
    saveSearchInput } = ManagerdSlice.actions;
export default ManagerdSlice.reducer;