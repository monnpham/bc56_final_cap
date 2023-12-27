import React from 'react';
import { useMediaQuery } from "react-responsive";
import Board from './Board';
import BoardTablet from './BoardTablet';
import BoardMobile from './BoardMobile';

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

export default function BoardResponsive() {
    return (
        <>
            <Desktop>
                <Board />
            </Desktop>
            <Tablet>
                <BoardTablet />
            </Tablet>
            <Mobile>
                <BoardMobile />
            </Mobile>
        </>
    );
}