import React from 'react'
import { IoMdKey } from "react-icons/io";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { TfiWallet } from "react-icons/tfi";

import logo from "../../assets/images/logo.png"

import inicioChile from "../../assets/images/inicioChile.png"
import inicioColombia from "../../assets/images/inicioColombia.png"
import inicioBolivia from "../../assets/images/inicioBolivia.png"


const Footer = ({ withSidebar = false }) => {
    return (
        <footer className="bg-[var(--createdBrown)] font-serif text-white text-sm py-2 px-2 md:px-8  ${withSidebar ? 'lg:ml-[220px]' :">
            <div className="max-w-7xl mx-auto flex flex-col  gap-">
                {/* Sección de íconos */}
                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6">
                    <div className="flex flex-col items-center space-y-2">
                        <IoMdKey className="text-2xl" />
                        <h3 className="font-serif ">Safe purchase</h3>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <TfiWallet className="text-2xl" />
                        <h3 className="font-serif ">Online payment</h3>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <FaShippingFast className="text-2xl" />
                        <h3 className="font-serif ">Shipping</h3>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <MdOutlineAssignmentReturn className="text-2xl" />
                        <h3 className="font-serif ">Returns</h3>
                    </div>

                    <div className="flex-shrink-0">
                        <img src={logo} alt="Logo" className="w-16 rounded-sm" />
                    </div>
                    <div className="flex gap-4 justify-center">
                        <img src={inicioChile} alt="Chile" className="w-14 md:w-16 rounded-sm" />
                        <img src={inicioColombia} alt="Colombia" className="w-14 md:w-16 rounded-sm" />
                        <img src={inicioBolivia} alt="Bolivia" className="w-14 md:w-16 rounded-sm" />
                    </div>
                </div>
                <div className="text-center mt-4 text-xs opacity-80">
                    &copy; {new Date().getFullYear()}
                    All rights reserved.
                </div>
            </div>
        </footer>

    )
}

export default Footer