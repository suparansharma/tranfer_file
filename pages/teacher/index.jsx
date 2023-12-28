import { TUTOR_END_POINT } from '@/constants';
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
import ClassForm from './ClassForm';
import { del } from '@/helpers/api_helper';

const Teacher = () => {

    /*** Storing data start */
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [perPage, setPerPage] = useState(10);
    const [editData, setEditData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteIsModalOpen] = useState(false);
    /*** Storing data end */


    /**Class Add start */
    const handleAdd = () => {
        setIsModalOpen(true);
        setEditData(null);
    };
    /**Class Add end */



    /**Class edit start */
    const handleEdit = (data) => {
        setEditData(data);
        setIsModalOpen(true);
    }
    /**Class edit end */


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
        data: tutorList,
        isLoading,
        refetch: fetchTutorList,
      } = useGetAllData(QUERY_KEYS.GET_ALL_TUTOR_LIST, TUTOR_END_POINT.get(page, limit, search, ""));
    
    
    
    
      const reFetchHandler = (isRender) => {
        if (isRender) fetchTutorList();
      };
    
      const handlePageChange = (page) => {
        setPage(page)
      };


    return (
        <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center border-b border-stroke dark:border-strokedark">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              All Classes
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
  
  
          {/* <ClassForm isOpen={isModalOpen} onClose={closeModal} setEditData={editData} isParentRender={reFetchHandler} />
          <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} data={editData} isParentRender={reFetchHandler} /> */}
  
  
          <Table
            className="border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white"
            columns={columns}
            dataSource={tutorList?.data}
            scroll={{ x: 'max-content' }}
            pagination={pagination}
            onChange={onChange}
          />
        </div>
      </div>
    )
}

export default Teacher