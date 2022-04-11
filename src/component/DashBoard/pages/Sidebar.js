import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, UsergroupDeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';



const { Sider } = Layout;


function SidebarNav() {
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="logo">Admin</div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UsergroupDeleteOutlined />}>
                    <NavLink to={"/dashboard/allUser"}>
                        All User
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>

                    <NavLink to={"/dashboard/adduser"}>
                        User Management
                    </NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SidebarNav;
