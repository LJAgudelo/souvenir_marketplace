import React, { useState,useContext } from 'react';
import { IoMenu } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout} = useContext(UserContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isAdmin = user?.role_id === 1;

  const isLoggedIn = !!localStorage.getItem("token") || !!user;

  const handleLogout = () => {
    logout();              
    navigate("/login");    
  };

  const staticLinks = [
    { name: 'Offers', to: '/offert' },
    { name: 'Featured Products', to: '/featured' },
    { name: 'Products', to: '/product' },
    { name: 'E-commerce', to: '/cart' },
    { name: 'Profile', to: '/profile' },
    { name: 'Sell', to: '/sell' },
    ...(isAdmin ? [{ name: 'Manage Product', to: '/manageproduct' }] : []),
  ];

  return (
    <>
      <nav className="bg-[var(--createdBrown)] px-4 md:px-8 py-4 shadow lg:ml-[220px]">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
            aria-controls="menu"
            aria-expanded={isOpen}
          >
            <IoMenu size={28} />
          </button>

          {/* Menú para pantallas grandes */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <ul className="flex flex-col md:flex-row">
              {staticLinks.map(({ name, to }) => (
                <li key={name}>
                  <Link
                    to={to}
                    className="block px-4 py-2 text-white hover:bg-yellow-500 rounded md:hover:bg-transparent md:hover:text-yellow-300"
                  >
                    {name}
                  </Link>
                </li>
              ))}

              {/* Botón dinámico: Log In o Log Out */}
              <li>
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-white hover:bg-yellow-500 rounded md:hover:bg-transparent md:hover:text-yellow-300"
                  >
                    Log Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-white hover:bg-yellow-500 rounded md:hover:bg-transparent md:hover:text-yellow-300"
                  >
                    Log In
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Menú para pantallas pequeñas */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col">
              {staticLinks.map(({ name, to }) => (
                <li key={name}>
                  <Link
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-white hover:bg-yellow-500 rounded"
                  >
                    {name}
                  </Link>
                </li>
              ))}

              {/* Botones LogIn / LogOut */}
              <li>
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-yellow-500 rounded"
                  >
                    Log Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-white hover:bg-yellow-500 rounded"
                  >
                    Log In
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>

      <img
        src="/src/assets/images/bannerMovil.png"
        alt="Banner versión móvil"
        className="mt-4 block md:hidden w-full"
      />
    </>
  );
};

export default Navbar;
