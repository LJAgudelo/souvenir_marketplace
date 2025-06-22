import React from 'react'

const ButtonSend = () => {
    return (
        <button
            type='submit'                   
            className="bg-red-800 hover:bg-green-700 active:bg-green-900 
                                px-3 py-1 text-sm
                                w-[100px] sm:w-[100px] md:w-[100px] lg:w-[110px]
                                rounded-lg
                                flex items-center justify-center
                                text-white
                                transition-all duration-300 ease-in-out">
            Save
        </button>
    )
}

export default ButtonSend;
