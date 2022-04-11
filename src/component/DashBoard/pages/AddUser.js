import React from 'react';
import { Form, Input, Button, Select } from 'antd';
// import { createGuid } from '../../utils/Userservice/base';
import { useDispatch, useSelector } from "react-redux"
import { CREATE_USER } from '../../utils/Userservice/Api';
import { useNavigate } from 'react-router-dom';
import { resetCreateUserProgress } from '../store/dashboardSlice';
import { createGuid } from '../../utils/base';

const { Option } = Select;


function AddUser() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    // const { createUserProgress } = useSelector(state => state.DashboardSlice);

    const onFinish = (values) => {
        values.user_id = createGuid();
        values.create_date = new Date();
        dispatch(CREATE_USER(values)).then(result => {
            dispatch(resetCreateUserProgress(true))
            navigate('/dashboard');
        })

    };

    const onFinishFailed = (errorInfo) => {
    };

    return (
        <div style={{ display: "flex", justifyContent: "start", width: "100%" }}>
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='horizontal'
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
            >
                <Form.Item
                    label="Email"
                    name="user_email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Email!',
                        },
                    ]}
                >
                    <Input type={"email"} />
                </Form.Item>
                <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input first name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="last_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input last name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="user_password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="role_type"
                    label="Select Role"
                    rules={[
                        {
                            required: true,
                            message: 'Please select role!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a Role"
                        onChange={(e) => console.log(e)}
                        allowClear
                    >
                        <Option value={2}>Supervisor</Option>
                        <Option value={1}>Manager</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )
}

export default AddUser
