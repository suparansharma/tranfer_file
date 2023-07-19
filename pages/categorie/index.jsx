import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, EyeOutlined } from '@ant-design/icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumb, Button, Layout, Modal, Row, Tag, theme } from 'antd';
import { useCallback, useState } from 'react';
import DataTable from 'react-data-table-component';
import HeadSection from '../../components/HeadSection';
import ToastMessage from '../../components/Toast';
import DebouncedSearchInput from '../../components/elements/DebouncedSearchInput';
import { CATEGORIE_END_POINT } from '../../constants/index';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { del } from '../../helpers/api_helper';
import { useGetAllData } from '../../utils/hooks/useGetAllData';
import CategoryFrom from './form/CategoryFrom';
import CategoryView from './view/CategoryView';

/**
 Add
<FontAwesomeIcon icon={faPlusCircle} />

 */
// CategoryView
const AllCategory = () => {


    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const { token: { colorBgContainer }, } = theme.useToken();
    const { confirm } = Modal;
    const { Content } = Layout;
    const [search, setSearch] = useState('');
    const [pending, setPending] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState({});
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

    /**View  Modal form */

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [category, setCategory] = useState({});

    const handleViewOpen = (data) => {
        setIsViewModalOpen(true);
        setCategory(data);
    };
    /**View  Modal form end */



    const handlePerRowsChange = async (newPerPage, page) => {
        setPage(page);
        setPerPage(newPerPage);
    };




    /** Fetch CategoryList */
    const {
        data: categoryList,
        isLoading,
        refetch: fetchCategoryList,
    } = useGetAllData(QUERY_KEYS.GET_ALL_CATEGORY_LIST, CATEGORIE_END_POINT.get(page, limit, search,""));
    console.log("categoryList", categoryList);

    /** Fetch CategoryList End */



    const reFetchHandler = (isRender) => {
        if (isRender) fetchCategoryList();
    };

    const handlePageChange = (page) => {
        setPage(page)
    };


    /** handle delete */
    const showDeleteConfirm = (id, name) => {
        confirm({
            title: `Are you sure delete this Category?`,
            icon: <ExclamationCircleFilled />,
            content: name,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                const deleteClass = await del(CATEGORIE_END_POINT.delete(id));
                console.log(deleteClass);
                try {
                    if (deleteClass.status === 'SUCCESS') {
                        notify('success', deleteClass.message);
                    } else {
                        notify('error', 'something went wrong');
                    }
                } catch (error) {
                    notify('error', error.message);
                }

                fetchCategoryList();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    /** handle delete end */


    const columns = [
        {
            name: <span className="fw-bold">SL</span>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: "70px",
        },
        {
            name: 'Category Id',
            selector: row => row.categoryId,
            sortable: true,
        },
        {
            name: 'Category Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => (row.status == true ? <Tag color='green'>ACTIVE</Tag> : <Tag color='volcano'>INACTIVE</Tag>),
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
            <HeadSection title="All Category-Details" />


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
                                            <h4 class="card-title mb-0">All Category</h4>
                                        </div>
                                        <div className="ms-auto flex-shrink-0">
                                            <Button
                                                className="shadow rounded"
                                                type="primary"
                                                onClick={handleShow}
                                                // icon={<PlusOutlined />}
                                                block
                                            >
                                                <span style={{ marginRight: '8px' }}>Add</span>
                                                <span className="button-icon-space ml-10">


                                                    <FontAwesomeIcon icon={faPlusCircle} />
                                                </span>
                                               
                                            </Button>
                                        </div>
                                    </div>

                                    <CategoryFrom
                                        isModalOpen={isModalOpen}
                                        setIsModalOpen={setIsModalOpen}
                                        isParentRender={reFetchHandler}
                                        setEditData={editData}
                                    />

                                    <CategoryView
                                        isViewModalOpen={isViewModalOpen}
                                        setIsViewModalOpen={setIsViewModalOpen}
                                        category={category} />

                                    <div className="">
                                        <DataTable
                                            columns={columns}
                                            data={categoryList?.data}
                                            pagination
                                            paginationServer
                                            highlightOnHover
                                            subHeader
                                            progressPending={isLoading}
                                            paginationTotalRows={categoryList?.total}
                                            onChangeRowsPerPage={handlePerRowsChange}
                                            onChangePage={handlePageChange}
                                            subHeaderComponent={
                                                <DebouncedSearchInput
                                                    allowClear
                                                    placeholder="Search category name "
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

export default AllCategory
// CategoryList