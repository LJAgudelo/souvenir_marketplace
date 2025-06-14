import React, { useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar.jsx';
import Footer from '../components/layout/Footer.jsx';
import ButtonLogOut from '../components/ui/ButtonLogOut.jsx';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    last_name: '',
    email: '',
    phone: '',
    country: '',
    address: ''
  });

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log(storedUser)

    if (storedUser) {
      setUserData({
        name: storedUser.usuario.name || '',
        last_name: storedUser.usuario.last_name || '',
        email: storedUser.usuario.email || '',
        id_users: storedUser.usuario.id_users || 'No disponible',
        loading: true,
      })
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:4001/profile/'+storedUser.usuario.id_users);
        const data = await response.json();

        if (data.ok) {
          setUserData((prevData) => ({
            ...prevData,
            phone: data.perfil.phone,
            country: data.perfil.country,
            address: data.perfil.address
          }));
        } else {
          console.error('Error al obtener los datos del perfil');
        }
      } catch (error) {
        console.error('Error al hacer la solicitud al servidor:', error);
      }
    };

    fetchUserProfile();
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-[#f9e5bb] ml-0 lg:ml-[220px] transition-all duration-300">
        <div className="max-w-4xl mx-auto bg-[var(--createdlightYellow)] rounded-lg shadow-lg p-6 flex gap-6">

          {/* Imagen y nombre */}
          <div className="flex flex-col items-center w-1/3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdoDu90w1DemXWWMZuCnIfRQRekyed70QY40uTnue865UdMaTdm90nbeOmPfAy5KEGNGk&usqp=CAU"
              className="w-32 h-30 rounded-full border-4 border-yellow-800 bg-white mb-4"
            />
            <h2 className="text-2xl font-bold text-[#3d2f1d]">{userData.name} {userData.last_name}</h2>
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
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Teléfono</label>
              <input
                type="tel"
                value={userData.phone || ''}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-[#fff8e7]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Dirección</label>
              <input
                type="text"
                value={userData.address || ''}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-[#fff8e7]"
              />
            </div>

            <div>
              <ButtonLogOut />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
