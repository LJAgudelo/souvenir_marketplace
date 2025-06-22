
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // O el CSS que estés usando
import { CartProvider } from './context/cartContext.jsx';
import { UserProvider } from './context/userContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
