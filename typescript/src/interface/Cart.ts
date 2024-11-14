export interface CartItem {
  id?: string | number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}
export type Order = {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status:
    | "Pending"
    | "Confirmed"
    | "Cancelled"
    | "Payment Completed"
    | "Shipping";
  customerName: string;
};
export type State = {
  cartItems: CartItem[];
  orders: Order[];
};

export type Action =
  | { type: "INCREASE_QUANTITY"; payload: string | number }
  | { type: "DECREASE_QUANTITY"; payload: string | number }
  | { type: "ADD_CART"; payload: CartItem }
  | { type: "DELETE_CART"; payload: string | number }
  | { type: "PLACE_ORDER"; payload: string }
  | {
      type: "UPDATE_ORDER_STATUS";
      payload: {
        orderId: string;
        status: "Confirmed" | "Cancelled" | "Payment Completed" | "Shipping";
      };
    };
