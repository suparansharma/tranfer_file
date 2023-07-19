import { Button, Form, Input, Modal, Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import ToastMessage from '../../../components/Toast';
import {
    CLASS_END_POINT,
    CATEGORIE_END_POINT,
} from '../../../constants/index.js';
import { QUERY_KEYS } from '../../../constants/queryKeys.js';
import { post, put } from '../../../helpers/api_helper.js';
import { mapArrayToDropdown } from '../../../helpers/common_Helper.js';
import { useGetAllData } from '../../../utils/hooks/useGetAllData.js';

function CategoryFrom(props) {
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;
    console.log({ setEditData });
    const { Option } = Select;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [subject, setSubject] = useState([]);
    const [classes, setClasses] = useState([]);
    const [status, setStatus] = useState(true);

    if (setEditData == null) {
        form.resetFields();
    } else {
        form.setFieldsValue({
            name: setEditData.name,
            code: setEditData.code,
            class: setEditData?.class?.map((t) => t.classId)?.map((t) => t?._id),
            status: setEditData.status,
        });
    }



    /**fetch class list */

    const {
        data: classList,
        refetch: fetchClassList,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_ClASS_LIST,
        CLASS_END_POINT.get(1, -1, '',status)
    );
    //class dropdown
    useEffect(() => {
        const CLASSDROPDOWN = mapArrayToDropdown(
            classList?.data,
            'name',
            '_id'
        );
        setClasses(CLASSDROPDOWN);
    }, [classList]);


    /**fetch class list  End */





    const onFinish = async (values) => {
        setLoading(true);

        const classes = values.class?.map((classId) => ({
            classId: classId,
        }));
        values.class = classes;

        try {
            if (setEditData?._id) {
                const update = await put(CATEGORIE_END_POINT.update(setEditData?._id), values);
                console.log(update)
                if (update.status === 'SUCCESS') {
                    notify('success', update.message);
                    if (isParentRender) {
                        isParentRender(true);
                    }
                    setIsModalOpen(false);
                } else {
                    notify('error', update.errorMessage);
                    setLoading(false);
                }
            } else {
                const response = await post(CATEGORIE_END_POINT.create(), values);
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
            }
            setLoading(false);
        } catch (error) {
            notify('error', error.message);
            setLoading(false);
        }
    };

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

    return (
        <Modal
            title={setEditData ? 'Update' : 'Add'}
            style={{ top: 20 }}
            centered
            open={isModalOpen}
            footer={null}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
        >
            <Form
                className="mt-3"
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    name="name"
                    label="Category"
                    rules={[
                        {
                            required: true,
                            message: 'Category name is required',
                        },
                        {
                            pattern: /^[A-Za-z][A-Za-z0-9\s]*$/,
                            message: 'Category name should start with a letter and can only contain letters, numbers, and spaces',
                        },
                        {
                            max: 50,
                            message: 'Category name should not exceed 50 characters',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    name="code"
                    label="Code Id"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    initialValue={true}
                    hasFeedback
                >
                    <Select placeholder="Select a option" allowClear>
                        <Option value={"KT"}>KT</Option>
                        <Option value={"MT"}>MT</Option>
                    </Select>
                </Form.Item>






                <Form.Item
                    name="class"
                    label="Select Class"
                    rules={[
                        {
                            required: true,
                            message: 'Please select subject!',
                            type: 'array',
                        },
                    ]}
                    hasFeedback
                >
                    <Select
                        mode="multiple"
                        placeholder="Please select subject"
                        options={classes}
                    />
                </Form.Item>



                <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    initialValue={true}
                    hasFeedback
                >
                    <Select placeholder="Select a option" allowClear>
                        <Option value={true}>Active</Option>
                        <Option value={false}>Inactive</Option>
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
export default CategoryFrom;
