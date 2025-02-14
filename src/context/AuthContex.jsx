
import { createContext, useState, useEffect } from "react";
import { useMutation } from "react-query";
import { Auth } from "../services/AuthService";
import { useLocation } from "wouter";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [, setLocation] = useLocation();
    
    // Inicializa infoUser desde localStorage si existe, de lo contrario, usa un objeto vacío.
    const [infoUser, setInfoUser] = useState(() => {
        const savedUser = localStorage.getItem('infoUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Función para manejar el login
    const loginUser = useMutation({
        mutationKey: ['login'],
        mutationFn: Auth,
        onSuccess: (data) => {
            localStorage.setItem('token', data.authtoken);   // Guarda el token
            localStorage.setItem('userId', data.user.id);    // Guarda el ID del usuario
            localStorage.setItem('infoUser', JSON.stringify(data.user)); // Guarda los datos del usuario
            setInfoUser(data.user); // Actualiza el estado con los datos del usuario
            setLocation('/dashboard'); // Redirige al dashboard
        },
    });

    // Función para manejar el logout
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('infoUser'); // Borra los datos del usuario del almacenamiento local
        localStorage.removeItem('idIn');
        localStorage.removeItem('idR');
        setInfoUser(null); // Borra el estado del usuario
        setLocation('/login'); // Redirige al login
    }

    // Recupera la información del usuario cuando la aplicación carga
    useEffect(() => {
        const savedUser = localStorage.getItem('infoUser');
        if (savedUser) {
            setInfoUser(JSON.parse(savedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ loginUser, logout, infoUser }}>
            {children}
        </AuthContext.Provider>
    );
};


// import { createContext, useState } from "react";
// import { useMutation, useQuery } from "react-query";
// import { Auth } from "../services/AuthService";
// import { useLocation } from "wouter";


// export const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//     const [, setLocation] = useLocation()
//     const [infoUser, setInfoUser] = useState([])

//     const loginUser = useMutation({
//         mutationKey: ['login'],
//         mutationFn: Auth,
//         onSuccess: (data) => {
//             localStorage.setItem('token', data.authtoken)
//             localStorage.setItem('userId', data.user.id)
//             setInfoUser(data.user)
//             setLocation('/dashboard')

//         },
//     })


//     function logout() {
//         localStorage.removeItem('token')
//         localStorage.removeItem('userId')
//         localStorage.removeItem('idIn')
//         localStorage.removeItem('idR')
//         setLocation('/login')

//     }

//     return (
//         <AuthContext.Provider value={{ loginUser, logout, infoUser }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }