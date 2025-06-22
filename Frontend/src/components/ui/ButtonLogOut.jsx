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
            px-3 py-1 text-sm
    w-[100px] sm:w-[100px] md:w-[100px] lg:w-[110px]
    rounded-lg
    flex items-center justify-center
    text-white
    transition-all duration-300 ease-in-out
">
      Log Out
    </button>
  );
}

export default ButtonLogOut;