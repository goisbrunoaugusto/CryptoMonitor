import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// Criação de um contexto para o userId
const AuthContext = createContext();

// Componente que envolve toda a aplicação e gerencia o estado de autenticação
export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    // Efeito que roda uma vez ao carregar a aplicação para buscar o userId no cookie
    useEffect(() => {
        const userIdFromCookie = Cookies.get('userId');
        if (userIdFromCookie) {
            setUserId(userIdFromCookie);
        }
    }, []);

    return (
        <AuthContext.Provider value={userId}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para acessar o userId de qualquer componente filho
export const useAuth = () => useContext(AuthContext);
