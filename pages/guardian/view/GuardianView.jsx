import { Card, Descriptions, Modal, Tag, Row, Col } from 'antd';
import moment from 'moment';

function GuardianView(props) {
    const { isViewModalOpen, setIsViewModalOpen, guardian } = props;
    console.log("guargian",guardian);
    return (
        <div>
        <Modal
        title={'guardian Info'}
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
            <Descriptions.Item label="Guardian Name">
              {guardian?.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Guardian Phone">
              {guardian?.phone}
            </Descriptions.Item>
      
            </Descriptions>
            </Col>
            <Col >

          <Descriptions >
            <Descriptions.Item label="Status">
              {guardian?.status == true ? (
                <Tag color='green'>Active</Tag>
              ) : (
                <Tag color='volcano'>Inactive</Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Created at">
              {moment(guardian?.createdAt).format('DD-MM-YYYY')}
            </Descriptions.Item>
            <Descriptions.Item label="Updated at">
              {moment(guardian?.updatedAt).format('DD-MM-YYYY')}
            </Descriptions.Item>
            </Descriptions>
            </Col>
          </Row>
        </Card>
      </Modal>
      </div>
    );
}

export default GuardianView;