import { Button, Form, Input, Modal, Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import ToastMessage from '../../../components/Toast';
import { CITY_END_POINT, GUARDIAN_END_POINT, LOCATION_END_POINT } from '../../../constants/index';
import { QUERY_KEYS } from '../../../constants/queryKeys.js';
import { get, post, put } from '../../../helpers/api_helper';
import { mapArrayToDropdown } from '../../../helpers/common_Helper.js';
import { useGetAllData } from '../../../utils/hooks/useGetAllData.js';

function GuardianForm(props) {
  const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const { Option } = Select;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState([]);
  const [selectCity, setSelectCity] = useState(null);
  const [location, setLocation] = useState([]);
  const phoneNumberPattern = /^(?:01[3-9])\d{8}$/;
  const [isEdit , setIsEdit] = useState(false);
  const [visited, setIsVisited] = useState(false);
console.log(setEditData);



  /** Fetch city */
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

 /** end city dropdown */




  /**fetch location list */

  const handleCity = async (value) => {    
    setIsVisited(true);
  const fetchLocation = await get(LOCATION_END_POINT.getLocationByCityId(value));
   const LOCATIONDROPDOWN = mapArrayToDropdown(
    fetchLocation.data,
    'name',
    '_id'
  );
    setLocation(LOCATIONDROPDOWN)
  }

  /**fetch location list  End */


/** from design  */
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
/** end from design  */


/** create from or edit from   */
  

    if (setEditData != null && visited == false ) {
      form.setFieldsValue({
        fullName: setEditData?.fullName,
        phone: setEditData?.phone,
        city: setEditData?.city?._id,
        location: setEditData?.location?._id,
        address: setEditData?.address,
        email: setEditData?.email,
        isPortalAccess: setEditData?.isPortalAccess,
        status: setEditData?.status,
      });
    } else if(setEditData == null && visited == false  ) {
      form.resetFields();
    }

    const afterModalClose = () => {
      setIsVisited(false)
    }
    


 
/** create from or edit from end  */


/** create from or edit from submits  */
  const onFinish = async (values) => {
    setLoading(true);
    if (setEditData?._id) {
      try {
        const update = await put(GUARDIAN_END_POINT.update(setEditData._id), values);
        if (update.status == 'SUCCESS') {
          notify('success', update.message);
        }
      } catch (error) {
        notify('error', update.errorMessage);
        setLoading(false);
      }
    } else {
      const response = await post(GUARDIAN_END_POINT.create(), values,);
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
/** create from or edit from submits end  */


  const onFinishFailed = (errorInfo) => {
    notify('error', errorInfo);
  };

  
  return (
    <Modal
      title={setEditData != null ? 'Update Gaurdian' : 'Add Guardian'}
      style={{ top: 20 }}
      centered
      open={isModalOpen}
      footer={null}
      afterClose={afterModalClose}
      onOk={() => setIsModalOpen(false)
      }
      onCancel={() =>setIsModalOpen(false) 
       }
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
          <Input  />
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
            onChange={handleCity}
            placeholder="Please select City"
            options={city}
          />
        </Form.Item>


        <Form.Item
          name="location"
          label="Location"
          rules={[
            {
              required: true,
              message: 'Please select Location!',
              
            },
          ]}
          hasFeedback

        >
              <Select
            // mode="multiple"
            placeholder="Please select Location"
            options={location}
          />
        </Form.Item>


        <Form.Item
          name="address"
          label="Address"
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
          name="isPortalAccess"
          label="Portal Access"
          rules={[
            {
              required: true,
            },
          ]}
          initialValue={false}
        >
          <Select placeholder="Select a option" allowClear>
            <Option value={true}>Active</Option>
            <Option value={false}>Inactive</Option>
          </Select>
        </Form.Item>




        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
          initialValue={true}
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
export default GuardianForm;