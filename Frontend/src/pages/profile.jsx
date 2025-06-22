import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer.jsx';
import { UserContext } from '../context/userContext.jsx';
import { ToastContainer, toast } from 'react-toastify';
import ButtonUpdate from '../components/ui/ButtonUpdate.jsx';
import ButtonLogOut from '../components/ui/ButtonLogOut.jsx';
import ButtonCancel from '../components/ui/ButtonCancel.jsx';
import Sidebar from '../components/layout/Sidebar.jsx';

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

  const { user, profile, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("UserContext:", user);
    if (!user || !user.id_users) return;

    setUserData((prev) => ({
      ...prev,
      name: user.name || '',
      last_name: user.last_name || '',
      email: user.email || '',
      phone: '',
      country: '',
      address: '',
      image: '',
    }));

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:4001/profile/${user.id_users}`);
        if (!response.ok) {
          console.error('Error al obtener los datos del perfil, status:', response.status);
          return;
        }
        const data = await response.json();
        if (data.ok) {
          setUserData((prevData) => ({
            ...prevData,
            phone: data.perfil.phone || '',
            country: data.perfil.country || '',
            address: data.perfil.address || '',
            image: data.perfil.image || '',
          }));
        } else {
          console.error('Error al obtener los datos del perfil', data.message);
        }
      } catch (error) {
        console.error('Error al hacer la solicitud al servidor:', error);
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
    return <div className="text-center p-6">Redirigiendo al login...</div>;
  }
  const imageSrc = userData.image
    ? `http://localhost:4001${userData.image.startsWith('/') ? '' : '/'}${userData.image}`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdoDu90w1DemXWWMZuCnIfRQRekyed70QY40uTnue865UdMaTdm90nbeOmPfAy5KEGNGk&usqp=CAU";

  const handleModify = () => {
    navigate('/updateProfile');
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <>

      <div className='flex flex-col min-h-screen'>
        <Sidebar />

        <ToastContainer />
        <div className="min-h-screen flex">
          {/* Lado izquierdo (10%) */}
          <div className="w-[10%] bg-[#f9e5bb] flex items-center justify-center">
            <img
              src="./src/assets/images/LogoRegister.jpg"
              alt="Imagen lateral"
              className="object-cover h-full w-full"
            />
          </div>
          {/* Lado derecho (90%) */}
          <div className="w-[90%] flex items-center justify-center bg-[#f9e5bb] px-6 py-12">
            <div className="flex flex-col min-h-screen w-full">
              <main className="flex-1 bg-[#f9e5bb] transition-all duration-300">
                <div className="max-w-4xl mx-auto bg-[var(--createdlightYellow)] rounded-lg shadow-lg p-6 flex gap-6">
                  {/* Imagen y nombre */}
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

                  {/* Formulario */}
                  <div className="w-2/3 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">Nombre</label>
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
                      <label className="block text-sm font-semibold text-gray-700">País</label>
                      <input
                        type="text"
                        value={userData.country || ''}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-[#fff8e7]"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700">Teléfono</label>
                      <input
                        type="text"
                        value={userData.phone || ''}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-[#fff8e7]"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700">Dirección</label>
                      <input
                        type="text"
                        value={userData.address || ''}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-[#fff8e7]"
                        readOnly
                      />
                    </div>

                    {/* Botones */}
                    <div className="rounded-md w-full mt-4 flex justify-center px-10 gap-15 py-3">
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
    </>
  );
};

export default Profile;
