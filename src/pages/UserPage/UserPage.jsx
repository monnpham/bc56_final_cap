
import React, { useEffect, useState } from 'react';
import SideBar from './sideBarPage/sideBar';
import { Outlet } from 'react-router-dom';
import { userService } from '../../services/service';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PROJECT, LOADING } from '../../redux/constant/user';


export default function UserPage() {
    let info = useSelector((state) => state.userReducer.info);
    let dispatch = useDispatch();

    useEffect(() => {
        userService
            .getListAllProject()
            .then((res) => {
                localStorage.setItem("USER_PROJECT", JSON.stringify(res.data.content.filter(project => project.creator.id === info.id)));
                localStorage.setItem("ALL_PROJECT", JSON.stringify(res.data.content));
                setTimeout(() => {
                    dispatch({ type: GET_PROJECT, payload: res.data.content });
                }, "500");
                dispatch({ type: LOADING, payload: true });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="jira ">
            {/* Sider Bar  */}
            <SideBar />
            {/* Menu */}
            {/* <Menu /> */}
            <Outlet />
        </div>

    )
};
