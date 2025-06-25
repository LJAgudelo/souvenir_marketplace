import React, { useState, useEffect, useContext } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/layout/Footer.jsx';
import countriesData from '../data/countries.json';
import loginImage from '../assets/images/main.jpg';
import { UserContext } from '../context/userContext.jsx';
import ButtonSend from '../components/ui/ButtonSend.jsx';
import ButtonCancel from '../components/ui/ButtonCancel.jsx';
import { toast, ToastContainer } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001'

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login, logout, validateEmail, validatePhone } = useContext(UserContext);
  const [form, setForm] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
    country: '',
    phone: '',
    address: '',
    role_id: 2
  });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setCountries(countriesData);
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("Imagen seleccionada:", file);
    setSelectedImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(form.email)) return;
    if (form.phone && !validatePhone(form.phone)) return;

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      formData.append(key, val);
    });
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json().catch(() => null);
      console.log('User creation ', res.status, data);
      if (res.ok && data?.user) {
        const newUser = data.user;
        navigate('/login');
        console.log(`Registered user with email: ${newUser.email}`);
        toast.success(`Registered user with email: ${newUser.email}`);
      } else {
        console.log('Error registering user', data?.message);
        toast.error(`Error registering user`);
      }
    } catch (error) {
      console.error(error);
      console.log('Error connecting to the server');
      toast.error(`Error connecting to the server`);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    logout();
    navigate('/login');
  };


  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex">
        {/* Lado izquierdo (30%) */}
        <div className="w-[30%] bg-[#f9e5bb] hidden md:flex items-center justify-center">
          <img
            src={loginImage}
            alt="Imagen de souvenir"
            className="object-cover h-full w-full"
          />
        </div>
        {/* Lado derecho (70%) */}
        <div className="w-full md:w-[70%] flex items-center justify-center bg-[#f9e5bb] px-6 py-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-sandybrown-400 p-8 rounded-lg shadow-lg" >

            <h1 className="text-l font-bold mb-4 text-center text-gray-800">

              Create account
            </h1>
            {/* Preview redondeado */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-700">
                {previewImage
                  ? <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <FaUser className="text-gray-500 text-2xl" />
                    </div>
                  )
                }
              </div>
            </div>
            {/* Input file */}
            <div className="mb-4 text-center">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm"
              />
            </div>

            {/* Campo: Nombre */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nombres"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <FaUser className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            {/* Campo: Apellidos */}
            <div className="mb-4">
              <label htmlFor="last_name" className="block text-sm font-medium mb-1">
                last name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Apellidos"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <FaUser className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Campo: Correo */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">

                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Correo Electronico"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <FaEnvelope className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Campo: Contraseña */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >

                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <FaLock className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Campo: País */}
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium mb-1"
              >
                Country
              </label>
              <select
                name="country"
                id="country"
                value={form.country}
                onChange={handleChange}
                required
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

            {/* Campo: Teléfono */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Telefono"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <FaPhone className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Campo: Dirección */}
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-1"
              >

                Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Dirección"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <FaMapMarkerAlt className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            {/* Botones */}
            <div className="flex justify-center space-x-4 mt-6">
              <ButtonSend />
              <ButtonCancel onClick={handleCancel} />
            </div>
            <div className="mt-6 text-center">
              <p>
                ¿You already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">

                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div><Footer /></div>
    </>
  )
};

export default RegisterPage;