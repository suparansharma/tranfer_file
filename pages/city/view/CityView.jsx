import { Card, Col, Descriptions, Modal, Row, Tag } from 'antd';
import moment from 'moment';

function CityView(props) {
  const { isViewModalOpen, setIsViewModalOpen, city } = props;
  console.log(city);
  return (
    <Modal
      title={'City Info'}
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
              <Descriptions.Item label="City Name">
                {city?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {city?.status == true ? (
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
                {city?.createdBy?.fullName}
              </Descriptions.Item>

              <Descriptions.Item label="Created at">
                {moment(city?.createdAt).format('DD-MM-YYYY')}
              </Descriptions.Item>


            </Descriptions>
          </Col>
          <Col >
            <Descriptions >
              <Descriptions.Item label="Updated By">
                {city?.updatedBy?.fullName || "No one update"}
              </Descriptions.Item>

              <Descriptions.Item label="Updated at">
                {moment(city?.updatedAt).format('DD-MM-YYYY')}
              </Descriptions.Item>
            </Descriptions>
          </Col>


        </Row>
      </Card>
    </Modal>
  );
}
export default CityView;
