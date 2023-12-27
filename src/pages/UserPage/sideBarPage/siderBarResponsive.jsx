import React from 'react';
import { useMediaQuery } from "react-responsive";
import SideBar from './siderBar';
import SideBarTablet from './siderBarTablet';
import SideBarMobile from './siderBarMobile';

const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 960 });
    return isDesktop ? children : null;
};

const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 959 });
    return isTablet ? children : null;
};

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 599 });
    return isMobile ? children : null;
};

export default function SiderBarResponsive() {
    return <>
        <Desktop>
            <SideBar />
        </Desktop>
        <Tablet>
            <SideBarTablet />
        </Tablet>
        <Mobile>
            <SideBarMobile />
        </Mobile>
    </>

}