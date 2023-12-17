import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Layout } from "antd";
import { userService } from "../../services/service";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_INFOR } from "../../redux/constant/user";
import Sider from "antd/es/layout/Sider";

export default function LoginPage() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { id } = useParams();
    const [detail, setDetail] = useState();
    console.log("🚀 ~ file: LoginPage.js:14 ~ LoginPage ~ detail:", detail)
    const onFinish = (values) => {
        userService
            .login(values)
            .then((res) => {
                dispatch({ type: SET_INFOR, payload: res.data.content });
                //lưu vào localStorage
                localStorage.setItem("USER", JSON.stringify(res.data.content));
                toast.success("Đăng nhập thành công");
                navigate("/user/Board");

            })
            .catch((err) => {
                console.log(err);
                toast.error("Đăng nhập thất bại");
            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    useEffect(() => {
        userService
            .getDetail(id)
            .then((res) => {
                setDetail(res.data.content);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="w-full">
            <div className=" emotion-bg" >
                <Layout>
                    <Sider width={window.innerWidth * 3 / 4.5} height={window.innerHeight}>

                    </Sider>
                    <content>
                        <div style={{
                            // paddingTop: window.innerHeight / 4
                        }}>
                            <Form
                                className="bg-gray-200 container_login p-6 rounded-lg  h-screen"
                                name="basic"
                                layout="vertical"
                                wrapperCol={{
                                    span: 24,
                                }}
                                style={{
                                    width: window.innerWidth / 3,
                                    paddingTop: window.innerHeight / 4
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <div className="title text-center mb-3 ">
                                    <i class="fa-solid fa-user text-3xl w-12 h-12 py-1 bg-orange-600 rounded-full text-white"></i>
                                    <h4 className="text-2xl font-semibold">Đăng nhập</h4>
                                </div>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your username!",
                                        },
                                    ]}
                                    style={{}}
                                >
                                    <Input className="py-3" />
                                </Form.Item>

                                <Form.Item
                                    label="Mật Khẩu"
                                    name="passWord"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your password!",
                                        },
                                    ]}
                                >
                                    <Input.Password className="py-3" />
                                </Form.Item>

                                <Form.Item name="remember" valuePropName="checked">
                                    <Checkbox>Nhớ tài khoản</Checkbox>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="bg-orange-600 text-white w-full h-11 font-semibold"

                                    >
                                        ĐĂNG NHẬP
                                    </Button>
                                </Form.Item>
                                <div
                                    className="text-blue-500 cursor-pointer text-decoration-underline text-right font-semibold"
                                    onClick={() => {
                                        navigate('/register');
                                    }}
                                >
                                    Bạn chưa có tài khoản? Đăng ký
                                </div>
                            </Form>
                        </div>
                    </content>

                </Layout>
            </div>
        </div>
    );
}
