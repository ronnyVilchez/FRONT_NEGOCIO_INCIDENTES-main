import React, { useEffect } from 'react';
import { useLocation } from 'wouter';

export const ProtectRouter = ({ children }) => {
    const [, setLocation] = useLocation();

    // useEffect(() => {
    //     localStorage.clear();
    // }, []);  // aqui erael problema de loken borrado

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            setLocation('/login');
        }
    }, [token, setLocation]);

    return token ? children : null;
};
