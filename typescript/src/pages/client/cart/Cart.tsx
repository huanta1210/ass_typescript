import { useContext, useState } from "react";
import Footer from "../../../component/Footer";
import Header from "../../../component/Header";
import { ShoppingContext } from "../../../contexts/ShoppingCartContext";

import { Link } from "react-router-dom";
import Modal from "../../../component/Modal";

const Cart = () => {
  const [showModal, setShowModal] = useState(false);

  const {
    state,
    handleDeleteCart,
    totalPriceCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(ShoppingContext);

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="mb-16">
        <div className="mx-44 mt-12">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-9">
              <div className="">
                {state.cartItems.length === 0 ? (
                  <div className="cart-empty text-center ">
                    <img
                      className="h-48 m-auto"
                      src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/empty-cart.png?1716045319283"
                      alt=""
                    />
                    <div className="mt-10">
                      <Link
                        className="py-3 px-5 border border-black bg-black text-white text-lg hover:bg-transparent hover:text-black hover:border-black transition-all duration-1000 border border-transparent hover:border-black"
                        to="/"
                      >
                        Continue Choosing
                      </Link>
                    </div>
                  </div>
                ) : (
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-100 text-left text-sm leading-4 font-semibold tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 bg-gray-100 text-left text-sm leading-4 font-semibold tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 bg-gray-100 text-left text-sm leading-4 font-semibold tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 bg-gray-100 text-left text-sm leading-4 font-semibold tracking-wider">
                          Subtotal
                        </th>
                        <th className="px-6 py-3 bg-gray-100"></th>
                      </tr>
                    </thead>
                    {state.cartItems.map((item) => (
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="pr-6 py-4 whitespace-no-wrap">
                            <div className="flex items-center">
                              <img
                                className="h-14 w-14"
                                src={item.thumbnail}
                                alt=""
                              />
                              <span className="ml-4 text-sm font-semibold text-gray-400">
                                {item.title}
                              </span>
                            </div>
                          </td>
                          <td className="pr-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 font-semibold">
                            {item.price} $
                          </td>
                          <td className="pl-4 py-4 whitespace-no-wrap">
                            <div className="flex items-center">
                              <button
                                onClick={() =>
                                  item.quantity <= 1
                                    ? handleDeleteCart(item.id!)
                                    : decreaseQuantity(item.id!)
                                }
                                className="px-2 py-1"
                              >
                                -
                              </button>
                              <p className="px-3 py-1">{item.quantity}</p>
                              <button
                                onClick={() => increaseQuantity(item.id!)}
                                className="px-2 py-1"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="pl-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 font-semibold">
                            {(item.quantity * item.price).toFixed(2)}$
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-xl text-red-500">
                            <button
                              type="button"
                              onClick={() => handleDeleteCart(item.id!)}
                            >
                              <i className="ti ti-trash"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                )}
              </div>
            </div>

            <div className="col-span-3">
              <div className="w-full bg-gray-100">
                <div className="cart-total mx-6">
                  <div className=" border-b-2 border-gray-200">
                    <h1 className="text-2xl font-bold py-3">Cart Total</h1>
                  </div>
                  <div className="my-3">
                    <p className="font-semibold text-sm inline-block">
                      Subtotal
                    </p>
                    <p className="price text-sm text-gray-300 font-semibold float-right">
                      {totalPriceCart.toFixed(2)}$
                    </p>
                  </div>

                  <div className="total">
                    <p className="font-semibold text-sm inline-block">Total</p>
                    <p className="price text-lg text-red-500 font-bold float-right">
                      {totalPriceCart.toFixed(2)}$
                    </p>
                  </div>

                  <button
                    onClick={() => setShowModal(true)}
                    className="border-2 py-2 px-16 ml-2 my-6 border-black rounded text-black hover:bg-black hover:text-white transition-all duration-1000 font-semibold "
                    type="button"
                  >
                    CheckOut
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Cart;
