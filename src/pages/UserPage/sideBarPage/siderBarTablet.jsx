import React, { useState } from 'react';
import {
    FileAddOutlined,
    FolderAddOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const { Header, Sider } = Layout;

export default function SiderBarTablet() {
    let info = useSelector((state) => state.userReducer.info);

    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, },
    } = theme.useToken();
    return (
        <Layout style={{ height: '100vh', }} >
            <Sider trigger={null} collapsible collapsed={collapsed} >
                <div className="text-center text-white mt-2" style={{ fontSize: "32px", height: "50px" }}>
                    <h1>Jira</h1>
                </div>
                <div className="text-center mb-3 text-white">
                    <Avatar src={info.avatar} style={{ width: "50px", height: "50px" }} />
                </div>
                {/* <div className="demo-logo-vertical" /> */}
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={location.pathname}
                    defaultSelectedKeys={location.pathname}
                    items={[
                        {
                            key: '/user/Management',
                            icon: <FolderAddOutlined />,
                            label: <NavLink style={{ textDecoration: 'none' }} to="/user/Management" activeClasName="active">
                                <span>Project Management</span>
                            </NavLink>
                        },
                        {
                            key: '/user/Create',
                            icon: <FileAddOutlined />,
                            label: <NavLink style={{ textDecoration: 'none' }} to="/user/Create" activeClasName="active">
                                <span>Create Project</span>
                            </NavLink>,


                        },
                        {
                            key: '/user/Board',
                            icon: <UserOutlined />,
                            label: <NavLink style={{ textDecoration: 'none' }} to="/user/Board" activeClasName="active">
                                User Management
                            </NavLink >
                        },
                        {
                            key: '/login',
                            icon: <LogoutOutlined />,
                            label: <NavLink style={{ textDecoration: 'none' }} to="/login" activeClasName="active">
                                Log Out
                            </NavLink >
                        },
                    ]}
                />
            </Sider>
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            >
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '24px',
                    }}
                />
            </Header>
        </Layout>
    );
};
