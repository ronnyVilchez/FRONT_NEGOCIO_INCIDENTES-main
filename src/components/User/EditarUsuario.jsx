import React, { useContext } from 'react';
import { AdminContext } from '../../context/AdminContex';
import { AuthContext } from '../../context/AuthContex';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditUser = () => {
    const { updatUser } = useContext(AdminContext);
    const { infoUser } = useContext(AuthContext);

    async function editUser(e) {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        try {
            await updatUser.mutateAsync(data);
            toast.success('¡Usuario actualizado con éxito!');
        } catch (error) {
            toast.error('Error al actualizar el usuario');
        }

        e.target.reset();
    }

    return (
        <section className='w-full flex flex-col items-center text-lg gap-6 p-4 bg-gradient-to-b from-blue-900 to-blue-600 text-white min-h-screen'>
            <h2 className='text-3xl font-bold'>Edita tu usuario</h2>
            <span className='text-xl text-gray-200'>
                Modifique los campos cuyos datos desea actualizar
            </span>

            {infoUser && (
                <form
                    className='w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg text-gray-800'
                    onSubmit={editUser}
                >
                    <div className='grid grid-cols-1 gap-4'>
                        <label className='flex flex-col'>
                            <span className='text-sm font-semibold'>Nombre</span>
                            <input
                                placeholder='Nombre de nuevo usuario'
                                defaultValue={infoUser.nombre}
                                className='mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
                                type='text'
                                name='nombre'
                            />
                        </label>

                        <label className='flex flex-col'>
                            <span className='text-sm font-semibold'>Apellido</span>
                            <input
                                placeholder='Apellido de nuevo usuario'
                                defaultValue={infoUser.apellido}
                                className='mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
                                type='text'
                                name='apellido'
                            />
                        </label>

                        <label className='flex flex-col'>
                            <span className='text-sm font-semibold uppercase'>DNI</span>
                            <input
                                placeholder='DNI de nuevo usuario'
                                defaultValue={infoUser.dni}
                                className='mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
                                type='number'
                                min={10000000}
                                name='dni'
                            />
                        </label>

                        <label className='flex flex-col'>
                            <span className='text-sm font-semibold'>Teléfono</span>
                            <input
                                placeholder='Teléfono de nuevo usuario'
                                defaultValue={infoUser.telefono}
                                className='mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
                                type='tel'
                                name='telefono'
                            />
                        </label>

                        {infoUser.rol === 'administrador' && (
                            <label className='flex flex-col'>
                                <span className='text-sm font-semibold'>Rol</span>
                                <select
                                    className='mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
                                    defaultValue={infoUser.rol}
                                    name='rol'
                                >
                                    <option value='administrador'>Administrador</option>
                                    <option value='residente'>Residente</option>
                                </select>
                            </label>
                        )}

                        <label className='flex flex-col'>
                            <span className='text-sm font-semibold'>Correo</span>
                            <input
                                placeholder='Correo de nuevo usuario'
                                defaultValue={infoUser.email}
                                className='mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
                                type='email'
                                name='email'
                            />
                        </label>

                        <label className='flex flex-col'>
                            <span className='text-sm font-semibold'>Usuario</span>
                            <input
                                placeholder='Usuario con el que ingresará a la Página'
                                defaultValue={infoUser.usuario}
                                className='mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
                                type='text'
                                name='usuario'
                            />
                        </label>

                        <label className='flex flex-col'>
                            <span className='text-sm font-semibold'>Contraseña</span>
                            <input
                                placeholder='Contraseña con la que ingresará a la Página'
                                className='mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
                                type='password'
                                name='password'
                            />
                        </label>
                    </div>

                    <button className='mt-6 w-full py-3 bg-blue-700 hover:bg-blue-900 text-white font-semibold rounded-lg shadow-md transition-all duration-300'>
                        Editar y Guardar
                    </button>
                </form>
            )}

            <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} />
        </section>
    );
};
