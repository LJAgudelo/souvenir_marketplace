import React from 'react'
import { IoMdKey } from "react-icons/io";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { TfiWallet } from "react-icons/tfi";

const Footer = ({ withSidebar = false }) => {
    return (
        <footer className="bg-[var(--createdBrown)] font-serif text-white text-sm py-2 px-2 md:px-8  ${withSidebar ? 'lg:ml-[220px]' :">
            <div className="max-w-7xl mx-auto flex flex-col  gap-">
                {/* Sección de íconos */}
                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6">
                    <div className="flex flex-col items-center space-y-2">
                        <IoMdKey className="text-2xl" />
                        <h3 className="font-serif ">Compra segura</h3>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <TfiWallet className="text-2xl" />
                        <h3 className="font-serif ">Pago en línea</h3>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <FaShippingFast className="text-2xl" />
                        <h3 className="font-serif ">Envíos</h3>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <MdOutlineAssignmentReturn className="text-2xl" />
                        <h3 className="font-serif ">Devoluciones</h3>
                    </div>

                    <div className="flex-shrink-0">
                        <img src="/src/assets/images/logo.png" alt="Logo" className="w-16 rounded-sm" />
                    </div>
                    <div className="flex gap-4 justify-center">
                        <img src="/src/assets/images/inicioChile.png" alt="Chile" className="w-14 md:w-16 rounded-sm" />
                        <img src="/src/assets/images/inicioColombia.png" alt="Colombia" className="w-14 md:w-16 rounded-sm" />
                        <img src="/src/assets/images/inicioBolivia.png" alt="Bolivia" className="w-14 md:w-16 rounded-sm" />
                    </div>
                </div>




                <div className="text-center mt-4 text-xs opacity-80">
                    &copy; {new Date().getFullYear()} Todos los derechos reservados.
                </div>
            </div>
        </footer>

    )
}

export default Footer