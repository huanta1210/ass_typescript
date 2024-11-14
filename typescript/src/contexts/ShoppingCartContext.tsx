import { createContext, ReactNode, useReducer } from "react";
import { CartItem } from "../interface/Cart";
import cartReducer from "../reducers/ShoppingCartReducer";
import { toast } from "react-toastify";
import { Order } from "../interface/Cart";

type ShoppingCartContext = {
  state: {
    cartItems: CartItem[];
    orders: Order[];
  };
  quantityCart: number;
  totalPriceCart: number;
  handleDeleteCart: (id: string | number) => void;
  decreaseQuantity: (id: string | number) => void;
  increaseQuantity: (id: string | number) => void;
  addCartItem: (data: CartItem) => void;

  placeOrder: () => void;
  updateStatusOrder: (
    orderId: string,
    status: "Confirmed" | "Cancelled" | "Payment Completed" | "Shipping"
  ) => void;
};
type ChildrenProps = {
  children: ReactNode;
};

export const ShoppingContext = createContext<ShoppingCartContext>(
  {} as ShoppingCartContext
);

export const ShoppingCartProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
    orders: [],
  });
  const quantityCart = state.cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  const totalPriceCart = state.cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handleDeleteCart = (id: string | number) => {
    toast.success("Xoá thành công", {
      autoClose: 200,
    });
    dispatch({ type: "DELETE_CART", payload: id });
  };
  const decreaseQuantity = (id: string | number) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };

  const increaseQuantity = (id: string | number) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };
  const addCartItem = (data: CartItem) => {
    toast.success("Thêm sản phẩm thành công", {
      autoClose: 200,
    });
    if (data) {
      dispatch({
        type: "ADD_CART",
        payload: { ...data, quantity: 1 },
      });
    }
  };
  const placeOrder = () => {
    const token = localStorage.getItem("token");
    const customerName = localStorage.getItem("user") || "";
    const name = JSON.parse(customerName);

    if (!token) {
      toast.error("You cannot place an order if you are not logged in", {
        autoClose: 200,
      });
    } else {
      if (state.cartItems.length === 0) {
        toast.error("Empty cart cannot check out");
      } else {
        dispatch({ type: "PLACE_ORDER", payload: name });
        toast.success("Order successful, awaiting confirmation", {
          autoClose: 500,
        });
      }
    }
  };
  const updateStatusOrder = (
    orderId: string,
    status: "Confirmed" | "Cancelled" | "Payment Completed" | "Shipping"
  ) => {
    dispatch({ type: "UPDATE_ORDER_STATUS", payload: { orderId, status } });
  };

  return (
    <ShoppingContext.Provider
      value={{
        state,
        quantityCart,
        totalPriceCart,
        handleDeleteCart,
        decreaseQuantity,
        increaseQuantity,
        addCartItem,
        placeOrder,
        updateStatusOrder,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};
