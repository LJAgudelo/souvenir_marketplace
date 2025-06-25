import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer.jsx';
import { UserContext } from '../context/userContext.jsx';
import { ToastContainer, toast } from 'react-toastify';
import countriesData from '../data/countries.json';
import ButtonSend from '../components/ui/ButtonSend.jsx';
import ButtonCancel from '../components/ui/ButtonCancel.jsx';

import updateProfile from "../assets/images/updateProfile.png"
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001';

const UpdateProfile = () => {
  const { user, validatePhone } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: '',
    country: '',
    address: '',
    currentImage: '',
  });

  const [countries, setCountries] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (!user || !user.id_users) {
      navigate('/login');
      return;
    }

    setCountries(countriesData);

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/profile/${user.id_users}`);
        const data = await res.json();
        if (res.ok && data.ok) {
          const perfil = data.perfil;
          setFormData({
            phone: perfil.phone || '',
            country: perfil.country || '',
            address: perfil.address || '',
            currentImage: perfil.image || '',
          });
          if (perfil.image) {
            const imageUrl = perfil.image.startsWith('/')
              ? `${API_URL}${perfil.image}`
              : `${API_URL}/${perfil.image}`;
            setPreviewImage(imageUrl);
          }
        }
      } catch (err) {
        console.error('Error al cargar perfil:', err);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file || null);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phone || !validatePhone(formData.phone)) {
      toast.error("Número de teléfono inválido");
      return;
    }

    const body = new FormData();
    body.append('profileusers_id', user.id_users);
    body.append('phone', formData.phone);
    body.append('country', formData.country);
    body.append('address', formData.address);

    if (selectedImage) {
      body.append('image', selectedImage);
    } else if (formData.currentImage) {
      body.append('currentImage', formData.currentImage);
    }

    try {
      const res = await fetch(`${API_URL}/UpdateProfile`, {
        method: 'POST',
        body,
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        toast.success('Perfil actualizado correctamente');
        navigate('/profile');
      } else {
        toast.error(data?.message || 'Error al actualizar el perfil');
      }
    } catch (err) {
      console.error('Error al enviar formulario:', err);
      toast.error('Error de conexión con el servidor');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <>
      <div className="flex min-h-[calc(100vh-80px)]">
        <div className="hidden lg:flex w-1/3 bg-[#fcebbd]">
          <img
            src={updateProfile}
            alt="Banner perfil"
            className="w-full object-cover"
          />
        </div>

        <div className="flex-1 bg-[var(--createdlightYellow)] flex items-center justify-center">
          <ToastContainer />
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 my-10">
            <h1 className="text-2xl font-bold mb-4 text-[#3d2f1d]">Modificar Perfil</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-700 mb-2">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-2xl">👤</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-sm"
                />
              </div>

              <div>
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="country">País</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Selecciona un país</option>
                  {countries.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="address">Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex space-x-4 mt-4 justify-center">
                <ButtonSend />
                <ButtonCancel onClick={handleCancel} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateProfile;
