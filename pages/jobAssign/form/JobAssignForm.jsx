import { Button, Form, Input, Modal, Select, InputNumber } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import ToastMessage from '../../../components/Toast';
import {
  JOB_ASSIGN_END_POINT,
  SUBJECT_END_POINT,
  JOB_REQUEST_END_POINT
  
} from '../../../constants/index.js';
import { QUERY_KEYS } from '../../../constants/queryKeys.js';
import { get, post, put } from '../../../helpers/api_helper';
import { mapArrayToDropdown } from '../../../helpers/common_Helper.js';
import { useGetAllData } from '../../../utils/hooks/useGetAllData.js';

function ClassForm(props) {
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;
  const { Option } = Select;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [jobList, setJobList] = useState([]);
  const [visited, setIsVisited] = useState(false);
  const [tutorList, setTutorList] = useState([]);
  const [status, setStatus] = useState(true);
  if (setEditData != null && visited == false) {
    
    form.setFieldsValue({
      jobId: setEditData.jobId?.name,
      tutorId: setEditData.tutorId?.name,
      comment: setEditData.comment,
    });
  } else if(setEditData == null && visited == false  ) {
    form.resetFields();
  }


  /**fetch subject list */

  const {
    data: jobRequestList,
    isLoading,
    refetch: fetchJobRequestList,
  } = useGetAllData(
    QUERY_KEYS.GET_ALL_JOB_REQUEST_LIST,
    JOB_REQUEST_END_POINT.get(1, -1, '',true)
  );


  /**subject dropdown */
  useEffect(() => {
    const JOBROPDOWN = mapArrayToDropdown(
      jobRequestList?.data,
      'jobId',
      '_id'
    );
    setJobList(JOBROPDOWN);
  }, [jobRequestList]);

  /**fetch subject list  End */

  /**fetch tutor list */

  const handleTutor = async (value) => {    
    setIsVisited(true);
  const fetchTutor = await get(JOB_REQUEST_END_POINT.getTutorByJobId(value));
   const TUTORDROPDOWN = mapArrayToDropdown(
    fetchTutor.data,
    'fullName',
    '_id'
  );
    setTutorList(TUTORDROPDOWN)
  }

  /**fetch tutor list  End */

  const afterModalClose = () => {
    setIsVisited(false)
  }



  const onFinish = async (values) => {
    setLoading(true);

    const subjects = values.subject?.map((subjectId) => ({
      subjectId: subjectId,
    }));
    // setEditData.subject = subjects;
    values.subject = subjects;
    try {
      if (setEditData?._id) {
        const update = await put(JOB_ASSIGN_END_POINT.update(setEditData?._id), values);
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
        const response = await post(JOB_ASSIGN_END_POINT.create(), values);
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
          name="jobId"
          label="Select Job"
          rules={[
            {
              required: true,
              message: 'Please select Job!',
             
            },
          ]}
          hasFeedback
        >
          <Select
            // mode="multiple"
            onChange={handleTutor}
            placeholder="Please select Job"
            options={jobList}
          />
        </Form.Item>

        <Form.Item
          name="tutorId"
          label="Tutor"
          rules={[
            {
              required: true,
              message: 'Please select Tutor!',
              
            },
          ]}
          hasFeedback

        >
              <Select
            // mode="multiple"
            placeholder="Please select Tutor"
            options={tutorList}
          />
        </Form.Item>

        <Form.Item
          name="comment"
          label="Comment"
          rules={[
            {
              pattern: /^[A-Za-z][A-Za-z0-9\s]*$/,
              message: 'Class name should start with a letter and can only contain letters, numbers, and spaces',
            },
            {
              max: 50,
              message: 'Class name should not exceed 50 characters',
            },
          ]}
          hasFeedback
        >
          <Input />
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
