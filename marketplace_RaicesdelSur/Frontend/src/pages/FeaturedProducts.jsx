import { Link } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import CartProduct from "../components/card/CartProduct";
import Sidebar from "../components/layout/Sidebar.jsx";
import Footer from "../components/layout/Footer.jsx";
import { UserContext } from "../context/userContext.jsx";

function FeaturedProduct() {
  const [products, setProducts] = useState([]);
  const { token } = useContext(UserContext);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:4001/product", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const destacados = data.filter((p) => p.is_featured === true);
          setProducts(destacados);
        } else {
          console.warn("Respuesta inesperada:", data);
          setProducts([]);
        }
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />
      <div className="flex flex-1">
        <main className="flex-1 bg-[#f2ddb6] lg:ml-[220px] p-4 md:p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">Productos Destacados</h1>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <CartProduct
                    key={product.id_product}
                    id={product.id_product}
                    name={product.name}
                    price={product.price}
                    stock={product.stock}
                    description={product.description}
                    image={`http://localhost:4001${product.image_url?.startsWith("/") ? "" : "/"}${product.image_url}`}
                    onAddToCart={() => alert(`${product.name} agregado al carrito`)}
                  />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-600">
                  No hay productos destacados disponibles.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default FeaturedProduct;

