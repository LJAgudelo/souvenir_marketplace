
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OfertProduct from "./pages/OfferProduct.jsx";
import AllProducts from "./pages/SalesProducts.jsx";
import FeaturedProduct from "./pages/FeaturedProducts.jsx";
import CartPage from "./pages/CartSale.jsx";
import Profile from "./pages/profile.jsx";
import Home from "./pages/Home.jsx";
import LoginPage from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx'
import Register from './pages/Register.jsx';
import Sell from "./pages/Sell.jsx";
import ManageProduct from "./pages/ManageProduct.jsx";


function App() {
  return (

    <Routes>
      <Route path="/product" element={<AllProducts />} />
      <Route path="/offert" element={<OfertProduct />} />
      <Route path="/featured" element={<FeaturedProduct />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sell" element={<Sell />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/manageproduct' element={<ManageProduct />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

  );
}

export default App;
