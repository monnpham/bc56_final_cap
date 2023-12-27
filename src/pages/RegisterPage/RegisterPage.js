import React from "react";
import { Button, Checkbox, Form, Input, Layout } from "antd";
import { userService } from "../../services/service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SET_INFOR } from "../../redux/constant/user";

export default function RegisterPage() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const onFinish = (values) => {
    userService
      .register(values)
      .then((res) => {
        console.log(res);
        dispatch({ type: SET_INFOR, payload: res.data.content });
        localStorage.setItem("USER", JSON.stringify(res.data.content));
        toast.success("Đăng ký thành công");
        navigate("/user/Management");
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="w-full">
      <div className="emotion-bg h-screen">
        <Layout>
          <div className="bg-white h-screen">
            <Form
              className="bg-gray-200 container_login p-6 rounded-lg "
              name="basic"
              labelCol={{}}
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
                <i class="fa-solid fa-lock text-3xl w-12 h-12 py-1 bg-orange-600 rounded-full text-white"></i>
                <h4 className="text-2xl font-semibold">Đăng ký</h4>
              </div>
              {/* <Form.Item
            className="mb-1"
            label="Tài Khoản"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input className="py-2" />
          </Form.Item> */}

              <Form.Item
                className="mb-1"
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input className="py-2" />
              </Form.Item>
              <Form.Item
                className="mb-1"
                label="Mật Khẩu"
                name="passWord"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password className="py-2" />
              </Form.Item>

              <Form.Item
                className="mb-1"
                label="Số Điện Thoại"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input className="py-2" />
              </Form.Item>

              <Form.Item
                className="mb-1"
                label="Họ tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input className="py-2" />
              </Form.Item>


              <Form.Item name="remember" valuePropName="checked" className="mb-2">
                <Checkbox>Nhớ tài khoản</Checkbox>
              </Form.Item>

              <Form.Item className="mb-2">
                <Button
                  type="primary"
                  htmlType="submit"
                  className=" text-white w-full h-11 font-semibold"
                  style={{ backgroundColor: "#001529" }}
                >
                  ĐĂNG KÝ
                </Button>
              </Form.Item>
              <div
                className="text-blue-500 cursor-pointer text-decoration-underline  font-semibold"
                style={{ width: "50%" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Bạn đã có tài khoản? Đăng nhập
              </div>
            </Form>
          </div>
        </Layout>
      </div >
    </div >
  );
}
