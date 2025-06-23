import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserContext = createContext();
const DATABASE_URL = 'http://localhost:4001';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);            
  const [profile, setProfile] = useState(null); 
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailRegex.test(email)) {
      toast.error("Por favor ingresa un correo electrónico válido.");
      return false;
    }
    return true;
  };

  const validatePhone = (phone) => {  
    const phoneRegex = /^\+?[0-9-]+$/;
    if (phone && !phoneRegex.test(phone)) {
      toast.error("El teléfono solo puede contener números, guiones y el símbolo +.");
      return false;
    }
    return true;
  };
  
  
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');     
        if (!storedUser || storedUser === 'undefined' || !storedToken) {
          return;
        } 
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id_users) {
          setUser(parsedUser);
          setToken(storedToken);
          await fetchAndSetProfile(parsedUser.id_users);
        } else {
          console.warn("Usuario inválido en localStorage:", parsedUser);
        }
      } catch (error) {
        console.error('Error al cargar usuario desde localStorage:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');                        
      } finally {
        setLoading(false);
      }
    };
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const authHeaders = () => token ? { Authorization: `Bearer ${token}` } : {};

  const fetchAndSetProfile = async (id_users) => {
    if (!id_users) return;
    try {
      const res = await fetch(`${DATABASE_URL}/profile/${id_users}`, {
        headers: authHeaders(),                              
      });
      if (!res.ok) {
        console.error('Error al obtener perfil:', res.status);
        return;
      }
      const data = await res.json();
      if (data.ok && data.perfil) {
        setProfile(data.perfil);
      } else {
        console.warn('Perfil no encontrado o respuesta inesperada:', data);
      }
    } catch (error) {
      console.error('Error fetch perfil:', error);
    }
  };
  
  const login = async (userData) => {
  if (!userData?.user || !userData?.token) {
    console.error("Datos de login inválidos:", userData);
    return;
  }
  setUser(userData.user);
  setToken(userData.token);
  localStorage.setItem('user', JSON.stringify(userData.user));
  localStorage.setItem('token', userData.token);

  if (userData.user.id_users) {
    await fetchAndSetProfile(userData.user.id_users);
  } else {
    console.warn("No se pudo obtener el ID del usuario en login.");
  }
};


  const logout = () => {   
    setUser(null);
    setToken(null);                                      
    setProfile(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');                    
    navigate('/login');
    toast.success('La sesión fue cerrada correctamente.');
  };

  const updateProfile = async (updatedFields) => {
    if (!user?.id_users) return false;
    try {
      const res = await fetch(`${DATABASE_URL}/profile/${user.id_users}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          ...authHeaders(),                                
        },
        body: JSON.stringify(updatedFields),
      });
      if (!res.ok) {
        console.error('Error al actualizar perfil, status:', res.status);
        return false;
      }
      const data = await res.json();
      if (data.ok) {
        await fetchAndSetProfile(user.id_users);
        return true;
      } else {
        console.warn('Backend no actualizo el perfil:', data);
        return false;
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
      return false;
    }
  };

  const value = {
    user,
    token,
    profile,
    loading,
    login,
    logout,
    fetchAndSetProfile,
    updateProfile,
    validateEmail,
    validatePhone,
    authHeaders,                                       
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };