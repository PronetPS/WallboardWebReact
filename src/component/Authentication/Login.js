import React, { useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { setUser } from "../Reducers/UserSlice"
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { USER_LOGIN } from "../utils/Userservice/Api";


const { Text } = Typography;

const Login = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { loginUser } = useSelector(state => state.UserSlice);

    useEffect(() => {
        if (loginUser?.user_email === "admin@tech.com") {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
        if (loginUser?.role_type === 1) navigate('/managerScreen');
        if (loginUser?.role_type === 2) navigate('/supervisorScreen');
    }, [])



    const onFinish = ({ email, password }) => {
        const default_email = "admin@tech.com";
        const default_password = "admin123";

        if (default_email === email && password === default_password) {

            toast("Your are Successfully Login!");
            dispatch(setUser({ user_email: email, role_type: 0 }));
            navigate('/dashboard');
        } else {

            dispatch(USER_LOGIN({ user_email: email, user_password: password })).then(({ payload }) => {
                if (!payload.status) {
                    toast(payload.message);
                } else if (payload.data.role_type === 1) {
                    navigate('/managerScreen');
                } else if (payload.data.role_type === 2) {
                    navigate('/supervisorScreen');
                }
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
    };

    return (
        <div className="formBody">
            <div className="loginForm">
                <div className="l-form-body">
                    <div className="l-form-heading"><Text strong style={{ fontSize: 40 }}>Wallboard Login</Text></div>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        initialValues={{
                            // remember: false,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input type="email" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password size="large" />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" style={{
                                width: "132px",
                                marginTop: "30px"
                            }}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
