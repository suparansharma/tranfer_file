import { DingtalkOutlined, EnvironmentOutlined, ReadOutlined,CalendarOutlined } from '@ant-design/icons';
import { faPerson, faPersonDress,faCalendarAlt,faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { Fragment,useEffect, useState } from 'react';
import { DASHBOARD_END_POINT } from '../../constants/index';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { useGetAllData } from '../../utils/hooks/useGetAllData';
import { get } from '../../helpers/api_helper';
const { Text, Link } = Typography;
const Dashboard = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { data: dashboard } = useGetAllData(QUERY_KEYS.GET_ALL_DASHBOARD, DASHBOARD_END_POINT.dashbord(true));
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const onDetails = async (value) => {
    console.log(value);
    await router.push(`/dashboard/${value}`)
  }

  // const update = await get(DASHBOARD_END_POINT.dashbord(true));

const[dashboard,setDashboard] = useState([]);
  useEffect(() => {
    const fetchAllRoomType = async () => {
      let isSubscribed = true;

      await get(DASHBOARD_END_POINT.dashbord(true))
        .then((res) => {
          if (isSubscribed) {
            setDashboard(res)
          }
        })
        .catch((err) => {
          console.log("Server Error ~!")
        });

      return () => isSubscribed = false;

    };

    fetchAllRoomType();
  }, []);
  return (
    <div className='container'>
    <Row gutter={[8, 16]} justify="space-between">
      {dashboard?.data?.map((t, i) => (
        <Col key={i} className="gutter-row" xs={24} sm={24} md={12} lg={8}>
          <Card className='mt-2 custom-card' title={t.title} bordered={false} style={{ height: '300px' }}>

            
            <Row>
              <Col md={10}>
                <Text type="secondary">Job ID: <Text strong>{t?.jobId}</Text></Text>
              </Col>
              {/* <Col md={1}><Text type="secondary" strong>|</Text></Col>
              <Col md={10}>
                <Text type="secondary">Posted Date: <Text strong>{t.postedDate}</Text></Text>
              </Col> */}
            </Row>


            <Row className="mt-2">
             
             <Col md={24}>
               <CalendarOutlined style={{ fontSize: '18px', color: '#08c' }} />
               <Text type="secondary">Posted Date: <Text strong>{t.postedDate}</Text></Text>
             </Col>
           </Row>


            <Row className="mt-2">
             
              <Col md={24}>
                <ReadOutlined style={{ fontSize: '18px', color: '#08c' }} />
                <Text type="secondary"> Subjects: </Text>
                <Text strong>{t.subjects}</Text>
              </Col>
            </Row>


            <Row className="mt-2">
              <Col>
                <EnvironmentOutlined style={{ fontSize: '18px', color: '#08c' }} />
                <Text type="secondary"> Location: </Text>
                <Text strong>{t.address}</Text>
              </Col>
            </Row>

            <Row className="mt-2" >
            {/* PuzzleOutlined */}
            <Col md={12}>
            <FontAwesomeIcon icon={faPuzzlePiece} style={{ fontSize: '18px', color: '#08c' }} />
                <Text type="secondary">Tuition Type:</Text>
                <Text strong>Home</Text>
              </Col>
              <Col md={12}>
                <DingtalkOutlined style={{ fontSize: '18px', color: '#08c' }} />
                <Text type="secondary"> Salary: </Text>
                <Text strong>{t.salary}</Text>
              </Col>
            </Row>


            <Row className="mt-2" justify="space-between">
              <Col>
                <FontAwesomeIcon
                  color={t.preferredGender === 'Male' ? 'green' : 'red'}
                  icon={t.preferredGender === 'Male' ? faPerson : faPersonDress}
                  style={{ fontSize: '1rem' }}
                />
                <Text>{" "}</Text>
                <Text strong> {t.preferredGender} <Text type="secondary">tutor preferred</Text></Text>
              </Col>
              <Col>
                <Button type="primary" onClick={() => onDetails(t.jobId)}>Details</Button>
              </Col>
            </Row>


          </Card>
        </Col>
      ))}
    </Row>
  </div>
  );
};

export default Dashboard;
