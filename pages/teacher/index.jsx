import { TUTOR_END_POINT } from "@/constants";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useGetAllData } from "@/utils/hooks/useGetAllData";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Table, Tag } from "antd";
import Link from "next/link";
import { del } from "@/helpers/api_helper";
import ToastMessage from "@/components/Toast";
import DebouncedSearchInput from "@/components/elements/DebouncedSearchInput";
import TeacherForm from "./TeacherForm";

const Teacher = () => {
  /*** Storing data start */
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [perPage, setPerPage] = useState(10);
  const [editData, setEditData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteIsModalOpen] = useState(false);
  /*** Storing data end */

  /**Function start */

  /**Subject Add start */
  const handleAdd = () => {
    setIsModalOpen(true);
    setEditData(null);
  };

  /**Subject Add end */

  const closeModal = () => {
    setIsModalOpen(false);
  };

  /**Function end */

  /**Subject edit start */
  const handleEdit = (data) => {
    setEditData(data);
    setIsModalOpen(true);
  };
  /**Subject edit end */

  /**Subject Delete start */
  const handleDelete = (data) => {
    setEditData(data);
    setDeleteIsModalOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteIsModalOpen(false);
  };
  /**Subject Delete end */

  /*** Fetch All Subject List Start  */

  const {
    data: tutorList,
    isLoading,
    refetch: fetchTutorList,
  } = useGetAllData(
    QUERY_KEYS.GET_ALL_TUTOR_LIST,
    TUTOR_END_POINT.get(page, limit, search, "")
  );

  //Render Function
  const reFetchHandler = (isRender) => {
    if (isRender) fetchTutorList();
  };

  /*** Fetch All Subject List end  */

  /*** Pagination Start  */
  const pagination = {
    total: tutorList?.total,
    current: page,
    pageSize: perPage,
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["2", "5", "10", "20", "30"],
  };

  const onChange = (pagination, filters, sorter, extra) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    console.log(pagination, filters, sorter, extra);
  };

  /*** Pagination End  */

  const columns = [
    {
      title: "SL",
      fixed: "left",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tutor Id",
      dataIndex: "tutorId",
      // fixed: 'left',
    },
    {
      title: "Tutor Name",
      dataIndex: "fullName",
      // fixed: 'left',
    },

    {
      title: "Tutor Phone",
      dataIndex: "phone",
      // fixed: 'left',
    },
    {
      title: "Tutor Address",
      dataIndex: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) =>
        status ? (
          <Tag color="green">ACTIVE</Tag>
        ) : (
          <Tag color="volcano">INACTIVE</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (row) => actionButton(row), // You need to define actionButton function
    },
  ];

  const actionButton = (row) => {
    return (
      <>
        <Row
          justify="space-between"
          style={{ display: "flex", alignItems: "center" }}
        >
          <a onClick={() => handleViewOpen(row)} style={{ color: "green" }}>
            <EyeOutlined style={{ fontSize: "22px" }} />
          </a>

          <a onClick={() => handleEdit(row)} className="text-primary">
            <EditOutlined style={{ fontSize: "22px" }} />
          </a>

          <a onClick={() => handleDelete(row)} className="text-danger">
            <DeleteOutlined style={{ fontSize: "22px" }} />
          </a>
        </Row>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center border-b border-stroke dark:border-strokedark">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            All Tutor
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

        <TeacherForm isOpen={isModalOpen} onClose={closeModal} setEditData={editData} isParentRender={reFetchHandler} />
        {/* <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} data={editData} isParentRender={reFetchHandler} /> */}

        <Table
          className="border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white"
          columns={columns}
          dataSource={tutorList?.data?.data}
          scroll={{ x: "max-content" }}
          pagination={pagination}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Teacher;
