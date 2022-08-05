import React, { useEffect, useState } from 'react';
import USERDATATABLE from './AgentTable';
import { Layout, Row, Col, Button, Typography, Select, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../Reducers/UserSlice';
import { GET_ALL_KHI_SUPERVISORS, GET_ALL_LHR_SUPERVISORS, GET_ALL_SUPERVISORS, GET_ALL_SUPERVISORS_10Mins, GET_SUPERVISOR_DATA } from '../utils/WallboardService/Api';
import { filterAgents, searchTableAgent, handleIsTenMinutes, updateTotalAgent, clearSupervisorData, filterByDepartment, clearSupervisorFilterData, selectedSuperVisor, clearSelectedSuperVisor, saveSearchInput } from '../Manager/store/managerSlice';

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
        filterdData, isShowTenMinutes, ALL_Supervisors, filterDeparmentID,
        ALL_KARACHI_AGENT, ALL_LAHORE_AGENT, StateWiseData, selectedSuperVisorState,
        saveSearchInputValue
    } = useSelector(state => state?.ManagerdSlice);
    const [stID, setStID] = useState("all")

    useEffect(() => { //filter callbacks when data change after timeout
        filterSupervisors(filterDeparmentID);
        filterAgentsHandle(defaultStateValue);
    }, [superVisorTableData])

    useEffect(() => { // change data against agent state change
        filterAgentsHandle(defaultStateValue)
    }, [filterDeparmentID])

    useEffect(() => {
        handleSupervisorFilter(selectedSuperVisorState)
    }, [superVisorTableData])

    useEffect(() => {
        handleSupervisorFilter(selectedSuperVisorState)
    }, [defaultStateValue])

    useEffect(() => {
        if (selectedSuperVisorState.length === 0) {
            filterAgentsHandle(defaultStateValue)
        }
    }, [selectedSuperVisorState])

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
        const interval = setInterval(() => getAlerts(), 300000) //10 mintues 600000 , 300000 5mint
        return () => {
            clearInterval(interval);
        }
    }, [])


    const onFinish = (input) => {
        dispatch(saveSearchInput(input))
        setDefaultTextValue(input);
        if (filterDeparmentID === "karachi") {
            const temData = filterdData; // filter all data behalf all state.
            const value = input?.toLowerCase()
            const newUser = temData?.filter(user =>
                user.AGENT_ID.toLowerCase().includes(value)
            )
            if (input === "") {
                dispatch(searchTableAgent(StateWiseData));
            } else {
                dispatch(searchTableAgent(newUser));
            }
        } else if (filterDeparmentID === "lahore") {
            const temData = filterdData
            const value = input?.toLowerCase()
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
                temData1 = filterdData;
            } else {
                temData1 = [...superVisorTableData];
            }
            const value = input?.toLowerCase()
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

    const logOut = () => {
        dispatch(clearSupervisorData());
        dispatch(logOutUser());
        navigate('/login');
    }

    const filterSupervisors = (type) => {

        dispatch(clearSelectedSuperVisor())
        dispatch(handleIsTenMinutes(false)) // disable 10 mint toggle
        if (type === "all") {
            dispatch(GET_ALL_SUPERVISORS());
            dispatch(filterByDepartment("all"));
        } else if (type === "karachi") {
            dispatch(GET_ALL_KHI_SUPERVISORS())
            dispatch(filterByDepartment("karachi"))
        } else if (type === "lahore") {
            dispatch(GET_ALL_LHR_SUPERVISORS())
            dispatch(filterByDepartment("lahore"))
        }

    }


    const filterAgentsHandle = (category) => { //filter agent by state
        setDefaultStateValue(category)
        dispatch(handleIsTenMinutes(false)) // disable 10 mint toggle
        if (category === "all") {
            dispatch(filterAgents(category))
        } else {
            dispatch(filterAgents(category))
        }
    }

    const handleTenMinutes = () => {
        if (!isShowTenMinutes) {
            dispatch(GET_ALL_SUPERVISORS_10Mins())
        } else {
            // dispatch(filterAgents(defaultStateValue));
            filterSupervisors(filterDeparmentID);
            filterAgentsHandle(defaultStateValue);
            //handleSupervisorFilter(selectedSuperVisorState)
          

        }
    }

    const handleSupervisorFilter = (value) => { // filter by supervisor

        if (value.length !== 0) {
            setDefaultSuperData(value) // set default data in react state.
            let tempArr = [];
            if (filterdData) {
                tempArr = filterdData
            } else {
                tempArr = [...superVisorTableData];
            }
            let yFilter = value.map(itemY => { return itemY; });
            let filteredX = tempArr.filter(itemX => yFilter.includes(itemX.SupervisorName));
            console.log(filteredX);
            dispatch(updateTotalAgent(filteredX));
            dispatch(selectedSuperVisor(value))
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
                                        value={selectedSuperVisorState}
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
                                                <Option key={SupervisorID}>{SupervisorName}</Option>
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
                                        onChange={(e) => onFinish(e.target.value)}
                                        id='myInput'
                                        value={saveSearchInputValue}
                                        style={{
                                            width: "200px", height: "30px", borderRadius: "7px", border: "1px solid black",
                                            padding: " 0px 7px", color: "black", fontSize: "12px"
                                        }} />
                                    {/* <Form
                                        style={{
                                            width: "200px", height: "30px", borderRadius: "7px", color: "black", fontSize: "12px"
                                        }}
                                    >
                                        <Form.Item name="agent_Name">
                                            <Input placeholder='SEARCH HERE'
                                                type="text"
                                                id='myInput'
                                                value={saveSearchInputValue}
                                                onChange={(e) => onFinish(e.target.value)}
                                                style={{
                                                    width: "200px", height: "30px", borderRadius: "7px", border: "1px solid black",
                                                    color: "black", FfontSize: "12px"
                                                }} />
                                        </Form.Item>
                                    </Form> */}
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