import SideBar from "../../component/SideBar";
import { Space, Table, TableColumnsType } from "antd";
import { CartItem, Order } from "../../interface/Cart";
import { useContext } from "react";
import { ShoppingContext } from "../../contexts/ShoppingCartContext";

const OrderAdmin = () => {
  const { state, updateStatusOrder } = useContext(ShoppingContext);
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
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items: CartItem[]) =>
        items.map((item, index) => (
          <p
            key={index}
          >{`Name: ${item.title} - SL:${item.quantity} - Price:${item.price}$`}</p>
        )),
    },
    {
      title: "Total",
      key: "totalAmount",
      dataIndex: "totalAmount",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.status === "Cancelled" ? (
            <span>Cancelled</span>
          ) : record.status === "Confirmed" ? (
            <span>Confirmed</span>
          ) : record.status === "Payment Completed" ? (
            <span>Payment Completed</span>
          ) : record.status === "Shipping" ? (
            <span>Shipping</span>
          ) : (
            <>
              {" "}
              <button
                onClick={() => updateStatusOrder(record.id, "Cancelled")}
                className="py-1 border border-red-500 px-3 bg-red-500 text-white font-semibold hover:text-red-500 hover:bg-white transition-all duration-1000 rounded"
              >
                Cancelled
              </button>
              <button
                onClick={() => updateStatusOrder(record.id, "Confirmed")}
                className="py-1 border border-lime-500 px-3 bg-lime-500 text-white font-semibold hover:text-lime-500 hover:bg-white transition-all duration-1000 rounded"
              >
                Confirmed
              </button>
              <button
                onClick={() =>
                  updateStatusOrder(record.id, "Payment Completed")
                }
                className="py-1 border border-blue-500 px-3 bg-blue-500 text-white font-semibold hover:text-blue-500 hover:bg-white transition-all duration-1000 rounded"
              >
                Payment Completed
              </button>
              <button
                onClick={() => updateStatusOrder(record.id, "Shipping")}
                className="py-1 border border-yellow-500 px-3 bg-yellow-500 text-white font-semibold hover:text-yellow-500 hover:bg-white transition-all duration-1000 rounded"
              >
                Shipping
              </button>
            </>
          )}
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
            dataSource={state.orders.map((order) => ({
              ...order,
              key: order.id,
            }))}
          />
        </div>
      </div>
    </>
  );
};

export default OrderAdmin;
