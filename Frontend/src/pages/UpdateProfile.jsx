import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer.jsx';
import { UserContext } from '../context/userContext.jsx';
import { ToastContainer, toast } from 'react-toastify';
import countriesData from '../data/countries.json';
import ButtonSend from '../components/ui/ButtonSend.jsx';
import ButtonCancel from '../components/ui/ButtonCancel.jsx';


const UpdateProfile = () => {
  const { user, logout, validatePhone } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: '',
    country: '',
    address: '',
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
        const res = await fetch(`http://localhost:4001/profile/${user.id_users}`);
        if (!res.ok) {
          console.error('Error al obtener perfil, status:', res.status);
          return;
        }
        const data = await res.json();
        if (data.ok) {
          const perfil = data.perfil;
          setFormData({
            phone: perfil.phone || '',
            country: perfil.country || '',
            address: perfil.address || '',
          });
          if (perfil.image) {
            const imageUrl = perfil.image.startsWith('/')
              ? `http://localhost:4001${perfil.image}`
              : `http://localhost:4001/${perfil.image}`;
            setPreviewImage(imageUrl);
          }
        } else {
          console.error('Error payload al obtener el perfil:', data.message);
        }
      } catch (err) {
        console.error('Error en fetch al perfil:', err);
      }
    };
    fetchProfile();
  }, [user, navigate]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return <div className="text-center p-6">Redirigiendo al login...</div>;
  }

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

    if (!user.id_users) return;
    if (formData.phone && !validatePhone(formData.phone)) return;

    const body = new FormData();
    body.append('profileusers_id', user.id_users);
    body.append('phone', formData.phone);
    body.append('country', formData.country);
    body.append('address', formData.address);
    if (selectedImage) {
      body.append('image', selectedImage);
    }

    try {
      const res = await fetch('http://localhost:4001/UpdateProfile', {
        method: 'POST',
        body,
        //headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const data = await res.json().catch(() => null);
      console.log('Update profile:', res.status, data);
      if (res.ok && data.ok) {
        toast.success('Perfil actualizado correctamente.');
        navigate('/profile');
      } else {
        toast.error(data?.message || 'Error al actualizar perfil.');
      }
    } catch (err) {
      console.error('Error en update-profile:', err);
      toast.error('Error de conexión con el servidor.', err);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <>
      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Imagen lateral izquierda */}
        <div className="hidden lg:flex w-1/3 bg-[#fcebbd]">
          <img
            src="/src/assets/images/updateProfile.png"
            alt="Banner perfil"
            className="w-full object-cover"
          />
        </div>

        {/* Contenido del formulario */}
        <div className="flex-1 bg-[var(--createdlightYellow)] flex items-center justify-center">
          <ToastContainer />
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 my-10">
            <h1 className="text-2xl font-bold mb-4 text-[#3d2f1d]">Modify Profile</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Imagen del perfil */}
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

              {/* Teléfono */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Teléfono</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-[#fff8e7]"
                />
              </div>

              {/* País */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-1">País</label>
                <select
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">Selecciona un país</option>
                  {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dirección */}
              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700">Dirección</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-[#fff8e7]"
                />
              </div>

              {/* Botones */}
              <div className="flex space-x-4 mt-4 justify-center">
                <ButtonSend />
                <ButtonCancel onClick={handleCancel} />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer separado del contenido principal */}
      <Footer />
    </>
  );
};

export default UpdateProfile;
