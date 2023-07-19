import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, EyeOutlined } from '@ant-design/icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumb, Button, Layout, Modal, Row, Tag, theme } from 'antd';
import React, { useCallback, useState } from 'react';
import DataTable from 'react-data-table-component';
import HeadSection from '../../components/HeadSection';
import ToastMessage from '../../components/Toast';
import DebouncedSearchInput from '../../components/elements/DebouncedSearchInput';
import { LOCATION_END_POINT } from "../../constants/index";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { del } from '../../helpers/api_helper';
import { useGetAllData } from "../../utils/hooks/useGetAllData";
import LocationForm from './form/LocationForm';
import LocationView from './view/LocationView';
// LocationForm



const Managelocation = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();


    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);

    const [search, setSearch] = useState('');
    const [pending, setPending] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState({});
    const { confirm } = Modal;
    const { Content } = Layout;
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10)
    // const { data: locationList, isLoading, refetch: fetchLocationList } = useGetAllData(QUERY_KEYS.GET_ALL_LOCATION_LIST, LOCATION_END_POINT.get())



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



    /**View  Modal form */

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [location, setLocation] = useState({});

    const handleViewOpen = (data) => {
        setIsViewModalOpen(true);
        setLocation(data);
    };
    /**View  Modal form end */

    const {
        data: locationList,
        isLoading,
        refetch: fetchLocationList,
    } = useGetAllData(QUERY_KEYS.GET_ALL_LOCATION_LIST, LOCATION_END_POINT.get(page, limit, search,""));





    const reFetchHandler = (isRender) => {
        if (isRender) fetchLocationList();
    };

    const handlePageChange = (page) => {
        setPage(page)
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
                const deleteSubject = await del(LOCATION_END_POINT.delete(id));
                try {
                    if (deleteSubject.status === 'SUCCESS') {
                        notify('success', deleteSubject.message);
                    } else {
                        notify('error', 'something went wrong');
                    }
                } catch (error) {
                    notify('error', error.message);
                }

                fetchLocationList();
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
            width: "70px",
        },
        {
            name: 'Location Code',
            selector: row => row.locationId,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row) => (row.status == true ? <Tag color='green'>ACTIVE</Tag> : <Tag color='volcano'>INACTIVE</Tag>),
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
            <HeadSection title="All Location-Details" />


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
                                            <h4 className="card-title mb-0">All Location </h4>
                                        </div>
                                        <div className="ms-auto flex-shrink-0">
                                            <Button
                                                className="shadow rounded"
                                                type="primary"
                                                block
                                                onClick={handleShow}
                                            >
                                                <span style={{ marginRight: '8px' }}>Add</span>
                                                <span className="button-icon-space ml-10">


                                                    <FontAwesomeIcon icon={faPlusCircle} />
                                                </span>
                                            </Button>
                                        </div>
                                    </div>




                                    <LocationForm
                                        isModalOpen={isModalOpen}
                                        setIsModalOpen={setIsModalOpen}
                                        isParentRender={reFetchHandler}
                                        setEditData={editData}
                                    />


                                    <LocationView
                                        isViewModalOpen={isViewModalOpen}
                                        setIsViewModalOpen={setIsViewModalOpen}
                                        location={location} />

                                    <div className="">

                                        <DataTable
                                            columns={columns}
                                            data={locationList?.data}
                                            pagination
                                            paginationServer
                                            highlightOnHover
                                            subHeader
                                            progressPending={isLoading}
                                            paginationTotalRows={locationList?.total}
                                            onChangeRowsPerPage={handlePerRowsChange}
                                            onChangePage={handlePageChange}
                                            subHeaderComponent={
                                                <DebouncedSearchInput
                                                    allowClear
                                                    placeholder="Search Location name "
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

export default Managelocation
