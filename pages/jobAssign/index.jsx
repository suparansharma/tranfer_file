import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, EyeOutlined } from '@ant-design/icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Layout, Modal, Row, theme } from 'antd';
import { useCallback, useState } from 'react';
import DataTable from 'react-data-table-component';
import HeadSection from '../../components/HeadSection';
import ToastMessage from '../../components/Toast';
import DebouncedSearchInput from '../../components/elements/DebouncedSearchInput';
import { JOB_ASSIGN_END_POINT } from '../../constants/index';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { del } from '../../helpers/api_helper';
import { useGetAllData } from '../../utils/hooks/useGetAllData';
import JobAssignForm from './form/JobAssignForm';
// import JobAssignView from './view/GuardianView';



// JobAssignForm.jsx
function JobAssign(props) {

    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { confirm } = Modal;
    const { Content } = Layout;
    const [search, setSearch] = useState('');
    const [pending, setPending] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState({});
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [guardian, setGuardian] = useState({});

    const handleShow = () => {
        setIsModalOpen(true)
        setEditData(null);
    };

    /** edit modal function */
    const handleOpen = (data) => {
        setEditData(data);
        setIsModalOpen(true)
    }

    /**view modal function */
    const handleViewOpen = (data) => {
        setIsViewModalOpen(true);
        setGuardian(data);
    };




    // handle delete
    const showDeleteConfirm = (id, name) => {
        confirm({
            title: `Are you sure delete this Subject?`,
            icon: <ExclamationCircleFilled />,
            content: name,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                const deleteGuardian = await del(JOB_ASSIGN_END_POINT.delete(id));
                try {
                    if (deleteGuardian.status === 'SUCCESS') {
                        notify('success', deleteGuardian.message);
                    } else {
                        notify('error', 'something went wrong');
                    }
                } catch (error) {
                    notify('error', error.message);
                }

                fetchAssignJobList();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };




    const handlePerRowsChange = (newLimit, page) => {
        setPage(page);
        setLimit(newLimit);
    };

    const handlePageChange = (page) => {
        setPage(page)
    };
    const {
        data: assignJobList,
        isLoading,
        refetch: fetchAssignJobList,
    } = useGetAllData(QUERY_KEYS.GET_ALL_JOB_ASSIGN_LIST, JOB_ASSIGN_END_POINT.get(page, limit, search,""));
    console.log(assignJobList?.data);

    const reFetchHandler = (isRender) => {
        if (isRender) fetchAssignJobList();
    };

    console.log(assignJobList);








    const columns = [
        {
            name: <span className="fw-bold">SL</span>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: "70px",
        },
        {
            name: 'JobId',
            selector: row => row?.jobId?.jobId,
            sortable: true,
        },
        {
            name: 'Created By',
            selector: row => row?.createdBy?.fullName,
            sortable: true,
        },
        {
            name: 'Comment',
            selector: row => row.comment,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => actionButton(row),
        }

    ];


    const actionButton = (row) => {
        // console.log(id);
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

            <HeadSection title="All Guardian-Details" />


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
                                            <h4 className="card-title mb-0">All Assign Jobs</h4>
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


                                    <JobAssignForm
                                        isModalOpen={isModalOpen}
                                        setIsModalOpen={setIsModalOpen}
                                        isParentRender={reFetchHandler}
                                        setEditData={editData}


                                    />


                                    <div className="">
                                        <DataTable
                                            columns={columns}
                                            data={assignJobList?.data}
                                            pagination
                                            paginationServer
                                            highlightOnHover
                                            subHeader
                                            progressPending={isLoading}
                                            paginationTotalRows={assignJobList?.total}
                                            onChangeRowsPerPage={handlePerRowsChange}
                                            onChangePage={handlePageChange}
                                            subHeaderComponent={
                                                <DebouncedSearchInput
                                                    allowClear
                                                    placeholder="Search"
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

    );
}
export default JobAssign;