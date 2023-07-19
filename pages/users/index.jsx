import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, EyeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Modal, Row, Tag, theme } from 'antd';
import { useCallback, useState } from 'react';
import DataTable from 'react-data-table-component';
import HeadSection from '../../components/HeadSection';
import ToastMessage from '../../components/Toast';
import { USER_END_POINT } from '../../constants/index';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { del } from '../../helpers/api_helper';
import { useGetAllData } from '../../utils/hooks/useGetAllData';
import DebouncedSearchInput from '../../components/elements/DebouncedSearchInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import UserFrom from './form/UserFrom';

const AllCity = () => {
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [search, setSearch] = useState('');
    const [pending, setPending] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState({});
    const { confirm } = Modal;
    const { Content } = Layout;
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10)

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
    const handlePerRowsChange = async (newPerPage, page) => {
        setPage(page);
        setPerPage(newPerPage);
    };



    const {
        data: userList,
        isLoading,
        refetch: fetchUserList,
    } = useGetAllData(QUERY_KEYS.GET_ALL_USER_LIST, USER_END_POINT.get(page, limit, search));



    const reFetchHandler = (isRender) => {
        if (isRender) fetchUserList();
    };


    const handlePageChange = (page) => {
        setPage(page)
    };


    // handle delete
    const showDeleteConfirm = (id, name) => {
        confirm({
            title: `Are you sure delete this User?`,
            icon: <ExclamationCircleFilled />,
            content: name,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                const deleteSubject = await del(USER_END_POINT.delete(id));
                try {
                    if (deleteSubject.status === 'SUCCESS') {
                        notify('success', deleteSubject.message);
                    } else {
                        notify('error', 'something went wrong');
                    }
                } catch (error) {
                    notify('error', error.message);
                }

                fetchUserList();
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
            name: 'Name',
            selector: (row) => row.fullName,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: (row) => row.phone,
            sortable: true,
        },
        {
            name: 'email',
            selector: (row) => row.email,
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
            <HeadSection title="All User-Details" />


            <Content
                style={{
                    margin: '40px 16px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                </Breadcrumb>
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
                                            <h4 className="card-title mb-0">All Users</h4>
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


                                    <UserFrom
                                        isModalOpen={isModalOpen}
                                        setIsModalOpen={setIsModalOpen}
                                        isParentRender={reFetchHandler}
                                        setEditData={editData}
                                    />





                                    <div className="">
                                        <DataTable
                                            columns={columns}
                                            data={userList?.data}
                                            pagination
                                            paginationServer
                                            highlightOnHover
                                            subHeader
                                            progressPending={isLoading}
                                            paginationTotalRows={userList?.total}
                                            onChangeRowsPerPage={handlePerRowsChange}
                                            onChangePage={handlePageChange}
                                            subHeaderComponent={
                                                <DebouncedSearchInput
                                                    allowClear
                                                    placeholder="Search subject name "
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

export default AllCity