import React from 'react';
import { useMediaQuery } from "react-responsive";

import RegisterPage from './RegisterPage';
import RegisterPageTablet from './RegisterPageTablet';
import RegisterPageMobile from './RegisterPageMobile';

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

export default function RegisterPageResponsive() {
    return (
        <>
            <Desktop>
                <RegisterPage />
            </Desktop>
            <Tablet>
                <RegisterPageTablet />
            </Tablet>
            <Mobile>
                <RegisterPageMobile />
            </Mobile>
        </>
    );
}