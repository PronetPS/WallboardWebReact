import React, { useEffect, useState } from 'react';
import USERDATATABLE from './AgentTable';
import { Layout, Row, Col, Button, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../Reducers/UserSlice';
import { GET_SUPERVISOR_DATA } from '../utils/WallboardService/Api';
import { filterAgents, searchTableAgent, handleIsTenMinutes, updateTotalAgent, clearSupervisorData } from '../Manager/store/managerSlice';

const { Text } = Typography;
const { Header, Content } = Layout;

const SupervisorScreen = () => {
    const { loginUser } = useSelector(state => state?.UserSlice); //redux toolkit store 
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { superVisorTableData, TotalActiveAgent, TotalNotReady, TotalLogOut, filterdData, isShowTenMinutes } = useSelector(state => state?.ManagerdSlice);


    const searchAgentsHandler = (input) => {
        var temData = [...superVisorTableData]
        const value = input.toLowerCase()
        const newUser = temData.filter(user =>
            user.AgentGivenName.toLowerCase().includes(value)
        )
        if (input === "") {
            dispatch(searchTableAgent(null));
        } else {
            dispatch(searchTableAgent(newUser));
        }
    }

    useEffect(() => {
        function getAlerts() {
            dispatch(GET_SUPERVISOR_DATA());
        }

        getAlerts()
        const interval = setInterval(() => getAlerts(), 600000) //3sec 10sec 10000
        return () => {
            clearInterval(interval);
        }
    }, [])

    const logOut = () => {
        dispatch(clearSupervisorData());
        dispatch(logOutUser());
        navigate('/login');
    }

    const filterAgentsHandle = (category) => {
        if (category === "all") {
            dispatch(filterAgents(category))
        } else {
            dispatch(filterAgents(category))
        }
    }


    const handleTenMinutes = () => {
        if (!isShowTenMinutes) {
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
        } else {
            dispatch(filterAgents("all"))
        }
    }

    return (
        <Layout className="supervisor-main">
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                <Row span={24} justify="space-between">
                    <Col style={{ marginLeft: "12px" }}>
                        <Text strong >{loginUser.role_type === 1 ? "Manager Panel" : "Supervisor Panel"}</Text>
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
                <div className='wallboard-main-container'>
                    <div className='wallBoard-main-row'>

                        <div className='agent-status-logOut' style={{ display: "flex" }}>
                            <div className='w-b-filterAgentItem'>
                                <div>
                                    <h2 style={{ fontWeight: "bold" }}>AGENT STATUS</h2>
                                </div>
                                <div>
                                    <select
                                        onChange={(e) => filterAgentsHandle(e.target.value)}
                                        placeholder="SELECT CRITERIA"
                                        style={{ borderRadius: "7px", marginBottom: "6px", width: "200px", height: "30px", padding: "0 4px" }}>
                                        <option value={""}>SELECT CRITERIA</option>
                                        <option value={"all"}>All</option>
                                        <option value={"RY"}>Ready</option>
                                        <option value={"NR"}>Not Ready</option>
                                        <option value={"LO"}>Logout</option>
                                    </select>
                                </div>
                                <div>
                                    <input placeholder="SEARCH HERE"
                                        onChange={(e) => searchAgentsHandler(e.target.value)}
                                        style={{
                                            width: "200px", height: "30px", borderRadius: "7px", border: "1px solid black",
                                            padding: " 0px 7px", color: "black", FfontSize: "12px"
                                        }} /></div>
                            </div>

                            <div className='w-b-logout-status'
                                style={{ backgroundColor: isShowTenMinutes && "#d2d2d2" }}
                                onClick={() => {
                                    handleTenMinutes();
                                    dispatch(handleIsTenMinutes(!isShowTenMinutes))
                                }}>
                                <div className='status-logout' style={{ color: isShowTenMinutes && "#000" }}>
                                    10 Min
                                    LOGOUT
                                </div>

                            </div>
                        </div>

                        <div className="box-container">
                            <div className='w-b-box' style={{ backgroundColor: "#62b6ff" }}>
                                <div className='df sts-item'>{TotalActiveAgent ? TotalActiveAgent?.length : "00"}</div>
                                <div className='df s-item'>READY</div>
                            </div>
                            <div className='w-b-box' style={{ backgroundColor: "#ff9d0b" }}>
                                <div className='df sts-item'>{TotalNotReady ? TotalNotReady?.length : "00"}</div>
                                <div className='d s-item'>NOT READY</div>
                            </div>
                            <div className='w-b-box' style={{ backgroundColor: "#d80000e0" }}>
                                <div className='df sts-item'>{TotalLogOut ? TotalLogOut?.length : "00"}</div>
                                <div className='df s-item'>LOGOUT</div>
                            </div>
                        </div>
                    </div>
                    <USERDATATABLE data={filterdData !== null ? filterdData : superVisorTableData} />
                </div>
            </Content>
        </Layout>
    )
}

export default SupervisorScreen;