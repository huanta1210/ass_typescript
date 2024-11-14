import { useContext, useEffect, useState } from "react";
import logo from "../assets/img/logo.png";
import { ShoppingContext } from "../contexts/ShoppingCartContext";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";

function Header() {
  const { quantityCart } = useContext(ShoppingContext);
  const { searchProduct } = useContext(ProductContext);
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    userGetting();
  }, [user]);

  const userGetting = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")!);

      setUser(user?.name);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    searchProduct(search);
  }, [search]);

  return (
    <header className="mx-44">
      <div className="header flex justify-between items-center">
        <div className="header-logo">
          <img className="w-16 h-16 inline-block" src={logo} alt="" />
          <span className="inline-block font-bold text-2xl">Furniro</span>
        </div>

        <div className="header-nav m-auto">
          <ul>
            <li className="inline-block">
              <Link
                className="text-lg font-semibold hover:text-lime-600"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="inline-block pl-9">
              <Link
                className="text-lg font-semibold hover:text-lime-600"
                to="#"
              >
                Shop
              </Link>
            </li>
            <li className="inline-block pl-9">
              <Link
                className="text-lg font-semibold hover:text-lime-600"
                to="#"
              >
                Contact
              </Link>
            </li>
            <li className="inline-block pl-9">
              <Link
                className="text-lg font-semibold hover:text-lime-600"
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        <div className="header-information ">
          <ul className="">
            <li className="inline-block">
              <Link className="hover:text-lime-500" to="/login">
                <i className="ti ti-user">
                  <span className="text-sm pl-1 font-medium">
                    {user ? user : "Tài khoản"}
                  </span>
                </i>
              </Link>
            </li>
            <li className="inline-block text-lg relative ml-4">
              <input
                type="search"
                placeholder="Search..."
                value={search}
                onChange={handleChange}
                className="border rounded-lg w-32 pl-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </li>
            <li className="inline-block pl-5 text-lg">
              <Link className="hover:text-lime-500" to="">
                <i className="ti ti-heart"></i>
              </Link>
            </li>
            <li className="inline-block pl-5 text-lg">
              <div className="cart relative">
                <Link to="/cart" className="hover:text-lime-500">
                  <i className="ti ti-shopping-cart"></i>
                </Link>
                <div className="absolute top-0 left-3 right-0 bg-red-500 text-white rounded-full size-4 flex items-center justify-center text-xs">
                  {Number(quantityCart)}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
