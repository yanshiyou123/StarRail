import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const isUserLoggedIn = getCookie('isLoggedIn') === 'true';
    setIsLoggedIn(isUserLoggedIn);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    setCookie('isLoggedIn', 'true', { maxAge: 3 * 24 * 60 * 60, path: '/', secure:true, sameSite:'Lax' }); // Expires in 3 days
  };

  const logout = () => {
    setIsLoggedIn(false);
    deleteCookie('isLoggedIn', { path: '/' });
    router.push('/starRail/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


