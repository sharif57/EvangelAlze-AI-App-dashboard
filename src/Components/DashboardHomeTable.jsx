import { Table } from "antd";
import exlamIcon from "../assets/images/exclamation-circle.png";
import { useState } from "react";
import DashboardModal from "./DashboardModal";
import { useAllUserDataQuery } from "../redux/features/userSlice";

const DashboardHomeTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const { data: userData, isLoading } = useAllUserDataQuery();

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "transIs",
      key: "transIs",
      render: (text, record, index) => <a>{index + 1}</a>,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email", // Fixed to match API data
      key: "email",
    },
    {
      title: "Action",
      key: "Review",
      align: "center", // Fixed typo: 'aligen' to 'align'
      render: (_, data) => (
        <div className="items-center justify-around text-center flex">
          <img
            src={exlamIcon}
            alt="Review"
            className="btn px-3 py-1 text-sm rounded-full cursor-pointer"
            onClick={() => showModal(data)}
          />
        </div>
      ),
    },
  ];

  // Map API data to table data format
  const dataSource = userData?.data?.result?.map((user, index) => ({
    transIs: index + 1,
    name: user.name,
    email: user.email,
    ...user, // Include all user data for modal
  })) || [];

  // Pagination configuration from API meta
  const paginationConfig = {
    current: userData?.data?.meta?.page || 1,
    pageSize: userData?.data?.meta?.limit || 10,
    total: userData?.data?.meta?.total || 0,
    position: ["bottomCenter"],
  };

  return (
    <div className="rounded-lg border py-4 bg-white mt-8 recent-users-table">
      <div className="flex items-center justify-between p-2">
        <h3 className="text-2xl text-black mb-4 pl-2">Recent Users</h3>
      </div>
      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={paginationConfig}
        loading={isLoading} // Show loading state while fetching data
        className="rounded-lg"
        rowKey="_id" // Unique key for each row
      />
      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="500px"
      >
        <div>
          <h2 className="text-lg text-center mb-4">User Details</h2>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>User Name</p>
            <p>{modalData.name || "N/A"}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Email</p>
            <p>{modalData.email || "N/A"}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Verified</p>
            <p>{modalData.verified ? "Yes" : "No"}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Created At</p>
            <p>{new Date(modalData.createdAt).toLocaleDateString() || "N/A"}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Updated At</p>
            <p>{new Date(modalData.updatedAt).toLocaleDateString() || "N/A"}</p>
          </div>
          {/* Add more fields as needed, or handle missing fields */}
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Mobile Phone</p>
            <p>{modalData.Phone || "N/A"}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Service</p>
            <p>{modalData.transIs || "N/A"}</p>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default DashboardHomeTable;