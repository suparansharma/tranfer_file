import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, EyeOutlined } from '@ant-design/icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Layout, Modal, Row, Tag, theme } from 'antd';
import { useCallback, useState } from 'react';
import DataTable from 'react-data-table-component';
import HeadSection from '../../components/HeadSection';
import ToastMessage from '../../components/Toast';
import DebouncedSearchInput from '../../components/elements/DebouncedSearchInput';
import { JOB_REQUEST_END_POINT } from '../../constants/index';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { del } from '../../helpers/api_helper';
import { useGetAllData } from '../../utils/hooks/useGetAllData';
import TutorRequestFrom from './form/TutorRequestFrom';
// import TutorRequestFrom from './form/create';
import JobRequestView from './view/JobRequestView';
// JobRequestView.jsx
const JobRequestDetails = () => {
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const { confirm } = Modal;
    const { Content } = Layout;
    const { token: { colorBgContainer } } = theme.useToken();
    const [pending, setPending] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState({});
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [jobRequest, setJobRequest] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [jobReq, setJobReq] = useState({});

    /** Creation modal  */
    const handleShow = () => {
        setIsModalOpen(true)
        setEditData(null);
    };
    /** Creation modal end  */

    /** Update modal  */
    const handleOpen = (data) => {
        setEditData(data);
        setIsModalOpen(true)
    }
    /** Update modal end  */

    /**View  Modal form */



    const handleViewOpen = (data) => {
        setIsViewModalOpen(true);
        setJobReq(data);
    };
    /**View  Modal form end */



    const handlePerRowsChange = async (newPerPage, page) => {
        setPage(page);
        setPerPage(newPerPage);
    };




    const {
        data: jobRequestList,
        isLoading,
        refetch: fetchJobRequestList,
    } = useGetAllData(QUERY_KEYS.GET_ALL_JOB_REQUEST_LIST, JOB_REQUEST_END_POINT.get(page, limit, search,""));

    console.log("jobRequestList", jobRequestList);

    const reFetchHandler = (isRender) => {
        if (isRender) fetchJobRequestList();
    };


    const handlePageChange = (page) => {
        setPage(page)
    };


    // handle delete
    const showDeleteConfirm = (id, name) => {
        confirm({
            title: `Are you sure delete this Job?`,
            icon: <ExclamationCircleFilled />,
            content: name,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                const deleteJobRequest = await del(JOB_REQUEST_END_POINT.delete(id));
                try {
                    if (deleteJobRequest.status === 'SUCCESS') {
                        notify('success', deleteJobRequest.message);
                    } else {
                        notify('error', 'something went wrong');
                    }
                } catch (error) {
                    notify('error', error.message);
                }

                fetchJobRequestList();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };



    const columns = [
        {
            name: <span className="fw-bold">SL</span>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: '70px',
        },
        {
            name: 'Guardian',
            selector: (row) => row.guardian?.fullName,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: (row) => row.phone,
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row) => (row.status == true ? <Tag color='green'>ACTIVE</Tag> : <Tag color='volcano'>INACTIVE</Tag>),
            sortable: true,
        },
        {
            name: 'Action',
            selector: (row) => actionButton(row),
        },
    ];


    const actionButton = (row) => {

        return <>
            <Row justify="space-between">
                <a onClick={() => handleViewOpen(row)} style={{ color: 'green', marginRight: '10px' }}>
                    <EyeOutlined style={{ fontSize: '24px' }} />
                </a>

                <a onClick={() => handleOpen(row)} className="text-primary" style={{ marginRight: '10px' }}>
                    <EditOutlined style={{ fontSize: '24px' }} />
                </a>

                <a onClick={() => showDeleteConfirm(row._id, row.name)} className="text-danger" style={{ marginRight: '10px' }}>
                    <DeleteOutlined style={{ fontSize: '24px' }} />
                </a>
            </Row>
        </>
    }




    return (
        <>
            <HeadSection title="All Job-Details" />


            <Content
                style={{
                    margin: '60px 16px',
                }}
            >

                <div
                    style={{
                        padding: 15,
                        minHeight: 360,
                        background: colorBgContainer,
                    }}
                >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className=" ">
                                    <div className="d-flex border-bottom title-part-padding align-items-center">
                                        <div>
                                            <h4 className="card-title mb-0">All Job</h4>
                                        </div>
                                        <div className="ms-auto flex-shrink-0">
                                            <Button
                                                className="shadow rounded"
                                                type="primary"
                                                onClick={handleShow}
                                                block
                                            >
                                                <span style={{ marginRight: '8px' }}>Add</span>
                                                <span className="button-icon-space ml-10">


                                                    <FontAwesomeIcon icon={faPlusCircle} />
                                                </span>
                                            </Button>
                                        </div>
                                    </div>


                                    <TutorRequestFrom
                                        isModalOpen={isModalOpen}
                                        setIsModalOpen={setIsModalOpen}
                                        isParentRender={reFetchHandler}
                                        setEditData={editData}
                                    />


                                    <JobRequestView
                                        isViewModalOpen={isViewModalOpen}
                                        setIsViewModalOpen={setIsViewModalOpen}
                                        jobReq={jobReq} />


                                    <div className="">
                                        <DataTable
                                            columns={columns}
                                            data={jobRequestList?.data}
                                            pagination
                                            paginationServer
                                            highlightOnHover
                                            subHeader
                                            progressPending={isLoading}
                                            paginationTotalRows={jobRequestList?.total}
                                            onChangeRowsPerPage={handlePerRowsChange}
                                            onChangePage={handlePageChange}
                                            subHeaderComponent={
                                                <DebouncedSearchInput
                                                    allowClear
                                                    placeholder="Search Job Request name "
                                                    onChange={setSearch}
                                                />
                                            }
                                            striped
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>





            </Content>



        </>
    )
}

export default JobRequestDetails