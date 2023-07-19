import { Card, Descriptions, Modal, Tag, Row, Col } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

function ClassView(props) {
  const { isViewModalOpen, setIsViewModalOpen, classes } = props;
  const [subjects, setSubjects] = useState([])
  useEffect(() => {
    setSubjects(classes?.subject)
  }, [classes])
  return (
    <Modal
      title={'Classes Info'}
      style={{ top: 20 }}
      centered
      visible={isViewModalOpen}
      footer={null}
      width={800}
      onOk={() => setIsViewModalOpen(false)}
      onCancel={() => setIsViewModalOpen(false)}
    >
      <Card bordered={false}>
        <Row>
          <Col >
            <Descriptions >
              <Descriptions.Item label="Class Name">
                {classes?.name}
              </Descriptions.Item>

              <Descriptions.Item label="Subjects">
                {subjects?.map((item, index) => (
                  <span key={item?.subjectId?._id}>
                    {item?.subjectId?.name}
                    {index < subjects.length - 1 ? ', ' : '.'}
                  </span>
                ))}
              </Descriptions.Item>

            </Descriptions>
          </Col>
          <Col >
            <Descriptions >
              <Descriptions.Item label="Created By">
                {classes?.createdBy?.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Created at">
                {moment(classes?.createdAt).format('DD-MM-YYYY')}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col >
            <Descriptions >
              <Descriptions.Item label="Upadted By ">
                {classes?.updatedBy?.fullName || "No one update"}
              </Descriptions.Item>

              <Descriptions.Item label="Updated at">
                {moment(classes?.updatedAt).format('DD-MM-YYYY')}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col >

            <Descriptions >
              <Descriptions.Item label="Status">
                {classes?.status == true ? (
                  <Tag color='green'>Active</Tag>
                ) : (
                  <Tag color='volcano'>Inactive</Tag>
                )}
              </Descriptions.Item>
            </Descriptions>
          </Col>

        </Row>
      </Card>
    </Modal>

  );
}
export default ClassView;
