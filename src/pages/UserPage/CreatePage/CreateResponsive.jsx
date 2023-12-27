import React from 'react';
import { useMediaQuery } from "react-responsive";

import Create from './Create';
import CreateTablet from './CreateTablet';
import CreateMobile from './CreateMobile';

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

export default function CreateResponsive() {
    return <>
        <Desktop>
            <Create />
        </Desktop>
        <Tablet>
            <CreateTablet />
        </Tablet>
        <Mobile>
            <CreateMobile />
        </Mobile>
    </>

}