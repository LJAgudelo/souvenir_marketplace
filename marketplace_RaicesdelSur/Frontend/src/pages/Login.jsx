import React, { useState, useContext, useEffect } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../assets/images/main.jpg';
import Footer from '../components/layout/Footer.jsx';
import { UserContext } from '../context/userContext.jsx';
import ButtonLogIn from '../components/ui/ButtonLogIn.jsx';
import ButtonLogOut from '../components/ui/ButtonLogOut.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL_SERVER = 'http://localhost:4001/login';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { user, login, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      toast.info(`Ya has iniciado sesión como ${user.name || user.email || 'usuario'}.`);
      navigate('/product'); 
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(URL_SERVER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json(); // solo se puede usar una vez
    console.log('Login:', data);

    if (!res.ok || !data.ok) {
      throw new Error(data.message || 'Credenciales inválidas');
    }

    const userData = data;
    login(userData); // asegúrate que login espera este formato
    toast.success(`Bienvenid@, ${userData.usuario?.name || userData.usuario?.email}`);
    navigate('/product');
  } catch (error) {
    console.error('Login error:', error.message);
    toast.error(error.message || 'Correo o contraseña incorrectos');
  }
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
        <div className="w-full md:w-[70%] flex items-center justify-center bg-[#f9e5bb] px-6 py-12">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-sandybrown-200 p-8 rounded-lg shadow-lg"
          >
            <h1 className="text-xl font-bold mb-6 text-center text-gray-800">
              Iniciar Sesión
            </h1>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Correo Electrónico"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Contraseña
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
                  className="w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-6">
              <ButtonLogIn />
              {user && (<ButtonLogOut />)}
            </div>

            <div className="mt-6 text-center">
              <p>
                No tienes una cuenta?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Crear cuenta
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;

