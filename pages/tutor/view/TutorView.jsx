import { Card, Descriptions, Modal, Tag, Row, Col } from 'antd';
import moment from 'moment';

function TutorView(props) {
    const { isViewModalOpen, setIsViewModalOpen, tutor } = props;
    console.log("tutor", tutor);
    return (
        <div>
            <Modal
                title={'Tutor Info'}
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
                                <Descriptions.Item label="tutor Name">
                                    {tutor?.fullName}
                                </Descriptions.Item>
                                <Descriptions.Item label="tutor Phone">
                                    {tutor?.phone}
                                </Descriptions.Item>
                                <Descriptions.Item label="Status">
                                    {tutor?.status == true ? (
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
                                    {tutor?.createdBy?.fullName}
                                </Descriptions.Item>

                                <Descriptions.Item label="Created at">
                                    {moment(tutor?.createdAt).format('DD-MM-YYYY')}
                                </Descriptions.Item>


                            </Descriptions>
                        </Col>
                        <Col >
                            <Descriptions >
                                <Descriptions.Item label="Updated By">
                                    {tutor?.updatedBy?.fullName || "No one update"}
                                </Descriptions.Item>

                                <Descriptions.Item label="Updated at">
                                    {moment(tutor?.updatedAt).format('DD-MM-YYYY')}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </Card>
            </Modal>
        </div>
    );
}

export default TutorView;