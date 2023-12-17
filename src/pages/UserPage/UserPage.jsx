
import React, { useEffect, useState } from 'react';
import Board from './Board';
import Menu from './Menu';
import SideBar from './sideBar';
import Create from './Create';
import { Outlet } from 'react-router-dom';
import Menus from './Menu';


export default function UserPage() {
    return (
        <div className="jira">
            {/* Sider Bar  */}
            <SideBar />
            {/* Menu */}
            <Menu />
            <Outlet />

        </div>

    )
};
