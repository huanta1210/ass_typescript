import {
  Children,
  createContext,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import { Product } from "../interface/Product";
import instance from "../api";
import productReducer from "../reducers/productReducer";

type ProductContext = {
  state: {
    products: Product[];
    selectedProduct?: Product | null;
    searchProduct: Product[];
  };
  onSubmitProduct: (data: Product) => void;
  handleDelete: (id: string | number) => void;
  getDetails: (id: string | number) => void;
  searchProduct: (data: string) => void;
};
export const ProductContext = createContext<ProductContext>(
  {} as ProductContext
);

type Children = {
  children: ReactNode;
};

export const ProductProdvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
    searchProduct: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get("/products");
        if (!res) {
          throw new Error("Không lấy đc dữ liệu");
        }
        dispatch({ type: "SET_PRODUCTS", payload: res.data });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const getDetails = async (id: string | number) => {
    try {
      const res = await instance.get(`/products/${id}`);
      if (!res) {
        throw new Error("Không lấy đc dữ liệu");
      }
      dispatch({ type: "GET_DETAILS", payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitProduct = async (data: Product) => {
    if (data.id) {
      // logic edit
      await instance.patch(`/products/${data.id}`, data);

      dispatch({ type: "UPDATE_PRODUCTS", payload: data });
    } else {
      // logic add
      await instance.post(`/products`, data);
      dispatch({ type: "ADD_PRODUCTS", payload: data });
    }
    window.location.href = "/admin/products";
  };

  const handleDelete = async (id: string | number) => {
    try {
      if (window.confirm("Bạn có muốn xoá không ?")) {
        const res = await instance.delete(`/products/${id}`);
        if (!res) {
          throw new Error("Không lấy đc dữ liệu");
        }
        dispatch({ type: "DELETE_PRODUCTS", payload: id });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const searchProduct = (data: string) => {
    dispatch({ type: "SEARCH_PRODUCTS", payload: data });
  };

  return (
    <ProductContext.Provider
      value={{
        state,
        onSubmitProduct,
        handleDelete,
        getDetails,
        searchProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
