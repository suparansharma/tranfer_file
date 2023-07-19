import { Button, Form, Input, Modal, Select } from 'antd';
import { useCallback, useState } from 'react';
import ToastMessage from '../../../components/Toast';
import { USER_END_POINT } from '../../../constants/index';
import { post, put } from '../../../helpers/api_helper';
function UserForm(props) {
    const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
console.log("setEditData",setEditData);

    const { Option } = Select;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const phoneNumberPattern = /^(?:01[3-9])\d{8}$/;
    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 6,
            span: 16,
        },
    };




    if (setEditData == null) {
        form.resetFields();
    } else {
        form.setFieldsValue({
            name: setEditData.fullName,
            phone: setEditData.phone,
            email: setEditData.email,
            role: setEditData.role
        });
    }




    const onFinish = async (values) => {
        setLoading(true);
        if (setEditData?._id) {
            try {
                const update = await put(USER_END_POINT.update(setEditData._id), values);
                if (update.status == 'SUCCESS') {
                    notify('success', update.message);
                    if (isParentRender) {
                        isParentRender(true);
                    }
                    setIsModalOpen(false);
                }
            } catch (error) {
                notify('error', update.errorMessage);
                setLoading(false);
            }
        } else {
            const response = await post(USER_END_POINT.create(), values);
            if (response.status === 'SUCCESS') {
                notify('success', response.message);
                if (isParentRender) {
                    isParentRender(true);
                }
                setIsModalOpen(false);
            } else {
                notify('error', response.errorMessage);
                setLoading(false);
            }
            // setLoading(false);

        }

        setIsModalOpen(!isModalOpen);
        setLoading(false);
    };
    const onFinishFailed = (errorInfo) => {
        notify('error', errorInfo);
        // console.log('Failed:', errorInfo);
    };
    return (
        <Modal
            title={setEditData != null ? 'Update Subject' : 'Add Subject'}
            style={{ top: 20 }}
            centered
            open={isModalOpen}
            footer={null}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
        >
            <Form
                className='mt-3'
                {...layout}
                {...setEditData}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    name="fullName"
                    label="FullName"
                    rules={[
                        {
                            required: true,
                            message: 'Full name is required',
                        },
                        {
                            pattern: /^[A-Za-z\s]+$/,
                            message: 'Full name should only contain letters and spaces',
                        },
                        {
                            max: 50,
                            message: 'Full name should not exceed 50 characters',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                        {
                            required: true,
                            pattern: phoneNumberPattern,
                            message: 'Please enter a valid Bangladeshi phone number!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: "Please enter a valid email address!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="role"
                    label="User Type"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    initialValue={true}
                    hasFeedback
                >
                    <Select placeholder="Select a option" allowClear>
                        {/* <Option value={1}>Super Admin</Option>
                        <Option value={2}>Suport</Option> */}
                        <Option value={3}>Admin</Option>
                        <Option value={4}>Teacher</Option>
                        <Option value={5}>Guardian</Option>
                    </Select>
                </Form.Item>
 

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
export default UserForm;

