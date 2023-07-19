import { Card, Descriptions, Modal, Tag, Row, Col } from 'antd';
import moment from 'moment';

function SubjectView(props) {
  const { isViewModalOpen, setIsViewModalOpen, subject } = props;
  console.log("subject", subject);
  return (
    <Modal
      title={'Subject Info'}
      style={{ top: 20 }}
      centered
      open={isViewModalOpen}
      footer={null}
      width={800}
      onOk={() => setIsViewModalOpen(false)}
      onCancel={() => setIsViewModalOpen(false)}
    >
      <Card bordered={false}>
        <Row>

          <Col >
            <Descriptions >
              <Descriptions.Item label="Subject Name">
                {subject?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {subject?.status == true ? (
                  <Tag color='green'>Active</Tag>
                ) : (
                  <Tag color='volcano'>Inactive</Tag>
                )}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col >
            <Descriptions >
              <Descriptions.Item label="Created By">
                {subject?.createdBy?.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Created at">
                {moment(subject?.createdAt).format('DD-MM-YYYY')}
              </Descriptions.Item>
            </Descriptions>

          </Col>

          <Col >
            <Descriptions >
              <Descriptions.Item label="Updated By">
                {subject?.updatedBy?.fullName || "No one update"}
              </Descriptions.Item>
              <Descriptions.Item label="Updated at">
                {moment(subject?.updatedAt).format('DD-MM-YYYY')}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>



      </Card>
    </Modal>
  );
}
export default SubjectView;
