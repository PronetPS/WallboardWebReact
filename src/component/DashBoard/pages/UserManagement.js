import React, { useEffect, useState } from 'react';
import { Table, Space, Tag, Spin, Modal, Form, Input, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_USER, GET_ALL_USER, UPDATE_USER } from '../../utils/Userservice/Api';
import { Popconfirm } from 'antd';
import { toast } from 'react-toastify';
import { resetCreateUserProgress } from '../store/dashboardSlice';


const { Option } = Select;

function UserManagement() {
    const { allUser, isProcess, userCreatStatus } = useSelector(state => state.DashboardSlice);
    const { loginUser } = useSelector(state => state.UserSlice);


    const dispatch = useDispatch();
    const [editDialog, seteditDialog] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        if (loginUser?.role_type === 0) {
            dispatch(GET_ALL_USER());
        }
        dispatch(resetCreateUserProgress())
    }, [])

    useEffect(() => {
        if (userCreatStatus) {
            toast("User Successfully Created!");
            dispatch(resetCreateUserProgress(false))
        }
    }, [])


    const handleCancel = () => {
        seteditDialog(false);
        setUserObj(null)
    };


    const confirm = (e) => {
        dispatch(DELETE_USER(e)).then(res => {
            dispatch(GET_ALL_USER());
            toast("User Successfully deleted!");
        })
    }

    const cancel = (e) => {
        // message.error('Click on No');
    }

    const onFinish = (values) => {
        values.user_id = userObj.user_id
        dispatch(UPDATE_USER(values)).then(result => {
            handleCancel();
            toast("User Successfully Updated!");
            dispatch(GET_ALL_USER());
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'name',
            render: text => <div style={{
                fontSize: "1rem", fontWeight: 600, color: "#4f4d4d"
            }}>{text}</div>,
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
            render: text => <div style={{
                fontSize: "1rem", fontWeight: 600, color: "#4f4d4d"
            }}>{text}</div>,
        },
        {
            title: 'Email',
            dataIndex: 'user_email',
            key: 'email',
            render: text => <div style={{
                fontSize: "1rem", fontWeight: 600, color: "#4f4d4d"
            }}>{text}</div>,
        },
        {
            title: 'Designation',
            dataIndex: 'role_type',
            key: 'role_type',
            render: (text, record) => (
                <div>{record.role_type === 1 ? <Tag color="cyan" style={{
                    fontSize: "0.9rem", padding: "5px 8px", fontWeight: 700
                }}>Manager</Tag> : <Tag color="green"
                    style={{
                        fontSize: "0.9rem", padding: "5px 8px", fontWeight: 700
                    }}>Supervisor</Tag>}</div>
            )
        },
        {
            title: 'Update',
            key: 'Update',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => {
                        seteditDialog(true);
                        setUserObj(record);
                    }} style={{
                        fontSize: "1rem", fontWeight: 600
                    }}>edit</a>
                </Space>
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
                <Popconfirm
                    title="Are you sure to delete user?"
                    onConfirm={() => confirm(record.user_id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Space size="middle">
                        <a style={{
                            fontSize: "1rem", fontWeight: 600
                        }}>Delete</a>
                    </Space>
                </Popconfirm>

            ),
        },
    ];

    let tem_data = [];
    tem_data = allUser?.map((item, ind) => ({
        key: ind,
        first_name: item.first_name,
        last_name: item.last_name,
        user_email: item.user_email,
        role_type: item.role_type,
        user_id: item.user_id,
        user_password: item.user_password,
    }));

    return (
        <>
            {
                isProcess ?
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh" }}>
                        <Spin size="large" tip="Loading..." />
                    </div> :
                    <div>
                        {tem_data && <Table columns={columns} dataSource={tem_data} pagination={false} scroll={{ y: 500, x: 768 }} bordered />}
                    </div>

            }
            {editDialog &&
                <Modal title="Update User"
                    visible={editDialog}
                    onCancel={handleCancel}
                    footer={false}>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout='horizontal'
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            ["user_email"]: userObj.user_email,
                            ["first_name"]: userObj.first_name,
                            ["last_name"]: userObj.last_name,
                            ["user_password"]: userObj.user_password,
                            ["role_type"]: userObj.role_type,
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
                                offset: 18,
                                span: 24,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>}
        </>

    )
}

export default UserManagement
