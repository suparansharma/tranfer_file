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

const DeleteModal = ({ isOpen, onClose, data, isParentRender }) => {
  const [loading, setLoading] = useState(false);

  const notify = useCallback((type, message) => {
      ToastMessage({ type, message });
  }, []);
  const deleteData = async () => {
      try {
          const deleteSubject = await del(CITY_END_POINT.delete(data?._id));
          if (deleteSubject.status == 'SUCCESS') {
              notify('success', deleteSubject.message);
              if (isParentRender) {
                  isParentRender(true);
              }
              onClose();
          }
      } catch (error) {
          notify('error', deleteSubject.errorMessage);
          setLoading(false);
      }

  }
  return (
      <>
          {isOpen && (
              <div className="fixed inset-0 z-10 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen">
                      <div className="fixed inset-0 bg-black opacity-25"></div>
                      <div className="relative bg-white p-8 rounded-lg  dark:border-strokedark dark:bg-boxdark w-full max-w-md max-h-full">
                          {/* Modal content */}
                          <div class="relative p-4 text-center bg-white ">
                              <button onClick={onClose} type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                  <span class="sr-only">Close modal</span>
                              </button>
                              <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                              <p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to Delete the city?</p>
                              <div class="flex justify-center items-center space-x-4">
                                  <button onClick={onClose} data-modal-toggle="deleteModal" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                      No, cancel
                                  </button>
                                  <button onClick={deleteData} type="submit" class="py-2 px-3 text-sm font-medium text-center text-white bg-danger rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                      Yes, Im sure
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}
      </>
  );
};




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
          <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} data={editData} isParentRender={reFetchHandler} />

  
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