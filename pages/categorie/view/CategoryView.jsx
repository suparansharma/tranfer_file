import { Card, Descriptions, Modal, Tag, Row, Col } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

function CategoryView(props) {
  const { isViewModalOpen, setIsViewModalOpen, category } = props;
  const [classes, setClasses] = useState([]);
  console.log(category)
  useEffect(() => {
    setClasses(category?.class)
  }, [category])
  return (
    <Modal
      title={'category Info'}
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
              <Descriptions.Item label="Category Name">
                {category?.name}
              </Descriptions.Item>

              <Descriptions.Item label="Classes">
                {classes?.map((item, index) => (
                  <span key={item?.classId?._id}>
                    {item?.classId?.name}
                    {index < classes.length - 1 ? ', ' : '.'}
                  </span>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {category?.status == true ? (
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
                {category?.createdBy?.fullName}
              </Descriptions.Item>

              <Descriptions.Item label="Created at">
                {moment(category?.createdAt).format('DD-MM-YYYY')}
              </Descriptions.Item>

            </Descriptions>
          </Col>

          <Col >
            <Descriptions >
              <Descriptions.Item label="Updated By">
                {category?.updatedBy?.fullName || "No one update"}
              </Descriptions.Item>
              <Descriptions.Item label="Updated at">
                {moment(category?.updatedAt).format('DD-MM-YYYY')}
              </Descriptions.Item>
            </Descriptions>
          </Col>


        </Row>
      </Card>
    </Modal>
  );
}
export default CategoryView;
