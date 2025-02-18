import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContex';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddUser = () => {
    const { createUser } = useContext(AdminContext);
    const [token, setToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token ? 'yes' : 'not');
    }, []);

    async function sendUser(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        try {
            await createUser.mutateAsync(data);
            e.target.reset();
            toast.success("Usuario creado exitosamente!");
        } catch (error) {
            toast.error("Error al crear nuevo usuario");
        }
    }

    return (
        <section className='w-full flex flex-col items-center gap-6 p-6 min-h-screen bg-gradient-to-r from-purple-600 to-blue-500'>
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-96 h-96 bg-white opacity-10 blur-3xl rounded-full"></div>
            </div>
            <h2 className='text-3xl font-bold text-white'>Crear un nuevo usuario</h2>
            <p className='text-lg text-gray-200'>Llene todos los campos para registrar un nuevo usuario.</p>
            
            <form
                className='w-full max-w-lg border border-transparent bg-white/20 backdrop-blur-lg shadow-lg rounded-xl p-8'
                onSubmit={sendUser}
            >
                <label className='block mb-4'>
                    <span className='block text-sm font-medium text-white'>Nombre</span>
                    <input
                        required
                        placeholder='Nombre del nuevo usuario'
                        className='mt-1 block w-full px-4 py-3 border border-transparent bg-white/20 text-white placeholder-gray-300 rounded-lg shadow-lg outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all'
                        type='text'
                        name='nombre'
                    />
                </label>

                <label className='block mb-4'>
                    <span className='block text-sm font-medium text-white'>Apellido</span>
                    <input
                        required
                        placeholder='Apellido del nuevo usuario'
                        className='mt-1 block w-full px-4 py-3 border border-transparent bg-white/20 text-white placeholder-gray-300 rounded-lg shadow-lg outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all'
                        type='text'
                        name='apellido'
                    />
                </label>

                <label className='block mb-4'>
                    <span className='block text-sm font-medium text-white'>Email</span>
                    <input
                        required
                        placeholder='Email del nuevo usuario'
                        className='mt-1 block w-full px-4 py-3 border border-transparent bg-white/20 text-white placeholder-gray-300 rounded-lg shadow-lg outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all'
                        type='email'
                        name='email'
                    />
                </label>

                <label className='block mb-4'>
                    <span className='block text-sm font-medium text-white'>Departamento</span>
                    <input
                        required
                        placeholder='Departamento del nuevo usuario'
                        className='mt-1 block w-full px-4 py-3 border border-transparent bg-white/20 text-white placeholder-gray-300 rounded-lg shadow-lg outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all'
                        type='text'
                        name='departamento'
                    />
                </label>

                <label className='block mb-4'>
                    <span className='block text-sm font-medium text-white'>Teléfono</span>
                    <input
                        required
                        placeholder='Número de contacto del nuevo usuario'
                        className='mt-1 block w-full px-4 py-3 border border-transparent bg-white/20 text-white placeholder-gray-300 rounded-lg shadow-lg outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all'
                        type='tel'
                        name='numero_contacto'
                    />
                </label>

                <label className='block mb-4'>
                    <span className='block text-sm font-medium text-white'>Contraseña</span>
                    <input
                        required
                        placeholder='Contraseña para acceder al sistema'
                        className='mt-1 block w-full px-4 py-3 border border-transparent bg-white/20 text-white placeholder-gray-300 rounded-lg shadow-lg outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all'
                        type='password'
                        name='password'
                    />
                </label>

                <label className='block mb-4'>
                    <span className='block text-sm font-medium text-white'>Rol</span>
                    <select
                        className='mt-1 block w-full px-4 py-3 border border-transparent bg-white/20 text-white placeholder-gray-300 rounded-lg shadow-lg outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all'
                        name='rol'
                    >
                        {token === 'yes' && 
                        <option value='administrador'>Administrador</option>}
                        <option value='residente'>Residente</option>
                    </select>
                </label>

                <button
                    className='w-full py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-300 transition-all'
                    type='submit'
                >
                    Crear Usuario
                </button>
            </form>
        </section>
    );
};
