import { Action, Order, State } from "../interface/Cart";

const cartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "DECREASE_QUANTITY": {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }
    case "INCREASE_QUANTITY": {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case "ADD_CART": {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: Number(item.quantity + action.payload.quantity),
                }
              : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };
    }
    case "DELETE_CART": {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    }
    case "PLACE_ORDER": {
      const newOrder: Order = {
        id: new Date().toISOString(),
        items: state.cartItems,
        totalAmount: state.cartItems.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        ),
        status: "Pending",
        customerName: action.payload,
      };
      return {
        ...state,
        cartItems: [],
        orders: [...state.orders, newOrder],
      };
    }
    case "UPDATE_ORDER_STATUS": {
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        ),
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
