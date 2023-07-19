import React, { useCallback, useEffect, useState } from 'react';
import { Card, Button, DatePicker, message, Steps, theme, Form, Select, InputNumber, Radio, Modal, Input, TimePicker, Col, Row, } from 'antd';
// import { Button, DatePicker, Form, Input, InputNumber, Modal, Radio, Select, TimePicker } from "antd";
import moment from 'moment';
import ToastMessage from '../../../components/Toast';
import { CATEGORIE_END_POINT, CITY_END_POINT, CLASS_END_POINT, GUARDIAN_END_POINT, JOB_REQUEST_END_POINT, LOCATION_END_POINT, SUBJECT_END_POINT } from '../../../constants/index';
import { QUERY_KEYS } from '../../../constants/queryKeys.js';
import { post, put } from '../../../helpers/api_helper';
import { mapArrayToDropdown } from '../../../helpers/common_Helper.js';
import { useGetAllData } from '../../../utils/hooks/useGetAllData.js';


const App = (props) => {
    const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        // color: token.colorTextTertiary,
        // backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };
    console.log("setEditData", setEditData);
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { Option } = Select;
    const [allGuardianList, setAllGuardianList] = useState([]);
    const [allCategoryList, setAllCategoryList] = useState([]);
    const [allClassesList, setAllClassesList] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subject, setSubject] = useState([]);
    const [guardian, setGuardian] = useState([]);
    const [city, setCity] = useState([]);
    const [category, setCategory] = useState([]);
    const [location, setLocation] = useState([]);
    const [status, setStatus] = useState(true);
    const phoneNumberPattern = /^(?:01[3-9])\d{8}$/;
    // const isApproval = true;


    const steps = [
        {
            title: 'First',
            content: (
                <>
                    <Card className='mt-2 custom-card' bordered={false}>
                        <Form>

                            <Row className='mt-2' gutter={[16, 16]}>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        name="guardian"
                                        label="Guardian"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}

                                        hasFeedback
                                    >
                                        <Select
                                            // mode="multiple"
                                            placeholder="Please select Guardian"
                                            options={guardian}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8} offset={4}>
                                    <Form.Item
                                        name="category"
                                        label="Category"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}

                                        hasFeedback
                                    >
                                        <Select
                                            // mode="multiple"
                                            placeholder="Please select Category"
                                            options={category}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>




                            <Row className='mt-2' gutter={[16, 16]}>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        name="noOfStudent"
                                        label="Number of Students"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Number of students is required',
                                            },
                                            {
                                                type: 'number',
                                                min: 1,
                                                message: 'Number of students should be at least 1',
                                            },
                                            {
                                                type: 'number',
                                                max: 100,
                                                message: 'Number of students cannot exceed 100',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8} offset={4}>
                                    <Form.Item
                                        name="class"
                                        label="Select class"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select class!',
                                                type: 'array',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Please select class"
                                            options={classes}
                                        />
                                    </Form.Item>
                                </Col>

                            </Row>
                       

                            <Row className='mt-2' gutter={[16, 16]}>
                                <Col xs={24} md={8}>

                                    <Form.Item
                                        name="subject"
                                        label="Select Subject"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select subject!',
                                                type: 'array',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Please select subject"
                                            options={subject}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8} offset={4}>
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
                                            // mode="multiple"
                                            placeholder="Please select City"
                                            options={city}
                                        />
                                    </Form.Item>
                                </Col>

                            </Row>


                            <Row className='mt-2' gutter={[16, 16]}>
                                <Col xs={24} md={8}>
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
                                </Col>
                                <Col xs={24} md={8} offset={4}>
                                    <Form.Item
                                        label="Address"
                                        name="address"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter the full permanent address',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea
                                            rows={3}
                                            placeholder="Enter Full Address"
                                        />
                                    </Form.Item>
                                </Col>

                            </Row>













                        </Form>
                    </Card>
                </>
            ),
        },
        {
            title: 'Second',
            content: (
                <>

                    <Card className='mt-2 custom-card' bordered={false}>
                        <Form>
                            <Row className='mt-2' gutter={[16, 16]}>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        name="tuitionType"
                                        label="Type version"

                                    >
                                        <Select placeholder="Select a option" allowClear>
                                            <Option value={"Home Tutoring"}> Home Tutoring </Option>
                                            <Option value={"Online Tutoring"}>Online Tutoring</Option>
                                            <Option value={"Group Tutoring"}>Group Tutoring</Option>
                                            <Option value={"Package Tutoring"}>Package Tutoring</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8} offset={4}>
                                    <Form.Item
                                        name="studentGender"
                                        label="student Gender"

                                    >
                                        <Radio.Group>
                                            <Radio value="Male">Male</Radio>
                                            <Radio value="Female">Female</Radio>
                                            <Radio value="Any">Any</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>

                            </Row>


                            <Row className='mt-2' gutter={[16, 16]}>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        name="isApproval"
                                        label="Portal Access"
                                    >


                                        <Radio.Group>
                                            <Radio value={true}>Active</Radio>
                                            <Radio value={false}>Inactive</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8} offset={4}></Col>

                            </Row>


                            <Row className='mt-2' gutter={[16, 16]}>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        label="Hire Date"
                                        name="hireDate"

                                    >
                                        <DatePicker
                                            style={{ width: '300px', height: '40px' }}
                                            format="DD/MM/YYYY"
                                            onChange={handleDateChange}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8} offset={4}>
                                    <Form.Item
                                        label="Tutoring Time"
                                        name="tutoringTime"

                                    >
                                        <TimePicker
                                            style={{ width: '300px', height: '40px' }}
                                            format="h:mm A"
                                        />
                                    </Form.Item>
                                </Col>

                            </Row>

                        </Form>
                    </Card>
                </>
            ),
        },
        {
            title: 'Last',
            content: (
                <>
                    <Card className='mt-2 custom-card' bordered={false}>
                        <Form>

                            <Row className='mt-2' gutter={[16, 16]}>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        name="teacherGender"
                                        label="Tutor Gender"

                                    >
                                        <Radio.Group>
                                            <Radio value="Male">Male</Radio>
                                            <Radio value="Female">Female</Radio>
                                            <Radio value="Any">Other</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8} offset={4}>
                                    <Form.Item
                                        label="Preference Institute Name"
                                        name="preferenceInstitute"

                                    >
                                        <Input
                                            placeholder="Enter preference institute name"
                                        />
                                    </Form.Item>
                                </Col>

                            </Row>


                            <Row className='mt-2' gutter={[16, 16]}>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        label="Salary (BDT)"
                                        name="salary"
                                        rules={[
                                            { required: true, message: 'Please enter the expected salary per month' },
                                            { type: 'number', min: 3000, max: 200000, message: 'Salary must be between 3000 and 200000' },
                                            { type: 'number', message: 'Salary cannot be negative', transform: value => (value ? Math.abs(value) : value) },
                                        ]}
                                    >
                                        <InputNumber
                                            placeholder="Enter expected salary per month"
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8} offset={4}>
                                    <Form.Item
                                        label="More Requirement"
                                        name="requirement"

                                    >
                                        <Input.TextArea
                                            rows={2}
                                            placeholder="Enter Full requirement"
                                        />
                                    </Form.Item>
                                </Col>

                            </Row>


                            <Row className='mt-2' gutter={[16, 16]}>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        name="status"
                                        label="Status"
                                    // rules={[
                                    //   {
                                    //     required: true,
                                    //   },
                                    // ]}
                                    // hasFeedback
                                    // initialValue={true}
                                    >
                                        <Select placeholder="Select a option" allowClear>
                                            <Option value={true}>Active</Option>
                                            <Option value={false}>Inactive</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8} offset={4}></Col>

                            </Row>





                        </Form>
                    </Card>
                </>
            ),
        },
    ];

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

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

    const style = {
        background: "#0092ff",
        padding: "8px 0",
    };



    /** Fetch Guardian List */
    const {
        data: guardianList,
        isLoading,
        refetch: fetchGuardianList,
    } = useGetAllData(QUERY_KEYS.GET_ALL_GUARDIAN_LIST, GUARDIAN_END_POINT.get(1, -1, '', true));


    /**guarian dropdown */
    useEffect(() => {
        const GUARDIANDROPDOWN = mapArrayToDropdown(
            guardianList?.data?.data,
            'fullName',
            '_id'
        );
        setGuardian(GUARDIANDROPDOWN);
    }, [guardianList]);
    /** Fetch Guardian List End */




    /** Fetch category List */

    const {
        data: categoryList,
        refetch: fetchTotalCategory,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_CATEGORY_LIST,
        CATEGORIE_END_POINT.get(1, -1, '', true)
    );

    /**category dropdown */
    useEffect(() => {
        const CATEGORYDROPDOWN = mapArrayToDropdown(
            categoryList?.data,
            'name',
            '_id'
        );
        setCategory(CATEGORYDROPDOWN);
    }, [categoryList]);



    /** Fetch CategoryList List End */



    // fetch subject list
    const {
        data: subjectList,
        refetch: fetchSubjectList,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_SUBJECT_LIST,
        SUBJECT_END_POINT.get(1, -1, '', true)
    );
    //subject dropdown
    useEffect(() => {
        const SUBJECTDROPDOWN = mapArrayToDropdown(
            subjectList?.data,
            'name',
            '_id'
        );
        setSubject(SUBJECTDROPDOWN);
    }, [subjectList]);




    /**fetch class list */
    const {
        data: classList,
        // isLoading,
        refetch: fetchClassList,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_ClASS_LIST,
        CLASS_END_POINT.get(1, -1, '', true)
    );
    //class dropdown
    useEffect(() => {
        const CLASSDROPDOWN = mapArrayToDropdown(
            classList?.data,
            'name',
            '_id'
        );
        setClasses(CLASSDROPDOWN);
    }, [classList]);



    /** Fetch city */
    const {
        data: cityList,
        refetch: fetchCityList,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_CITY_LIST,
        CITY_END_POINT.get(1, -1, '', true)
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

    const {
        data: locationList,
        refetch: fetchLocationList,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_LOCATION_LIST,
        LOCATION_END_POINT.get(1, -1, '', true)
    );

    /**location dropdown */
    useEffect(() => {
        const LOCATIONDROPDOWN = mapArrayToDropdown(
            locationList?.data,
            'name',
            '_id'
        );
        setLocation(LOCATIONDROPDOWN);
    }, [locationList]);


    /**fetch location list  End */

    const handleDateChange = (date, dateString) => {
        const formattedDate = moment(dateString).format('MM/DD/YYYY');
        console.log(formattedDate);  // Output: 07/04/2023
        // You can update the form value or do any other necessary operations here
    };




    return (
        <>
            <Modal
                title={setEditData != null ? "Update Job Request" : "Add Job Request"}
                // style={{ top: 5 }}
                centered
                open={isModalOpen}
                footer={null}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                // style={{ marginTop: '5vh' }}
                width={1200}
                responsive={{
                    // Define different widths for different screen sizes
                    xs: 300,
                    sm: 500,
                    md: 800,
                    lg: 1000,
                    xl: 1200,
                    xxl: 1400,
                }}
            >
                <Steps current={current} items={items} />
                <div style={contentStyle}>{steps[current].content}</div>
                <div
                    style={{
                        marginTop: 24,
                    }}
                >
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={() => prev()}
                        >
                            Previous
                        </Button>
                    )}
                </div>

            </Modal>
        </>
    );
};
export default App;
