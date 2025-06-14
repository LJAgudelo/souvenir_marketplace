import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const navigate = useNavigate();

  const handlePayment = () => {
    alert("Pago simulado con éxito. Gracias por tu compra!");
    navigate("/profile"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f2ddb6] p-6">
      <h1 className="text-3xl font-bold mb-6">Simulador de Pago</h1>

      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <p className="mb-4 flex justify-center">
          <img src="/src/assets/images/logo.png" alt="Logo" className="w-45 rounded-sm " />
        </p>

        <button
          onClick={handlePayment}
          className="bg-[#2a593b] hover:bg-green-700 text-white px-6 py-3 rounded w-full transition"
        >
          Pagar
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;