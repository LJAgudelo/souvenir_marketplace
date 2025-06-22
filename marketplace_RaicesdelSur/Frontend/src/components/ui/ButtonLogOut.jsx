import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext.jsx';
import { toast } from 'react-toastify';

const ButtonLogOut = () => {   
     const { logout } = useContext(UserContext);

    const handleLogout = () => {
      toast.success('Sesión cerrada exitosamente', { autoClose: 2000 });
      logout();
    };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="bg-[var(--createdMustard))] hover:bg-[var(--createdlightYellow)] active:bg-[var(--createdOrange)] 
            px-3 py-2 text-xs 
            sm:px-4 sm:py-2 sm:text-sm  
            md:px-15 md:py-3 md:text-base md:w-[210px]  
            lg:text-lg lg:w-[220px]      
            xl:text-xl xl:w-[240px]      
            rounded-lg 
            flex items-center justify-center 
            text-white 
            transition-all duration-300 ease-in-out"
    >
      Cerrar sesión
    </button>
  );
}

export default ButtonLogOut;