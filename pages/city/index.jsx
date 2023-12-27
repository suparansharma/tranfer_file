import { CITY_END_POINT } from '@/constants';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useGetAllData } from '@/utils/hooks/useGetAllData';
import { useCallback, useState } from 'react';
import { Row, Table, Tag } from 'antd';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link";
import ToastMessage from '@/components/Toast';
import DebouncedSearchInput from '@/components/elements/DebouncedSearchInput';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { del } from '@/helpers/api_helper';
import CityForm from './CityForm';

const City = () => {

    /*** Storing data start */
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [perPage, setPerPage] = useState(10);
    const [editData, setEditData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteIsModalOpen] = useState(false);
    /*** Storing data end */



    /**City Add start */
    const handleAdd = () => {
        setIsModalOpen(true);
        setEditData(null);
    };
    /**City Add end */



    /**City edit start */
    const handleEdit = (data) => {
        setEditData(data);
        setIsModalOpen(true);
    }
    /**City edit end */


    /**Modal close Function  Start*/
    const closeModal = () => {
        setIsModalOpen(false);
    };
    /**Modal close Function  End*/



    /** Delete start */
    const handleDelete = (data) => {
        setEditData(data);
        setDeleteIsModalOpen(true);
    }
    const closeDeleteModal = () => {
        setDeleteIsModalOpen(false);
    };
    /** Delete end */







    const {
        data: cityList,
        isLoading,
        refetch: fetchcityList,
      } = useGetAllData(QUERY_KEYS.GET_ALL_CITY_LIST, CITY_END_POINT.get(page, limit, search, ""));
    
    
    
    
      const reFetchHandler = (isRender) => {
        if (isRender) fetchcityList();
      };
    
      const handlePageChange = (page) => {
        setPage(page)
      };
    
    
    
    
      /** Column Start */
    
      const columns = [
        {
          title: 'SL',
          fixed: 'left',
          render: (text, record, index) => index + 1
        },
        {
          title: 'City Code',
          dataIndex: 'cityId',
        },
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          render: (status) => (
            status ? <Tag color='green'>ACTIVE</Tag> : <Tag color='volcano'>INACTIVE</Tag>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          width: 100,
          render: (row) => actionButton(row), // You need to define actionButton function
        },
      ];
    
    
    
      const actionButton = (row) => {
        return (
          <>
            <Row justify="space-between" style={{ display: 'flex', alignItems: 'center' }}>
              <a onClick={() => handleViewOpen(row)} style={{ color: 'green' }}>
                <EyeOutlined style={{ fontSize: '22px' }} />
              </a>
    
              <a onClick={() => handleEdit(row)} className="text-primary" >
                <EditOutlined style={{ fontSize: '22px' }} />
              </a>
    
              <a onClick={() => handleDelete(row)} className="text-danger" >
                <DeleteOutlined style={{ fontSize: '22px' }} />
              </a>
            </Row>
          </>
        );
      };
    
      /** Column End */
    
    
    
    
    
      /*** Pagination Start  */
      const pagination = {
        total: cityList?.total,
        current: page,
        pageSize: perPage,
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['2', '5', '10', '20', '30']
      };
    
      const onChange = (
        pagination,
        filters,
        sorter,
        extra
      ) => {
        setPage(pagination.current);
        setLimit(pagination.pageSize);
        console.log(pagination, filters, sorter, extra);
      };
    
      /*** Pagination End  */

    return (
        <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center border-b border-stroke dark:border-strokedark">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              All Cities
            </h4>
            <button
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              onClick={handleAdd}
            >
              Add
              <span className="button-icon-space ml-5">
                <FontAwesomeIcon icon={faPlusCircle} />
              </span>
            </button>
          </div>
  
  
  
          <div className="p-4 md:p-6 xl:p-7.5 flex justify-end">
            <DebouncedSearchInput setSearch={setSearch} />
          </div>
  
  
          <CityForm isOpen={isModalOpen} onClose={closeModal} setEditData={editData} isParentRender={reFetchHandler} />

  
          <Table
            className="border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white"
            columns={columns}
            dataSource={cityList?.data}
            scroll={{ x: 'max-content' }}
            pagination={pagination}
            onChange={onChange}
          />
        </div>
      </div>
    )
}

export default City