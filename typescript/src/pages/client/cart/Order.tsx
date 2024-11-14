import { useContext, useEffect, useState } from "react";
import Header from "../../../component/Header";
import Footer from "../../../component/Footer";
import { ShoppingContext } from "../../../contexts/ShoppingCartContext";
import { Link } from "react-router-dom";
import { CheckUserLogin } from "../../../interface/Auth";
import LogOut from "../../login/LogOut";
import { Space, Table, TableColumnsType } from "antd";
import { Order } from "../../../interface/Cart";

const Orders = () => {
  const { state, updateStatusOrder } = useContext(ShoppingContext);
  const [checkLogin, setCheckLogin] = useState<CheckUserLogin | null>(null);
  useEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")!);
      setCheckLogin(user);
    } catch (error) {
      console.log(error);
    }
  };

  const columns: TableColumnsType<Order> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "customerName",
      key: "customerName",
      render: (customerName) => <span>{customerName.name}</span>,
    },
    {
      title: "Email",
      dataIndex: "customerName",
      key: "customerName",
      render: (customerName) => <span>{customerName.email}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Price",
      key: "totalAmount",
      dataIndex: "totalAmount",
      render: (totalAmount) => <a>{totalAmount.toFixed(2)}$</a>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.status === "Cancelled" ? (
            <span>Cancelled</span>
          ) : record.status === "Payment Completed" ? (
            <span>Payment Completed</span>
          ) : (
            <>
              <button
                onClick={() => updateStatusOrder(record.id, "Cancelled")}
                className="py-1 border border-red-500 px-3 bg-red-500 text-white font-semibold hover:text-red-500 hover:bg-white transition-all duration-1000 rounded"
              >
                Cancelled
              </button>
              <button
                onClick={() =>
                  updateStatusOrder(record.id, "Payment Completed")
                }
                className="py-1 border border-lime-500 px-3 bg-lime-500 text-white font-semibold hover:text-red-500 hover:bg-white transition-all duration-1000 rounded"
              >
                Payment Completed
              </button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Header />
      <main className="mx-20 my-10">
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <h2 className="text-xl font-bold">Account Page</h2>
            <p className="text-sm font-semibold py-3 mb-3">
              Hello! {checkLogin?.name}
            </p>
            <div>
              <Link className="text-sm text-gray-600 hover:text-red-400" to="">
                Account Infomation
              </Link>
            </div>
            <div className="py-2">
              <Link
                className="text-sm text-gray-600 hover:text-red-400"
                to="/your-order"
              >
                Your Order
              </Link>
            </div>
            <div>
              <Link className="text-sm text-gray-600 hover:text-red-400" to="">
                Forgot Password
              </Link>
            </div>
            <div className="mt-2">
              <LogOut />
            </div>
          </div>
          <div className="col-span-10">
            <Table columns={columns} dataSource={state.orders} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Orders;
