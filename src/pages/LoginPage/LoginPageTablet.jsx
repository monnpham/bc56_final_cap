import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Layout } from "antd";
import { userService } from "../../services/service";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_INFOR } from "../../redux/constant/user";

export default function LoginPageTablet() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { id } = useParams();
    let info = useSelector((state) => state.userReducer.info);
    console.log("🚀🚀🚀🚀🚀info:", info?.id)

    const [detail, setDetail] = useState();
    console.log("🚀 ~ file: LoginPageTablet.jsx:17 ~ LoginPageTablet ~ detail:", detail)
    const onFinish = (values) => {
        userService
            .login(values)
            .then((res) => {
                dispatch({ type: SET_INFOR, payload: res.data.content });
                //lưu vào localStorage
                localStorage.setItem("USER", JSON.stringify(res.data.content));
                toast.success("Đăng nhập thành công");
                navigate("/user/Management");

            })
            .catch((err) => {
                toast.error(err.response.data.message);
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
        <div className="w-full ">
            <div className=" emotion-bg h-screen " >
                <Layout >
                    <div className="bg-white h-screen">
                        <div style={{
                            // paddingTop: window.innerHeight / 4
                        }}>
                            <Form
                                className="bg-gray-200 container_login p-6 rounded-lg "
                                name="basic"
                                layout="vertical"
                                wrapperCol={{
                                    span: 24,
                                }}
                                style={{
                                    width: window.innerWidth / 4,
                                    marginTop: window.innerHeight / 8
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
                                        className=" text-white w-full h-11 font-semibold"
                                        style={{ backgroundColor: "#001529" }}
                                    >
                                        ĐĂNG NHẬP
                                    </Button>
                                </Form.Item>
                                <div
                                    className="text-blue-500 cursor-pointer text-decoration-underline font-semibold"
                                    style={{ width: "50%" }}
                                    onClick={() => {
                                        navigate('/register');
                                    }}
                                >
                                    Bạn chưa có tài khoản? Đăng ký
                                </div>
                            </Form>
                        </div>
                    </div>
                </Layout>
            </div >
        </div >
    );
}
