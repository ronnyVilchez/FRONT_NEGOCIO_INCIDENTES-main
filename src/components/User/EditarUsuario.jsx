import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AdminContex';
import { AuthContext } from '../../context/AuthContex';
import { toast, ToastContainer } from 'react-toastify'; // Importa toast y ToastContainer
import 'react-toastify/dist/ReactToastify.css';

export const EditUser = () => {
    const { updatUser} = useContext(AdminContext)
    const { infoUser } = useContext(AuthContext)

    async function editUser(e) {
        e.preventDefault()

        const data = Object.fromEntries(
            new FormData(e.target)
        )
        console.log(data);
        try {
            await updatUser.mutateAsync(data);
            toast.success('¡Usuario actualizado con éxito!'); // Notificación de éxito
        } catch (error) {
            toast.error('Error al actualizar el usuario'); // Notificación de error si algo falla
        }

        e.target.reset();
    }

    return (
        <section className='w-full flex flex-col text-[1.2rem] gap-4 '>
            <h2 className='font-semibold'>Edita tu usuario</h2>
            <span className='text-[1rem]'>Modifique los campos cuyos datos desea actualizar </span>

            {infoUser &&
                 (
                    <form className='border-[1px] text-[1.1rem] border-gray-200 flex flex-col rounded-2xl p-6 gap-4 bg-orange-400 bg-opacity-70 font-semibold' onSubmit={editUser} >

                        <label className='  p-2 flex flex-col py-4 items-start ' > Nombre:<input  placeholder='Nombre de nuevo usuario' defaultValue={infoUser.nombre} className='px-4 outline-none rounded-md bg-green-400 w-full h-[3rem] text-black font-normal' type="text" name='nombre' /></label>

                        <label className=' p-2 flex flex-col py-4 items-start' > Apellido: <input  placeholder='Apellido de nuevo usuario' defaultValue={infoUser.apellido} className='px-4 outline-none rounded-xl bg-green-400 w-full h-[3rem] text-black font-normal' type="text" name='apellido' /></label>

                        <label className='  p-2 flex flex-col py-4 items-start uppercase'> dni: <input  placeholder='DNI de nuevo usuario' defaultValue={infoUser.dni} className='px-4 outline-none rounded-md bg-green-400 w-full h-[3rem] text-black font-normal' type="number" min={10000000} name='dni' /></label>

                        <label className='  p-2 flex flex-col py-4 items-start '> Telefono: <input  placeholder='Telefono de nuevo usuario' defaultValue={infoUser.telefono} className='px-4 outline-none rounded-md bg-green-400 w-full h-[3rem] text-black font-normal' type="tel" name='telefono' /></label>

                       {infoUser.rol === 'administrador' &&
                        <label className=' p-2 flex flex-col py-4 items-start' > Rol: <select  className='px-4 outline-none rounded-md bg-green-400 w-full h-[3rem]  text-black font-normal' defaultValue={infoUser.rol} type="text" name='rol'>
                            <option value="administrador">Administrador</option>
                            <option value="residente">Residente</option>

                        </select>
                        </label>}

                        <label className=' p-2 flex flex-col py-4 items-start' > Correo: <input  className='px-4 outline-none rounded-md bg-green-400 w-full h-[3rem]  text-black font-normal ' defaultValue={infoUser.email} type="email" name='email' placeholder='Correo de nuevo usuario' /></label>

                        <label className=' p-2 flex flex-col py-4 items-start' > Usuario: <input  className='px-4 outline-none rounded-md bg-green-400 w-full h-[3rem]  text-black font-normal ' defaultValue={infoUser.usuario} type="text" name='usuario' placeholder='Usuario con el que ingresara a la Pagina' /></label>

                        <label className=' p-2 flex flex-col py-4 items-start' > Contraseña: <input  className='px-4 outline-none rounded-md bg-green-400 w-full h-[3rem]  text-black font-normal ' type="text" name='password' placeholder='Contraseña con la que ingresara a la Pagina' /></label>

                        <button className='bg-orange-400 hover:bg-green-800 rounded-lg h-[3rem] text-white font-semibold' type='submit'>Editar y guardar </button>
                    </form>
                )
            }

        </section>
    )
}

