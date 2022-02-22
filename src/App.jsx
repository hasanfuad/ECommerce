import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";

const App = () => {
  const user = false;
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/products/:category" element={<ProductList />}></Route>
        <Route path="/product/:id" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        {user ? (
          <Navigate to="/" />
        ) : (
          <Route path="/login" element={<Login />}></Route>
        )}
        {user ? (
          <Navigate to="/" />
        ) : (
          <Route path="/register" element={<Register />}></Route>
        )}
      </Routes>
    </Router>
  );
};

export default App;
