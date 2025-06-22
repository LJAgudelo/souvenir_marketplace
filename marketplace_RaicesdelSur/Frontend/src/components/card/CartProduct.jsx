import React, { useState, useContext } from "react";
import { CartContext } from "../../context/cartContext"; 

function CartProduct({ id, name, price, image,stock,description }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext); 

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const totalPrice = (price * quantity).toFixed(2);

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      stock,
      description ,
      quantity,
    });
    alert(`${quantity} x ${name} agregado${quantity > 1 ? 's' : ''} al carrito`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        className="w-full h-48 object-cover mb-4 rounded"
        src={image}
        alt={name}
      />
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-gray-700 mb-2">Precio unitario: ${price}</p>
      <p className="text-gray-600 text-sm mb-1">Stock disponible: {stock}</p>

      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={decrement}
          className="bg-[#f2b035]  px-2 rounded text-lg hover:bg-gray-400"
        >
          -
        </button>
        <span className="text-lg">{quantity}</span>
        <button
          onClick={increment}
          className="bg-[#f2b035] px-2 rounded text-lg hover:bg-gray-400"
        >
          +
        </button>
      </div>

      <p className="text-gray-900 font-semibold mb-2">Total: ${totalPrice}</p>

      <div className="flex justify-end mt-2">
        <button
          onClick={handleAddToCart}
          className="bg-[#2a593b] text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default CartProduct;