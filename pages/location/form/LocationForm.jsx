import { Button, Form, Input, Modal, Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import ToastMessage from '../../../components/Toast';
import {
    LOCATION_END_POINT,
     CITY_END_POINT
} from '../../../constants/index.js';
import { QUERY_KEYS } from '../../../constants/queryKeys.js';
import { post, put } from '../../../helpers/api_helper.js';
import { mapArrayToDropdown } from '../../../helpers/common_Helper.js';
import { useGetAllData } from '../../../utils/hooks/useGetAllData.js';

function ClassForm(props) {
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;
  console.log({ setEditData });
  const { Option } = Select;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState([]);
  console.log(setEditData);


  if (setEditData != null) {
    form.setFieldsValue({
      name: setEditData.name,
      city: setEditData?.city?._id,
      status: setEditData.status,
    });
  } else {
    form.resetFields();
  }





  /**fetch city list */

  const {
    data: cityList,
    isLoading,
    refetch: fetchCityList,
  } = useGetAllData(
    QUERY_KEYS.GET_ALL_CITY_LIST,
    CITY_END_POINT.get(1, -1, '',true)
  );

  /**city dropdown */
  useEffect(() => {
    const CITYDROPDOWN = mapArrayToDropdown(
      cityList?.data,
      'name',
      '_id'
    );
    setCity(CITYDROPDOWN);
  }, [cityList]);


  /**fetch city list  End */





  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (setEditData?._id) {
        const update = await put(LOCATION_END_POINT.update(setEditData?._id), values);
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
        const response = await post(LOCATION_END_POINT.create(), values);
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
          label="Location"
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="city"
          label="Select City"
          rules={[
            {
              required: true,
              message: 'Please select City!',
              
            },
          ]}
          hasFeedback
        >
          <Select
            // mode="multiple"
            placeholder="Please select City"
            options={city}
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
export default ClassForm;
