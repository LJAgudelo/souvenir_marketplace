import React, { createContext, useState, useEffect } from 'react';

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
    const phoneRegex = /^\+?[\d\-]+$/;
    if (phone && !phoneRegex.test(phone)) {
      toast.error("El teléfono solo puede contener números, guiones y el símbolo +.");
      return false;
    }
    return true;
  };
  
 useEffect(() => {
   const loadUser = async () => {
      try {
        const stored = localStorage.getItem('user');
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          await fetchAndSetProfile(parsed.id_users);
        }
      } catch (error) {
        console.error('Error al cargar usuario desde localStorage:', error);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const fetchAndSetProfile = async (id_users) => {
    if (!id_users) return;
    try {
      const res = await fetch(`${DATABASE_URL}/profile/${id_users}`);
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
    setUser(userData.usuario);
    setToken(userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    await fetchAndSetProfile(userData.id_users);
  };

  const logout = () => {   
    setUser(null);
    setProfile(null);
    localStorage.removeItem('user');
    navigate('/login');
    toast.success('La sesión fue cerrada correctamente.');
  };

  const updateProfile = async (updatedFields) => {
    if (!user?.id_users) return false;
    try {
      const res = await fetch(`${DATABASE_URL}/profile/${user.id_users}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
    profile,
    loading,
    login,
    logout,
    fetchAndSetProfile,
    updateProfile,
    validateEmail,
    validatePhone,
  };

  if (loading) {
    return null; 
  }

  return (
    <UserContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
