import React from 'react';
import { useMediaQuery } from "react-responsive";
import LoginPage from './LoginPage';
import LoginPageTablet from './LoginPageTablet';
import LoginPageMobile from './LoginPageMobile';


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

export default function LoginPageResponsive() {
    return (
        <>
            <Desktop>
                <LoginPage />
            </Desktop>
            <Tablet>
                <LoginPageTablet />
            </Tablet>
            <Mobile>
                <LoginPageMobile />
            </Mobile>
        </>
    );
}