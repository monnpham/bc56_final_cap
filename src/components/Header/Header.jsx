import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
    let navigate = useNavigate();
    let { info } = useSelector((state) => state.userReducer);
    let handleLogout = () => {
        window.location.href = "/";
        localStorage.clear();
        toast.success("Đăng xuất thành công");
    };
    let renderUserNav = () => {
        if (info) {
            return (
                <>
                    <span className="mr-4 text-orange-700 font-bold max-[991px]:ml-7">
                        {info.hoTen}
                    </span>
                    <button
                        onClick={handleLogout}
                        className=" rounded-md p-2 font-semibold text-white bg-orange-600 hover:bg-orange-900"
                    >
                        Đăng Xuất
                    </button>
                </>
            );
        }
        return (
            <>
                <button
                    onClick={() => {
                        navigate("/login");
                    }}
                    className="text-gray-400 text-base font-semibold hover:text-orange-600 delay-100 px-2 after:pr-px after:ml-3 after:bg-slate-400"
                >
                    <i class="fa-solid fa-user text-2xl mx-2"></i>
                    Đăng Nhập
                </button>
                <button
                    onClick={() => {
                        navigate("/register");
                    }}
                    className="text-gray-400 text-base font-semibold hover:text-orange-600 delay-100 px-2"
                >
                    <i class="fa-solid fa-user text-2xl mx-2"></i>
                    Đăng Ký
                </button>
            </>
        );
    };
    return (
        <div className="container_header">
            <Navbar
                expand="lg"
                className="bg-white py-0 px-6 shadow-xl left-0 right-0 top-0 z-50 flex justify-between "
            >
                <div className="">
                    <Navbar.Brand href="/" className="w-52">
                        <svg width="306" height="48" viewBox="0 0 306 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M57.123 8.48291H61.264V29.5079C61.264 35.0749 58.826 38.8939 53.121 38.8939C50.959 38.8939 49.303 38.5259 48.152 38.1119V34.1089C49.394 34.6159 50.913 34.8909 52.43 34.8909C55.927 34.8909 57.122 32.7749 57.122 29.7849V8.48291H57.123Z" fill="#172B4D"></path><path d="M68.807 6.87402C70.417 6.87402 71.567 7.88602 71.567 9.63402C71.567 11.382 70.418 12.395 68.807 12.395C67.196 12.395 66.046 11.382 66.046 9.63402C66.046 7.88602 67.196 6.87402 68.807 6.87402ZM66.783 15.707H70.74V38.709H66.783V15.707Z" fill="#172B4D"></path><path d="M80.582 38.7091H76.718V15.7071H80.582V19.7551C81.916 17.0411 84.217 15.1091 88.726 15.3851V19.2491C83.665 18.7431 80.582 20.2611 80.582 25.1381V38.7091Z" fill="#172B4D"></path><path d="M107.264 34.5681C105.792 37.6051 103.032 39.1691 99.4899 39.1691C93.3709 39.1691 90.2889 33.9711 90.2889 27.2081C90.2889 20.7211 93.5089 15.2461 99.9499 15.2461C103.308 15.2461 105.885 16.7651 107.264 19.7551V15.7071H111.221V38.7091H107.264V34.5681ZM100.547 35.4891C104.09 35.4891 107.264 33.2341 107.264 28.1281V26.2881C107.264 21.1821 104.366 18.9271 101.007 18.9271C96.5449 18.9271 94.2439 21.8711 94.2439 27.2081C94.2439 32.7291 96.4519 35.4891 100.547 35.4891Z" fill="#172B4D"></path><path d="M134.633 39.1689C128.79 39.1689 126.075 38.02 123.73 36.823V32.591C126.536 34.063 130.861 35.1209 134.863 35.1209C139.418 35.1209 141.12 33.326 141.12 30.658C141.12 27.99 139.464 26.5629 133.713 25.1829C126.904 23.5269 123.868 21.1809 123.868 16.2119C123.868 11.5199 127.456 8.02295 134.495 8.02295C138.866 8.02295 141.672 9.08195 143.742 10.2319V14.3719C140.706 12.6239 137.439 12.0719 134.311 12.0719C130.354 12.0719 128.008 13.4519 128.008 16.2129C128.008 18.6969 129.94 19.9399 135.277 21.2739C141.672 22.8839 145.26 24.955 145.26 30.382C145.26 35.6269 142.131 39.1689 134.633 39.1689Z" fill="#172B4D"></path><path d="M148.753 27.1621C148.753 20.2611 152.801 15.2461 159.702 15.2461C166.556 15.2461 170.559 20.2611 170.559 27.1621C170.559 34.0631 166.556 39.1691 159.702 39.1691C152.801 39.1691 148.753 34.0631 148.753 27.1621ZM152.617 27.1621C152.617 31.5321 154.779 35.4891 159.702 35.4891C164.578 35.4891 166.694 31.5321 166.694 27.1621C166.694 22.7921 164.578 18.9271 159.702 18.9271C154.779 18.9271 152.617 22.7911 152.617 27.1621Z" fill="#172B4D"></path><path d="M180.631 15.707H186.566V19.387H180.631V38.709H176.767V19.387H173.04V15.707H176.767V13.177C176.767 8.89802 179.16 5.99902 184.081 5.99902C185.277 5.99902 186.06 6.18402 186.75 6.36702V10.002C186.06 9.86402 185.186 9.77202 184.266 9.77202C181.828 9.77202 180.631 11.199 180.631 13.269V15.707Z" fill="#172B4D"></path><path d="M199.951 34.9821C200.871 34.9821 201.745 34.7981 202.435 34.6611V38.4791C201.745 38.6631 200.962 38.8471 199.766 38.8471C194.844 38.8471 192.452 35.9491 192.452 31.6701V19.3861H188.725V15.7061H192.452V10.8291H196.316V15.7061H202.435V19.3861H196.316V31.5771C196.316 33.6011 197.512 34.9811 199.951 34.9811V34.9821Z" fill="#172B4D"></path><path d="M229.208 38.709L225.252 27.576L223.136 20.491L221.02 27.576L217.063 38.709H212.002L203.537 15.707H207.907L214.532 35.213L221.249 15.707H225.021L231.738 35.213L238.363 15.707H242.733L234.268 38.709H229.207H229.208Z" fill="#172B4D"></path><path d="M260.81 34.5681C259.338 37.6051 256.578 39.1691 253.036 39.1691C246.917 39.1691 243.835 33.9711 243.835 27.2081C243.835 20.7211 247.055 15.2461 253.496 15.2461C256.854 15.2461 259.431 16.7651 260.81 19.7551V15.7071H264.767V38.7091H260.81V34.5681ZM254.093 35.4891C257.636 35.4891 260.81 33.2341 260.81 28.1281V26.2881C260.81 21.1821 257.912 18.9271 254.553 18.9271C250.091 18.9271 247.79 21.8711 247.79 27.2081C247.79 32.7291 249.998 35.4891 254.093 35.4891Z" fill="#172B4D"></path><path d="M274.607 38.7091H270.743V15.7071H274.607V19.7551C275.941 17.0411 278.242 15.1091 282.751 15.3851V19.2491C277.69 18.7431 274.607 20.2611 274.607 25.1381V38.7091Z" fill="#172B4D"></path><path d="M296.688 39.1691C288.085 39.1691 284.313 34.2011 284.313 27.1621C284.313 20.2151 288.177 15.2461 295.17 15.2461C302.254 15.2461 305.107 20.1691 305.107 27.1621V28.9561H288.315C288.868 32.8661 291.398 35.3961 296.827 35.3961C299.495 35.3961 301.749 34.8901 303.819 34.1541V37.7891C301.933 38.8011 299.035 39.1691 296.688 39.1691ZM288.269 25.5521H301.105C300.875 21.2741 298.943 18.8351 294.986 18.8351C290.799 18.8351 288.683 21.5491 288.269 25.5521Z" fill="#172B4D"></path><path d="M37.843 22.2901L20.803 5.25014L19.151 3.59814L6.323 16.4271L0.459 22.2901C-0.153 22.9021 -0.153 23.8951 0.459 24.5081L12.178 36.2271L19.151 43.2001L31.979 30.3721L32.178 30.1731L37.842 24.5091C38.454 23.8971 38.454 22.9041 37.842 22.2911L37.843 22.2901ZM19.151 29.2541L13.296 23.3991L19.152 17.5431L25.007 23.3981L19.151 29.2541Z" fill="#1D7AFC"></path><path d="M19.151 17.5441C15.314 13.7071 15.303 7.49707 19.111 3.64307L6.30103 16.4531L13.274 23.4261L19.153 17.5471L19.151 17.5451V17.5441Z" fill="url(#paint0_linear_818_478)"></path><path d="M25.023 23.3843L19.151 29.2563C23.001 33.1073 23.001 39.3503 19.151 43.2003L31.995 30.3573L25.022 23.3843H25.023Z" fill="url(#paint1_linear_818_478)"></path><defs><linearGradient id="paint0_linear_818_478" x1="18.107" y1="11.6201" x2="9.93002" y2="19.7961" gradientUnits="userSpaceOnUse"><stop offset="0.176" stop-color="#0055CC"></stop><stop offset="1" stop-color="#1D7AFC"></stop></linearGradient><linearGradient id="paint1_linear_818_478" x1="20.271" y1="35.1083" x2="28.431" y2="26.9483" gradientUnits="userSpaceOnUse"><stop offset="0.176" stop-color="#0055CC"></stop><stop offset="1" stop-color="#1D7AFC"></stop></linearGradient></defs></svg>
                    </Navbar.Brand>
                </div>
                {/* <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    className="border-none text-orange-600"
                /> */}
                <div className="">
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* <Nav className="m-auto">
                        <Nav.Link
                            onClick={() => {
                                navigate("/");
                            }}
                            href="#listMovie"
                            className="font-semibold text-black mx-3 p-1 hover:text-orange-600"
                        >
                            Lịch Chiếu
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                navigate("/");
                            }}
                            href="#cumRap"
                            className="font-semibold text-black mx-3 p-1 hover:text-orange-600"
                        >
                            Cụm Rạp
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                navigate("/");
                            }}
                            href="/"
                            className="font-semibold text-black mx-3 p-1 hover:text-orange-600"
                        >
                            Tin Tức
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                navigate("/");
                            }}
                            href="/"
                            className="font-semibold text-black mx-3 p-1 hover:text-orange-600"
                        >
                            Ứng Dụng
                        </Nav.Link>
                    </Nav> */}
                        <nav className=" max-[991px]:my-3">{renderUserNav()}</nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </div>
    );
}
