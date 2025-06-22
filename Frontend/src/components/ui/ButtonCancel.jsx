import React from 'react';
import { Link } from 'react-router-dom';

const ButtonCancel = () => {
    return (
        <Link to="/">
            <button className="bg-yellow-800 hover:bg-lightorange active:bg-lightBrown 
                                px-3 py-1 text-sm
                                w-[100px] sm:w-[100px] md:w-[100px] lg:w-[110px]
                                rounded-lg
                                flex items-center justify-center
                                text-white
                                transition-all duration-300 ease-in-out">
                Cancel
            </button>
        </Link>
    )
}

export default ButtonCancel;