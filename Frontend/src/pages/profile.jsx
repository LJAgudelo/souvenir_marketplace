import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer.jsx';
import { UserContext } from '../context/userContext.jsx';
import { ToastContainer } from 'react-toastify';
import ButtonUpdate from '../components/ui/ButtonUpdate.jsx';
import ButtonLogOut from '../components/ui/ButtonLogOut.jsx';
import Sidebar from '../components/layout/Sidebar.jsx';

import LogoRegister from ".././assets/images/LogoRegister.jpg"



const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    last_name: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    image: '',
  });

  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.id_users) return;

    // Prellenamos datos del usuario base
    setUserData((prev) => ({
      ...prev,
      name: user.name || '',
      last_name: user.last_name || '',
      email: user.email || '',
    }));

    // Traemos los datos del perfil (profile_users)
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/profile/${user.id_users}`);
        const data = await response.json();
        if (response.ok && data.ok) {
          setUserData((prevData) => ({
            ...prevData,
            phone: data.perfil.phone || '',
            country: data.perfil.country || '',
            address: data.perfil.address || '',
            image: data.perfil.image || '',
          }));
        } else {
          console.error('Error in profile :', data.message);
        }
      } catch (error) {
        console.error('Error requesting profile:', error);
      }
    };

    fetchUserProfile();
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return <div className="text-center p-6">
      Redirecting to login...</div>;
  }

  const imageSrc = userData.image
    ? userData.image.startsWith('http')
      ? userData.image
      : `${API_URL}${userData.image.startsWith('/') ? '' : '/'}${userData.image}`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdoDu90w1DemXWWMZuCnIfRQRekyed70QY40uTnue865UdMaTdm90nbeOmPfAy5KEGNGk&usqp=CAU";

  const handleModify = () => {
    navigate('/updateProfile');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />
      <ToastContainer />
      <div className="min-h-screen flex">
        {/* Imagen lateral izquierda */}
        <div className="w-[10%] bg-[#f9e5bb] flex items-center justify-center">
          <img
            src={LogoRegister}
            alt="Imagen lateral"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Contenido del perfil */}
        <div className="w-[90%] flex items-center justify-center bg-[#f9e5bb] px-6 py-12">
          <div className="flex flex-col min-h-screen w-full">
            <main className="flex-1 bg-[#f9e5bb] transition-all duration-300">
              <div className="max-w-4xl mx-auto bg-[var(--createdlightYellow)] rounded-lg shadow-lg p-6 flex gap-6">
                {/* Imagen de perfil */}
                <div className="flex flex-col items-center w-1/3">
                  <img
                    src={imageSrc}
                    className="w-32 h-32 rounded-full border-4 border-yellow-800 bg-white mb-4 object-cover"
                    alt="Foto de perfil"
                  />
                  <h2 className="text-2xl font-bold text-[#3d2f1d] mt-4">
                    {userData.name} {userData.last_name}
                  </h2>
                </div>

                {/* Detalles del perfil */}
                <div className="w-2/3 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Name</label>
                    <input
                      type="text"
                      value={userData.name}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-[#fff8e7]"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Email</label>
                    <input
                      type="email"
                      value={userData.email}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-[#fff8e7]"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Country</label>
                    <input
                      type="text"
                      value={userData.country}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-[#fff8e7]"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Phone</label>
                    <input
                      type="text"
                      value={userData.phone}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-[#fff8e7]"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Address</label>
                    <input
                      type="text"
                      value={userData.address}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-[#fff8e7]"
                      readOnly
                    />
                  </div>

                  {/* Botones */}
                  <div className="rounded-md w-full mt-4 flex justify-center px-10 gap-8 py-3">
                    <ButtonUpdate onClick={handleModify} />
                    <ButtonLogOut onClick={logout} />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;