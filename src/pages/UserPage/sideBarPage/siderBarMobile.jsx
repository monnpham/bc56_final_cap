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
import zIndex from '@mui/material/styles/zIndex';
const { Header, Sider } = Layout;

export default function SiderBarMobile() {
    let info = useSelector((state) => state.userReducer.info);
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer, },
    } = theme.useToken();

    return (
        <Layout width="40%" >
            <Sider
                width="90px"
                trigger={null} collapsible collapsed={true}
            >
                <div className="text-center text-white mt-2" style={{ fontSize: "32px", height: "50px" }}>
                    <h1>Jira</h1>
                </div>
                <div className="text-center mb-3 text-white">
                    <Avatar src={info.avatar} style={{ width: "50px", height: "50px" }} />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={location.pathname}
                    defaultSelectedKeys={location.pathname}
                    items={[
                        {
                            key: '/user/Management',
                            icon: <NavLink style={{ textDecoration: 'none' }} to="/user/Management" activeClasName="active">
                                <span><FolderAddOutlined /></span>
                            </NavLink>,

                        },
                        {
                            key: '/user/Create',
                            icon:
                                <NavLink style={{ textDecoration: 'none' }} to="/user/Create" activeClasName="active">
                                    <span><FileAddOutlined /></span>
                                </NavLink>,


                        },
                        {
                            key: '/user/Board',
                            icon:
                                <NavLink style={{ textDecoration: 'none' }} to="/user/Board" activeClasName="active">
                                    <UserOutlined />
                                </NavLink >
                        },
                        {
                            key: '/login',
                            icon:
                                <NavLink style={{ textDecoration: 'none' }} to="/login" activeClasName="active">
                                    <LogoutOutlined />
                                </NavLink >
                        },
                    ]}
                />
            </Sider>
            <Header
                className='flex'
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}

            >
                <Button
                    type="text"
                    // icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    // onClick={toggleCollapsed}
                    style={{
                        fontSize: '24px',
                    }}
                />
            </Header>
        </Layout >
    );
};
