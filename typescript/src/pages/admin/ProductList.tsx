import { Space, Table, TableColumnsType } from "antd";
import { Product } from "../../interface/Product";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import SideBar from "../../component/SideBar";

const ProductList = () => {
  const { state, handleDelete } = useContext(ProductContext);

  const [sortedProduct, setSortedProduct] = useState<Product[]>(state.products);
  const [isSorted, setIsSorted] = useState<boolean>(true);

  const handleSortedProduct = () => {
    const sorter = [...state.products].sort((a, b) => {
      if (isSorted) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setSortedProduct(sorter);
    setIsSorted(!isSorted);
  };

  const columns: TableColumnsType<Product> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: "Thumbnail",
      key: "thumbnail",
      dataIndex: "thumbnail",
      render: (thumbnail) => (
        <img src={thumbnail} alt="Preview" style={{ maxWidth: "80px" }} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => handleDelete(record.id!)}
            className="py-1 px-3 bg-red-500 text-white font-semibold rounded border border-red-500 hover:bg-white hover:text-red-500"
          >
            Delete
          </button>
          <Link to={`/admin/product/edit/${record.id}`}>
            <button className="py-1 px-5 bg-blue-500 text-white font-semibold rounded border border-blue-500 hover:bg-white hover:text-blue-500">
              Edit
            </button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="my-6 grid grid-cols-12">
      <div className="col-span-2">
        <SideBar />
      </div>
      <div className="col-span-10 ml-2">
        {" "}
        <div className="mb-4">
          <Link
            to="/admin/product/add"
            className="text-white text-sm bg-lime-500 font-semibold py-2 px-3 rounded border border-lime-500 hover:bg-white hover:text-lime-500"
          >
            Add product
          </Link>
          <button
            onClick={handleSortedProduct}
            className="text-white text-sm bg-blue-500 font-semibold py-2 px-3 ml-2 rounded border border-blue-500 hover:bg-white hover:text-blue-500"
          >
            Sort by price {isSorted ? "accending" : "descending"}
          </button>
        </div>
        <Table columns={columns} dataSource={sortedProduct} />
      </div>
    </div>
  );
};

export default ProductList;
