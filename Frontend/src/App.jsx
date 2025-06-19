
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
import PaymentPage from "./pages/Payment.jsx";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";


function App() {
  return (

    <Routes>
       {/* rutas publicas */}
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<Register />} />
      <Route path="*" element={<NotFound />} />

    {/* rutas privadas solo con token valido*/}
      <Route path="/product" element={<ProtectedRoute><AllProducts /></ProtectedRoute>} />
      <Route path="/offert" element={<ProtectedRoute><OfertProduct /></ProtectedRoute>} />
      <Route path="/featured" element={<ProtectedRoute><FeaturedProduct /></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/sell" element={<ProtectedRoute><Sell /></ProtectedRoute>} />
      <Route path='/manageproduct' element={<ProtectedRoute><ManageProduct /></ProtectedRoute>} />
      <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
      
    </Routes>

  );
}

export default App;
