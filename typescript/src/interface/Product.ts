export interface Product {
  id?: string | number;
  title: string;
  description?: string;
  category?: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export type State = {
  products: Product[];
  selectedProduct?: Product | null;
  searchProduct: Product[];
};

export type Action =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCTS"; payload: Product }
  | { type: "UPDATE_PRODUCTS"; payload: Product }
  | { type: "DELETE_PRODUCTS"; payload: number | string }
  | { type: "GET_DETAILS"; payload: Product | null }
  | { type: "SEARCH_PRODUCTS"; payload: string };
