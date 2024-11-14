import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductList from "./pages/admin/ProductList";
import ProductForm from "./pages/admin/ProductForm";
import Register from "./pages/login/Register";
import Login from "./pages/login/Login";
import PrivateRoter from "./component/PrivateRoter";
import Home from "./pages/client/Home";
import ProductDetails from "./pages/client/ProductDetails";
import Cart from "./pages/client/cart/Cart";
import Order from "./pages/client/cart/Order";
import OrderAdmin from "./pages/admin/OrderAdmin";
import UserAdmin from "./pages/admin/UserAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/your-order" element={<Order />} />

        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<PrivateRoter />}>
          <Route path="orders" element={<OrderAdmin />} />
          <Route path="users" element={<UserAdmin />} />

          <Route path="products" element={<ProductList />} />
          <Route path="product/add" element={<ProductForm />} />
          <Route path="product/edit/:id" element={<ProductForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
