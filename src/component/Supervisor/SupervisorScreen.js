import React, { useEffect, useState } from 'react';
import USERDATATABLE from './AgentTable';
import { Layout, Row, Col, Button, Typography, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../Reducers/UserSlice';
import { GET_ALL_KHI_SUPERVISORS, GET_ALL_LHR_SUPERVISORS, GET_ALL_SUPERVISORS, GET_ALL_SUPERVISORS_10Mins, GET_SUPERVISOR_DATA } from '../utils/WallboardService/Api';
import { filterAgents, searchTableAgent, handleIsTenMinutes, updateTotalAgent, clearSupervisorData, filterByDepartment, clearSupervisorFilterData } from '../Manager/store/managerSlice';

const { Text } = Typography;
const { Header, Content } = Layout;
const { Option } = Select;

const SupervisorScreen = () => {
    const { loginUser } = useSelector(state => state?.UserSlice); //redux toolkit store 
    const [defaultSuperData, setDefaultSuperData] = useState([]);
    const [defaultStateValue, setDefaultStateValue] = useState("all");
    const [defaultTextValue, setDefaultTextValue] = useState("");


    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { superVisorTableData, TotalActiveAgent, TotalNotReady, TotalLogOut,
        filterdData, isShowTenMinutes, ALL_Supervisors, filterDeparmentID, ALL_KARACHI_AGENT, ALL_LAHORE_AGENT, StateWiseData
    } = useSelector(state => state?.ManagerdSlice);
    const [stID, setStID] = useState("all")



    const searchAgentsHandler = (input) => {
        setDefaultTextValue(input)
        if (filterDeparmentID === "karachi") {
            const temData = [...filterdData]; // filter all data behalf all state.
            const value = input.toLowerCase()
            const newUser = temData?.filter(user =>
                user.AGENT_ID.toLowerCase().includes(value)
            )
            if (input === "") {
                dispatch(searchTableAgent(StateWiseData));
            } else {
                dispatch(searchTableAgent(newUser));
            }
        } else if (filterDeparmentID === "lahore") {
            const temData = [...filterdData]
            const value = input.toLowerCase()
            const newUser = temData?.filter(user =>
                user.AGENT_ID.toLowerCase().includes(value)
            )
            if (input === "") {
                dispatch(searchTableAgent(StateWiseData));
            } else {
                dispatch(searchTableAgent(newUser));
            }
        } else if (filterDeparmentID === "all") {
            let temData1 = [];
            if (filterdData) {
                temData1 = [...filterdData]
            } else {
                temData1 = [...superVisorTableData];
            }
            const value = input.toLowerCase()
            const newUser = temData1?.filter(user =>
                user.AGENT_ID.toLowerCase().includes(value)
            )
            if (input === "") {
                dispatch(searchTableAgent(StateWiseData));
            } else {
                dispatch(searchTableAgent(newUser));
            }
        }
    }

    useEffect(() => {
        setStID("all")
    }, [filterDeparmentID])

    useEffect(() => {
        dispatch(GET_ALL_SUPERVISORS());
    }, [])

    useEffect(() => {
        function getAlerts() {
            dispatch(GET_SUPERVISOR_DATA());
        }

        getAlerts()
        const interval = setInterval(() => getAlerts(), 2000) //10 mintues 600000
        return () => {
            clearInterval(interval);
        }
    }, [])

    const logOut = () => {
        dispatch(clearSupervisorData());
        dispatch(logOutUser());
        navigate('/login');
    }

    const filterSupervisors = (type) => {
        dispatch(handleIsTenMinutes(false)) // disable 10 mint toggle
        // setDefaultSuperData([])
        setDefaultTextValue("")
        if (type === "all") {
            dispatch(GET_ALL_SUPERVISORS());
            dispatch(filterByDepartment("all"))
            setDefaultStateValue("all")
        } else if (type === "karachi") {
            dispatch(GET_ALL_KHI_SUPERVISORS())
            dispatch(filterByDepartment("karachi"))
            setDefaultStateValue("all")
        } else if (type === "lahore") {
            dispatch(GET_ALL_LHR_SUPERVISORS())
            dispatch(filterByDepartment("lahore"))
            setDefaultStateValue("all")
        }
    }


    const filterAgentsHandle = (category) => {
        setDefaultStateValue(category)
        dispatch(handleIsTenMinutes(false)) // disable 10 mint toggle
        setDefaultTextValue("")
        if (category === "all") {
            dispatch(filterAgents(category))
        } else {
            dispatch(filterAgents(category))
        }
    }

    const handleTenMinutes = () => {
        // if (!isShowTenMinutes) {
        //     const tempArr = [...TotalLogOut];
        //     let result = [];

        //     result = tempArr.filter(item => {
        //         const timeZ = item.Timestamp.split("Z")[0];
        //         const AgentTime = new Date(timeZ).getTime(); //backend 
        //         const currentTime = new Date().getTime();
        //         let compareTime = ((currentTime - AgentTime) / 1000).toFixed();

        //         let tenMinSecond = 600;
        //         if (compareTime <= tenMinSecond) {
        //             return item;
        //         }
        //     })
        //     dispatch(updateTotalAgent(result))
        // } else {
        //     dispatch(filterAgents("all"))
        // }

        if (!isShowTenMinutes) {
            // let tempArr = [];
            // if (filterDeparmentID === "karachi") {
            //     tempArr = ALL_KARACHI_AGENT.filter(item => item.STATE === "Logout")
            // } else if (filterDeparmentID === "lahore") {
            //     tempArr = ALL_LAHORE_AGENT.filter(item => item.STATE === "Logout")
            // } else if (filterDeparmentID === "all") {
            //     tempArr = superVisorTableData.filter(item => item.STATE === "Logout")
            // }

            // let result = [];

            // result = tempArr.filter(item => {
            //     let tenMinSecond = 600; //
            //     if (item.TIME_IN_STATE <= tenMinSecond) {
            //         return item;
            //     }
            // })
            // console.log(result, tempArr);
            // dispatch(updateTotalAgent(result))
            dispatch(GET_ALL_SUPERVISORS_10Mins())
        } else {
            dispatch(filterAgents("all"))
        }

    }

    const handleSupervisorFilter = (value) => {

        if (value.length !== 0) {
            setDefaultSuperData(value)
            let tempArr = [];
            if (filterDeparmentID === "karachi") {
                tempArr = [...ALL_KARACHI_AGENT];
            } else if (filterDeparmentID === "lahore") {
                tempArr = [...ALL_LAHORE_AGENT];
            } else if (filterDeparmentID === "all") {
                tempArr = [...superVisorTableData];
            }
            let yFilter = value.map(itemY => { return itemY; });
            let filteredX = tempArr.filter(itemX => yFilter.includes(itemX.SupervisorName));
            dispatch(updateTotalAgent(filteredX));
        } else {
            dispatch(clearSupervisorFilterData())
            setDefaultSuperData([])
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
                                    <Select defaultValue="all"
                                        style={{ width: 200, marginTop: "5px", marginBottom: "6px" }}
                                        onChange={filterSupervisors}>
                                        <Option value={"all"}>All Cities</Option>
                                        <Option value={"karachi"}>Karachi</Option>
                                        <Option value={"lahore"}>Lahore</Option>
                                    </Select>
                                </div>
                                <div>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        value={defaultSuperData}
                                        style={{ width: '100%' }}
                                        maxTagCount={2}
                                        maxTagTextLength={4}
                                        placeholder="Search to Select Supervisor"
                                        onChange={handleSupervisorFilter}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                    >  {
                                            ALL_Supervisors && ALL_Supervisors?.map(({ SupervisorName, SupervisorID }) =>
                                                <Option key={SupervisorName}>{SupervisorName}</Option>
                                            )
                                        }

                                    </Select>
                                </div>

                                <div>

                                    <Select
                                        style={{ width: 200, marginTop: "5px", marginBottom: "6px" }}
                                        onChange={filterAgentsHandle}
                                        value={defaultStateValue}
                                    >
                                        <Option value="all" >All</Option>
                                        <Option value="RY">Ready</Option>
                                        <Option value="NR">Not Ready</Option>
                                        <Option value="LO">Logout</Option>
                                    </Select>
                                </div>

                                <div>
                                    <input placeholder="SEARCH HERE"
                                        onChange={(e) => {
                                            searchAgentsHandler(e.target.value)
                                            setDefaultTextValue(e.target.value)
                                        }}
                                        value={defaultTextValue}
                                        style={{
                                            width: "200px", height: "30px", borderRadius: "7px", border: "1px solid black",
                                            padding: " 0px 7px", color: "black", FfontSize: "12px"
                                        }} />
                                </div>
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
                                <div className='df sts-item'>
                                    {filterDeparmentID === "karachi" ?
                                        ALL_KARACHI_AGENT?.filter(item => item.STATE === "IDLE ").length :
                                        filterDeparmentID === "lahore" ?
                                            ALL_LAHORE_AGENT?.filter(item => item.STATE === "IDLE ").length :
                                            TotalActiveAgent ? TotalActiveAgent?.length : "00"
                                    }</div>
                                <div className='df s-item'>READY</div>
                            </div>
                            <div className='w-b-box' style={{ backgroundColor: "#ff9d0b" }}>
                                <div className='df sts-item'>{
                                    filterDeparmentID === "karachi" ?
                                        ALL_KARACHI_AGENT?.filter(item => item.STATE === "NOTRDY ").length :
                                        filterDeparmentID === "lahore" ?
                                            ALL_LAHORE_AGENT?.filter(item => item.STATE === "NOTRDY ").length :
                                            TotalNotReady ? TotalNotReady?.length : "00"
                                }</div>
                                <div className='d s-item'>NOT READY</div>
                            </div>
                            <div className='w-b-box' style={{ backgroundColor: "#d80000e0" }}>
                                <div className='df sts-item'>{
                                    filterDeparmentID === "karachi" ?
                                        ALL_KARACHI_AGENT?.filter(item => item.STATE === "Logout").length :
                                        filterDeparmentID === "lahore" ?
                                            ALL_LAHORE_AGENT?.filter(item => item.STATE === "Logout").length :
                                            TotalLogOut ? TotalLogOut?.length : "00"
                                }</div>
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