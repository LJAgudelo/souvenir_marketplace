import React from 'react'

const ButtonSave = () => {
    return (
        <button className="bg-[var(--createdOrange)] hover:bg-[var(--createdlightYellow)] active:bg-[var(--createdBrownB)] 
    px-3 py-1 text-sm
    w-[100px] sm:w-[100px] md:w-[100px] lg:w-[110px]
    rounded-lg
    flex items-center justify-center
    text-white
    transition-all duration-300 ease-in-out
">
            Send
        </button>
    )
}

export default ButtonSave