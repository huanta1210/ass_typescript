import { Action, State } from "../interface/Product";

const productReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_PRODUCTS": {
      return {
        ...state,
        products: action.payload,
        searchResult: action.payload,
      };
    }

    case "ADD_PRODUCTS": {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    }
    case "UPDATE_PRODUCTS": {
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    }
    case "DELETE_PRODUCTS": {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    }
    case "GET_DETAILS": {
      return {
        ...state,
        selectedProduct: action.payload,
      };
    }
    case "SEARCH_PRODUCTS": {
      const searchProduct = state.products.filter((product) =>
        product.title.toLowerCase().includes(action.payload.toLowerCase())
      );

      return {
        ...state,
        searchProduct,
      };
    }
    default:
      return state;
  }
};

export default productReducer;
