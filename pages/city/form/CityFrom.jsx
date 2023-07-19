import { Button, Form, Input, Modal, Select } from 'antd';
import { useCallback, useState } from 'react';
import ToastMessage from '../../../components/Toast';
import { CITY_END_POINT } from '../../../constants/index';
import { post, put } from '../../../helpers/api_helper';
function CityForm(props) {
  const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;

  console.log(setEditData);
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const { Option } = Select;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
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
  if (setEditData != null) {
    console.log({setEditData})
    form.setFieldsValue({
      name: setEditData.name,
      status: setEditData.status,
    });
  } else {
    form.resetFields();
  }

  const onFinish = async (values) => {
    setLoading(true);
    if (setEditData?._id) {
      try {
        const update = await put(CITY_END_POINT.update(setEditData._id),values);
        if (update.status == 'SUCCESS') {
          notify('success', update.message);
        }
      } catch (error) {
        notify('error', update.errorMessage);
        setLoading(false);
      }
    } else {
      const response = await post(CITY_END_POINT.create(), values);
      if (response.status === 'SUCCESS') {
        notify('success', response.message);
        if (isParentRender) {
          isParentRender(true);
        }
      } else {
        notify('error', response.errorMessage);
        setLoading(false);
      }
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
      title={setEditData != null ? 'Update City' : 'Add City'}
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
          name="name"
          label="City Name"
          rules={[
            {
              required: true,
              message: 'City name is required',
            },
            {
              pattern: /^[A-Za-z\s]+$/,
              message: 'City name should only contain letters and spaces',
            },
            {
              max: 50,
              message: 'City name should not exceed 50 characters',
            },
          ]}
          hasFeedback
        >
          <Input />
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
export default CityForm;
