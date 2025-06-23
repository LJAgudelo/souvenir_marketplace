import React , { useContext } from 'react';
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { PiSignOut } from "react-icons/pi";
import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { UserContext } from '../../context/userContext.jsx';

const Sidebar = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token') || !!user;
    const handleLogout = () => {
        logout(); 
        navigate('/login'); 
    };
    return (
        <>
            <aside id="default-sidebar" className="hidden lg:fixed lg:top-0 lg:left-0 lg:z-40 lg:w-55 lg:h-screen lg:transition-transform lg:block" aria-label="Sidebar">
                <div className="h-full px-2 py-3 overflow-hidden bg-[var(--createdMustard)]">
                    <ul className="space-y-1 font-medium">
                        <li>
                            <Link to="/" className="flex items-center p-1  rounded-lg  ">
                                <img src="/src/assets/images/logo.png" alt="Logo" className="w-45 rounded-sm" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/offert" className="flex items-center p-2 rounded-lg dark:text-black hover:bg-[var(--createdlightYellow)] ">
                                <MdOutlineLocalOffer />
                                <span className="flex-1 ms-3 whitespace-nowrap"> Offers</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/featured" className="flex items-center p-2 rounded-lg dark:text-black hover:bg-[var(--createdlightYellow)]  ">
                                <AiOutlineLike />
                                <span className="flex-1 ms-3 whitespace-nowrap">Featured Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/product" className="flex items-center p-2 rounded-lg dark:text-black hover:bg-[var(--createdlightYellow)]  ">
                                <AiOutlineProduct />
                                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" className="flex items-center p-2  rounded-lg dark:text-black hover:bg-[var(--createdlightYellow)]  ">
                                <BsCartCheck />
                                <span className="flex-1 ms-3 whitespace-nowrap">E-commerce</span>
                            </Link >
                        </li>
                        <li>
                            <Link to="/profile" className="flex items-center p-2  rounded-lg dark:text-black hover:bg-[var(--createdlightYellow)]  ">
                                <CgProfile />
                                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/sell" className="flex items-center p-2  rounded-lg dark:text-black hover:bg-[var(--createdlightYellow)]  ">
                                <LiaMoneyBillWaveSolid />
                                <span className="flex-1 ms-3 whitespace-nowrap">Sell</span>
                            </Link>
                        </li>
                        {user?.role_id === 1 && (
                        <li>
                            <Link to="/manageproduct" className="flex items-center p-2  rounded-lg dark:text-black hover:bg-[var(--createdlightYellow)]  ">
                                <MdOutlineManageAccounts />
                                <span className="flex-1 ms-3 whitespace-nowrap">Manage Product</span>
                            </Link>
                        </li>
                        )}
                         {/* Botón dinámico Log In / Log Out */}
                        <li>
                        {isLoggedIn ? (
                            <button
                            onClick={handleLogout}
                            className="flex items-center w-full p-2 rounded-lg text-left dark:text-black hover:bg-[var(--createdlightYellow)]"
                            >
                            <PiSignOut />
                            <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
                            </button>
                        ) : (
                            <Link to="/login" className="flex items-center p-2 rounded-lg dark:text-black hover:bg-[var(--createdlightYellow)]">
                            <PiSignOut />
                            <span className="flex-1 ms-3 whitespace-nowrap">Log In</span>
                            </Link>
                        )}
                        </li>
                    </ul>
                </div>
            </aside>

            <Navbar />


        </>
    )
}

export default Sidebar





