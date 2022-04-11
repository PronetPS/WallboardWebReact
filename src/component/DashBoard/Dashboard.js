import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Button } from 'antd';
import SidebarNav from './pages/Sidebar';
import UserManagement from './pages/UserManagement';
import AddUser from './pages/AddUser';
import { logOutUser } from '../Reducers/UserSlice';
import { clearState } from './store/dashboardSlice';
const { Header, Content, Footer } = Layout;


const Dashboard = () => {
    const { loginUser } = useSelector(state => state.UserSlice); //redux toolkit store 
    let navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (loginUser?.user_email === "admin@tech.com") {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    }, [])

    const logOut = () => {
        dispatch(logOutUser());
        dispatch(clearState());
        navigate('/login');
    }

    return (
        <Layout style={{ height: "100vh" }}>
            <SidebarNav />
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                    <Row span={24} justify="end" style={{ marginRight: 9 }}>
                        <Col>
                            <Button type='primary' shape='round' onClick={logOut}>
                                Logout
                            </Button>
                        </Col>
                    </Row>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Routes>
                            <Route path="/" element={<UserManagement />} />
                            <Route path="/allUser" element={<UserManagement />} />
                            <Route path="/adduser" element={<AddUser />} />
                        </Routes>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}

export default Dashboard;