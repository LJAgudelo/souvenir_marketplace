import React from 'react'
import { Link } from 'react-router-dom'

const ButtonStartAccount = () => {
    return (

        <Link to="/register">
            <button className="
        
            bg-[var(--createdBrown)] hover:bg-[var(--createdlightYellow)] active:bg-[var(--createdOrange)] 
            px-3 py-1 text-xs   /* Móviles: padding y fuente pequeñas */
            sm:px-4 sm:py-2 sm:text-sm   /* Tablets: un poco más grandes */
            md:px-15 md:py-3 md:text-base md:w-[210px]  /* Escritorio mediano */
            lg:text-lg lg:w-[220px]      /* Escritorio grande */
            xl:text-xl xl:w-[240px]      /* Escritorio XL */
            rounded-lg 
            flex items-center justify-center 
            text-white 
            transition-all duration-300 ease-in-out 
        ">
                Ingresar
            </button>
        </Link>
    )
}

export default ButtonStartAccount