import React from 'react';
import { Link } from 'react-router-dom';


import Footer from '../components/layout/Footer.jsx';
import { FaPoo } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <>


      <div
        className="min-h-screen flex flex-col bg-cover bg-center bg-[var(--createdlightYellow)]"

      >
        {/* Contenido principal */}
        <main className="flex flex-1 items-center justify-center px-4 ">
          <div className=" bg-opacity-90 p-8 rounded-lg shadow-lg text-center max-w-md w-full bg-[var(--createdligthYellosW)]" >
            <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">

              Page not found!
            </h2>
            <p className="text-gray-700 mb-6">
              Sorry, the page you're looking for doesn't exist.
            </p>
            <Link
              to="/home"
              className="inline-block px-6 py-2 text-white bg-green-700 rounded hover:bg-green-800 transition"
            >
              return to the home page
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NotFoundPage;

