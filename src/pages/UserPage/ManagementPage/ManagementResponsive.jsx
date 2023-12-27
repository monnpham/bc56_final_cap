import React from 'react';
import { useMediaQuery } from "react-responsive";
import Management from './Management';
import ManagementTablet from './ManagementTablet';
import ManagementMobile from './ManagementMobile';

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

export default function ManagementResponsive() {
    return <>
        <Desktop>
            <Management />
        </Desktop>
        <Tablet>
            <ManagementTablet />
        </Tablet>
        <Mobile>
            <ManagementMobile />
        </Mobile>
    </>

}