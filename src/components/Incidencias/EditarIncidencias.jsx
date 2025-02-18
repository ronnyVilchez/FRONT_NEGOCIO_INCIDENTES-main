import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContex';

export const EditIncident = () => {
    const [error, setError] = useState('');
    const { updateReportUs, reportFOne } = useContext(AdminContext);

    const id = localStorage.getItem('idIn');

    async function updateHandleReport(e) {
        e.preventDefault();

        const data = new FormData(e.target);
        data.append('id', id);

        await updateReportUs.mutateAsync(data);
    }

    return (
        <section className='w-full flex flex-col items-center gap-6 p-6 bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300 min-h-screen'>
            <h2 className='text-3xl font-bold text-white'>Edita tu reporte aquí</h2>
            <p className='text-lg text-gray-100'>Agrega o modifica tu reporte</p>
            {reportFOne &&
                reportFOne.map((rp) => (
                    <form
                        key={rp.id}
                        className='w-full max-w-lg border border-gray-200 rounded-2xl p-6 bg-white shadow-xl'
                        onSubmit={updateHandleReport}
                    >
                        <label className='block mb-4'>
                            <span className='block text-sm font-medium text-gray-800'>Asunto</span>
                            <input
                                required
                                placeholder='Agrega el título del problema'
                                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-400 focus:border-indigo-400'
                                type='text'
                                name='title'
                                defaultValue={rp.asunto}
                            />
                        </label>

                        <label className='block mb-4'>
                            <span className='block text-sm font-medium text-gray-800'>Descripción</span>
                            <input
                                required
                                placeholder='Realiza una breve descripción'
                                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-400 focus:border-indigo-400'
                                type='text'
                                name='description'
                                defaultValue={rp.description}
                            />
                        </label>

                        <label className='block mb-4'>
                            <span className='block text-sm font-medium text-gray-800'>Tipo</span>
                            <select
                                required
                                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-400 focus:border-indigo-400'
                                name='type'
                                defaultValue={rp.tipo}
                            >
                                <option value='plomeria'>Plomería</option>
                                <option value='electricidad'>Electricidad</option>
                                <option value='estructural'>Estructural</option>
                                <option value='exteriores'>Exteriores</option>
                                <option value='paredes,pisos y techo'>Paredes, pisos y techo</option>
                                <option value='ascensores'>Ascensores</option>
                                <option value='otros'>Otros</option>
                            </select>
                        </label>

                        <label className='block mb-4'>
                            <span className='block text-sm font-medium text-gray-800'>Estado</span>
                            <select
                                required
                                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-400 focus:border-indigo-400'
                                name='status'
                                defaultValue={rp.status}
                            >
                                <option value='pendiente'>Pendiente</option>
                                <option value='progreso'>Progreso</option>
                                <option value='resuelto'>Resuelto</option>
                            </select>
                        </label>

                        <button
                            className='w-full py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300'
                            type='submit'
                        >
                            Guardar Edición
                        </button>

                        {error && <p className='text-red-500 mt-2'>{error}</p>}
                    </form>
                ))}
        </section>
    );
};
