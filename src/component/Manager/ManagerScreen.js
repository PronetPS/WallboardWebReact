import React, { useEffect } from 'react';
import AgentStatusCard from './agentStatusCard';
import CallStatusTable from './CallStatusTable';
import StatuTag from "./StatusTag";
import { HiChartPie } from 'react-icons/hi';
import { GiProgression } from 'react-icons/gi';
import { HiPhoneIncoming } from 'react-icons/hi';
import { MdPhoneInTalk } from 'react-icons/md';
import { IoMdClock } from 'react-icons/io';
import { MdQueue } from 'react-icons/md';
import { MdPhoneMissed } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';
import { ImSwitch } from 'react-icons/im';
import { IoTimerSharp } from 'react-icons/io5';
import "./style.css";
import { Layout, Row, Col, Button, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../Reducers/UserSlice';
import { Get_Main_Screen_StatsV1, Get_Main_Screen_StatsV2, GET_WAIT_CALL, Get_Slider_Stat, GET_TABLE_KHI_LHR, GET_KARACHI_TABLE_DATA, GET_SUPERVISOR_DATA } from '../utils/WallboardService/Api';
import { gTime } from '../utils/base';
import { clearSupervisorData, updateTotalAgent } from './store/managerSlice';
const { Text } = Typography;
const { Header, Content } = Layout;

const ManagerScreen = () => {
    const { loginUser } = useSelector(state => state?.UserSlice); //redux toolkit store
    const { getMainStatsV1, getMainStatsV2, call_wait, getSliderStat, TotalLogOut, filterdData } = useSelector(state => state?.ManagerdSlice); //redux toolkit store

    let navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        function getAlerts() {
            dispatch(GET_WAIT_CALL());
            dispatch(Get_Slider_Stat());
            dispatch(Get_Main_Screen_StatsV1());
            dispatch(Get_Main_Screen_StatsV2());
            dispatch(GET_TABLE_KHI_LHR());
            dispatch(GET_KARACHI_TABLE_DATA())
        }
        getAlerts()
        const interval = setInterval(() => getAlerts(), 5000)
        return () => {
            clearInterval(interval);
        }
    }, [])

    useEffect(() => {
        function getAlerts() {
            dispatch(GET_SUPERVISOR_DATA());
        }
        getAlerts()
        const interval = setInterval(() => getAlerts(), 600000 ) //10 mints
        return () => {
            clearInterval(interval);
        }
    }, [])

    let handleTenMinutes = () => {
        if (TotalLogOut) {
            const tempArr = [...TotalLogOut];
            let result = [];

            result = tempArr.filter(item => {
                const timeZ = item.Timestamp.split("Z")[0];
                const AgentTime = new Date(timeZ).getTime(); //backend 
                const currentTime = new Date().getTime();
                let compareTime = ((currentTime - AgentTime) / 1000).toFixed();

                let tenMinSecond = 600;
                if (compareTime <= tenMinSecond) {
                    return item;
                }
            })
            dispatch(updateTotalAgent(result))
            // console.log("HandleTenMinutesLogout", result);
        }
    }
    useEffect(() => {
        if (TotalLogOut?.length !== 0) {
            handleTenMinutes()
        }
    }, [TotalLogOut])



    const logOut = () => {
        dispatch(clearSupervisorData());
        dispatch(logOutUser());
        navigate('/login');
    }
    return (
        <Layout style={{ height: "100vh" }}>
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                <Row span={24} justify="space-between">

                    <Col style={{ marginLeft: "12px" }}>
                        <Text strong >Manager Panel</Text>
                    </Col>
                    <Col style={{ marginRight: "12px" }}>
                        <Text strong style={{ marginRight: "12px" }}> {loginUser?.first_name}{" "} {loginUser?.last_name} </Text>
                        <Button type='primary' size='middle' shape='round' onClick={logOut}>
                            Logout
                        </Button>
                    </Col>
                </Row>
            </Header>
            <Content style={{ overflowX: 'scroll' }}>
                <div className="site-layout-background" >
                    <div className='wallboard-main-container wll-brd' >
                        <div className='wll-bord-row-1'>
                            <div className='total-agent-box'>
                                <div className="total">{getMainStatsV2 && getMainStatsV2[0].TotalAgent || "00"}</div>
                                <div className="heading">TOTAL NUMBER OF AGENTS</div>
                            </div>

                            <div className="wll-bord-row-2">
                                <AgentStatusCard color={"#5a4183"} borderColor={"#3b2361"} boxShadow={"#4f3379"}
                                    title={"AGENTS IN KARACHI"}
                                    busyAgent={getMainStatsV2 && getMainStatsV2[0].KHIBusyAgent}
                                    idle={getMainStatsV2 && getMainStatsV2[0].KHIIdleAgent}
                                    notReady={getMainStatsV2 && getMainStatsV2[0].KHINotReadyAgent}
                                    totalAgent={getMainStatsV2 && getMainStatsV2[0].KHITotalAgent}
                                />
                                <AgentStatusCard color={"#01a283"} borderColor={"#036855"} boxShadow={"#505e5b"}
                                    title={"AGENTS IN LAHORE"}
                                    busyAgent={getMainStatsV2 && getMainStatsV2[0].LHRBusyAgent}
                                    idle={getMainStatsV2 && getMainStatsV2[0].LHRIdleAgent}
                                    notReady={getMainStatsV2 && getMainStatsV2[0].LHRNotReadyAgent}
                                    totalAgent={getMainStatsV2 && getMainStatsV2[0].LHRTotalAgent}
                                />
                            </div>
                        </div>

                        <div className='row-divider' />

                        <div className="wll-bord-row-3">
                            <StatuTag data={{ icon: <MdQueue color={"#1ace6b"} size={33} />, title: "Call in queue", status: call_wait?.Call_Wait ? call_wait?.Call_Wait : "00", color: "#1ace6b" }} />
                            <StatuTag data={{
                                icon: <IoMdClock color={"#1aae5a"} size={45} />, title: "WAIT TIME",
                                status: getSliderStat ? gTime(((parseInt(getSliderStat[0].WAITING_TIME) + parseInt(getSliderStat[1].WAITING_TIME) + parseInt(getSliderStat[2].WAITING_TIME) + parseInt(getSliderStat[3].WAITING_TIME) + parseInt(getSliderStat[4].WAITING_TIME)) / 5).toFixed(0)) : "00:00",
                                color: "#1aae5a"
                            }} />
                            <StatuTag data={{
                                icon: <HiPhoneIncoming color={"#5aaae5"} size={36} />, title: "LANDED CALLS",
                                status: getSliderStat ? (parseInt(getSliderStat[0].CALLS_OFFER) + parseInt(getSliderStat[1].CALLS_OFFER) + parseInt(getSliderStat[2].CALLS_OFFER) + parseInt(getSliderStat[3].CALLS_OFFER) + parseInt(getSliderStat[4].CALLS_OFFER)) : "00",
                                color: "#5aaae5"
                            }} />
                            <StatuTag data={{
                                icon: <MdPhoneInTalk color={"#217dbe"} size={35} />, title: "ANSWERED CALL",
                                status: getSliderStat ? (parseInt(getSliderStat[0].CALLS_ANS) + parseInt(getSliderStat[1].CALLS_ANS) + parseInt(getSliderStat[2].CALLS_ANS) + parseInt(getSliderStat[3].CALLS_ANS) + parseInt(getSliderStat[4].CALLS_ANS)) : "00",
                                color: "#217dbe"
                            }} />

                            <StatuTag data={{ icon: <HiChartPie color={"#ad65d5"} size={40} />, title: "MTD service level", status: "00", color: "#ad65d5" }} />

                            <StatuTag data={{ icon: <GiProgression color={"#8c3cb5"} size={33} />, title: "SERVICE LEVEL", status: getMainStatsV1 && getMainStatsV1?.SL !== undefined ? getMainStatsV1?.SL.toFixed(1) + "%" : "00", color: "#8c3cb5" }} />
                            <StatuTag data={{
                                icon: <MdPhoneMissed color={"#ef5b9ad6"} size={33} />, title: "ABANDONED CALLS",
                                status: getSliderStat ? (parseInt(getSliderStat[0].CALLS_ABAN) + parseInt(getSliderStat[1].CALLS_ABAN) + parseInt(getSliderStat[2].CALLS_ABAN) + parseInt(getSliderStat[3].CALLS_ABAN) + parseInt(getSliderStat[4].CALLS_ABAN)) : "00",
                                color: "#ef5b9ad6"
                            }} />
                            <StatuTag data={{
                                icon: <FaCalendarAlt color={"#a6004a"} size={30} />, title: "ABANDONED A.T",
                                status: getSliderStat ? (parseInt(getSliderStat[0].CALLS_ABAN_AFT_THRESHOLD) + parseInt(getSliderStat[1].CALLS_ABAN_AFT_THRESHOLD) + parseInt(getSliderStat[2].CALLS_ABAN_AFT_THRESHOLD) + parseInt(getSliderStat[3].CALLS_ABAN_AFT_THRESHOLD) + parseInt(getSliderStat[4].CALLS_ABAN_AFT_THRESHOLD)) : "00",
                                color: "#a6004a"
                            }} />
                            <StatuTag data={{
                                icon: <IoTimerSharp color={"#ffaa3b"} size={45} />, title: "AVERAGE HANDLING TIME",
                                status: getSliderStat ? gTime(((parseInt(getSliderStat[0].AHT) + parseInt(getSliderStat[1].AHT) + parseInt(getSliderStat[2].AHT) + parseInt(getSliderStat[3].AHT) + parseInt(getSliderStat[4].AHT)) / 5).toFixed(0)) : "00",
                                color: "#ffaa3b"
                            }} />
                            <StatuTag data={{ icon: <ImSwitch color={"#d68a2a"} size={35} />, title: "LAST 10 MINUTES LOGOUT", status: filterdData?.length, color: "#d68a2a" }} />
                        </div>

                        <div className='row-divider' />
                        <CallStatusTable />
                    </div>
                </div>
            </Content>
        </Layout>

    )
}

export default ManagerScreen;