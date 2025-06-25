import React, { useContext } from "react";
import { CartContext } from "../context/cartContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.jsx";
import Footer from "../components/layout/Footer.jsx";

function CartPage() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar></Sidebar>
      <div className="flex flex-1">
        <main className="flex-1 bg-[#f2ddb6] lg:ml-[220px] p-4 md:p-6">
          <div className="w-full flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <p className="text-lg text-gray-600">
                There are no products in the cart.</p>
            ) : (
              <div className="flex justify-center w-full">
                <div className="space-y-4 w-full max-w-3xl">
                  {cartItems.map(({ id, name, price, image, quantity }) => (
                    <div key={id} className="flex items-center bg-white p-4 rounded shadow">
                      <img src={image} alt={name} className="w-20 h-20 object-cover mr-4" />
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-lg">{name}</h3>
                        <p>Amount: {quantity}</p>
                        <p>
                          Unit price: ${price}</p>
                        <p>Subtotal: ${price * quantity}</p>
                      </div>
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={() => removeFromCart(id)}
                      >
                        Delet
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-full max-w-3xl mt-6 flex flex-col items-end gap-4">
            <p className="text-xl font-semibold">
              Total to pay: <span className="text-green-700">${total.toFixed(2)}</span>
            </p>
            <button
              className="bg-[#2a593b] hover:bg-green-700 text-white px-6 py-3 rounded transition disabled:bg-gray-400"
              disabled={cartItems.length === 0}
              onClick={() => navigate("/payment")}
            >
              Pay
            </button>
          </div>
        </main>

      </div>
      <Footer></Footer>

    </div>
  );
}

export default CartPage;