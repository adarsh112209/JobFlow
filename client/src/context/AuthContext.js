    import React, { createContext, useState, useEffect } from 'react';
    import { jwtDecode } from 'jwt-decode';

    const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
      const [userInfo, setUserInfo] = useState(null);

      useEffect(() => {
        const storedToken = localStorage.getItem('userToken');
        if (storedToken) {
          try {
            const decoded = jwtDecode(storedToken);
            if (decoded.exp * 1000 < Date.now()) {
              logout();
            } else {
              setUserInfo({ ...decoded, token: storedToken });
            }
          } catch (error) {
            logout();
          }
        }
      }, []);

      const login = (data) => {
        const decoded = jwtDecode(data.token);
        setUserInfo({ ...decoded, token: data.token });
        localStorage.setItem('userToken', data.token);
      };

      const logout = () => {
        setUserInfo(null);
        localStorage.removeItem('userToken');
      };

      return (
        <AuthContext.Provider value={{ userInfo, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
    };

    export default AuthContext;
    