import React, { useContext } from 'react';
import { AdminContext } from '../../context/AdminContex';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddUser = () => {
    const { createUser } = useContext(AdminContext);

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
        <section className='w-full flex flex-col items-center gap-6 p-6 bg-gray-50 min-h-screen'>
            <h2 className='text-2xl font-semibold text-blue-800'>Crear un nuevo usuario</h2>
            <p className='text-lg text-gray-600'>Llene todos los campos para registrar un nuevo usuario.</p>
            <form
                className='w-full max-w-lg border border-gray-300 rounded-lg p-6 bg-white shadow-md'
                onSubmit={sendUser}
            >
                <label className='block mb-4'>
                    <span className='block text-sm font-medium text-gray-700'>Nombre</span>
                    <input
                        required
                        placeholder='Nombre del nuevo usuario'
                        className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
                        type='text'
                        name='nombre'
                    />
                </label>

                <label className='block mb-4'>
                    <span className='block text-sm font-medium text-gray-700'>Apellido</span>
                    <input
                        required
                        placeholder='Apellido del nuevo usuario'
                        className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
                        type='text'
                        name='apellido'
                    />
                </label>

                <label className='block mb-4'>
                    <span className='block text-sm font-medium text-gray-700'>Email</span>
                    <input
                        required
                        placeholder='Email del nuevo usuario'
                        className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
                        type='email'
                        name='email'
                    />
                </label>

                <label className='block mb-4'>
                    <span className='block text-sm font-medium text-gray-700'>Departamento</span>
                    <input
                        required
                        placeholder='Departamento del nuevo usuario'
                        className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
                        type='text'
                        name='departamento'
                    />
                </label>

                <label className='block mb-4'>
                    <span className='block text-sm font-medium text-gray-700'>Teléfono</span>
                    <input
                        required
                        placeholder='Número de contacto del nuevo usuario'
                        className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
                        type='tel'
                        name='numero_contacto'
                    />
                </label>

                <label className='block mb-4'>
                    <span className='block text-sm font-medium text-gray-700'>Contraseña</span>
                    <input
                        required
                        placeholder='Contraseña para acceder al sistema'
                        className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
                        type='password'
                        name='password'
                    />
                </label>

                <label className='block mb-4'>
                    <span className='block text-sm font-medium text-gray-700'>Rol</span>
                    <select
                        className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
                        name='rol'
                    >
                        <option value='administrador'>Administrador</option>
                        <option value='residente'>Residente</option>
                    </select>
                </label>

                <button
                    className='w-full py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-green-600 transition'
                    type='submit'
                >
                    Crear Usuario
                </button>
            </form>
        </section>
    );
};
