import { Space, Table, TableColumnsType } from "antd";

import SideBar from "../../component/SideBar";
import { Auth } from "../../interface/Auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import instance from "../../api";

const UserAdmin = () => {
  const [user, setUser] = useState<Auth[]>([]);

  useEffect(() => {
    getDataUser();
  }, []);
  const getDataUser = async () => {
    try {
      const res = await instance.get("/users");

      if (!res) {
        toast.error("User not found");
      }
      setUser(res.data);
    } catch (error) {
      toast.error("Error getting user");
    }
  };
  const columns: TableColumnsType<Auth> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <>
            <button className="py-1 border border-red-500 px-3 bg-red-500 text-white font-semibold hover:text-red-500 hover:bg-white transition-all duration-1000 rounded">
              Delete
            </button>
          </>
        </Space>
      ),
    },
  ];
  return (
    <>
      <SideBar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg ">
          <Table
            columns={columns}
            dataSource={user.map((user) => ({ ...user, key: user.email }))}
          />
        </div>
      </div>
    </>
  );
};

export default UserAdmin;
