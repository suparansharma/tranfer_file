import { Card, Descriptions, Modal, Tag, Row, Col } from 'antd';
import moment from 'moment';
import DataTable from 'react-data-table-component';

function LocationView(props) {
  const { isViewModalOpen, setIsViewModalOpen, location } = props;

  return (
    <Modal
      title={'Location Info'}
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
              <Descriptions.Item label="Location Name">
                {location?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {location?.status == true ? (
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
                {location?.createdBy?.fullName}
              </Descriptions.Item>

              <Descriptions.Item label="Created at">
                {moment(location?.createdAt).format('DD-MM-YYYY')}
              </Descriptions.Item>


            </Descriptions>
          </Col>
          <Col >
            <Descriptions >
              <Descriptions.Item label="Updated By">
                {location?.updatedBy?.fullName || "No one update"}
              </Descriptions.Item>

              <Descriptions.Item label="Updated at">
                {moment(location?.updatedAt).format('DD-MM-YYYY')}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </Modal>
  );
}
export default LocationView;
