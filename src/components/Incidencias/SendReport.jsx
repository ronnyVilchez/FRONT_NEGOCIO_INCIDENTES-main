import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContex';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure this is imported

export const Report = () => {
    const [error, setError] = useState('');
    const { createReport } = useContext(AdminContext);
    const usuario_id = localStorage.getItem('userId');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData(e.target);
        formData.append("usuario_id", usuario_id);
        formData.append("estado", "en_proceso");

        const jsonObject = Object.fromEntries(formData.entries());
        console.log("Datos enviados:", JSON.stringify(jsonObject, null, 2));
        
        try {
            await createReport.mutateAsync(formData);
            e.target.reset();
            toast.success('¡El reporte se ha enviado correctamente!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
        } catch (error) {
            console.error('Error al enviar el reporte:', error);
            setError('No se pudo enviar el reporte. Inténtelo de nuevo.');
            toast.error('No se pudo enviar el reporte.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
        }
    };


    return (
        <div className='container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>Nuevo reporte</h2>
            <p className='text-lg text-gray-600 mb-6'>Complete el formulario a continuación para reportar un problema.</p>

            <form className='bg-white p-6 rounded-lg shadow-md space-y-6' onSubmit={handleSubmit}>
                <div className='flex flex-col space-y-2'>
                    <label className='flex flex-col'>
                        <span className='text-sm font-medium text-gray-700'>Asunto:</span>
                        <input
                            required
                            placeholder='Ingrese el título del problema'
                            className='mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
                            type="text"
                            name='asunto'
                        />
                    </label>
                </div>
                <div className='flex flex-col space-y-2'>
                    <label className='flex flex-col'>
                        <span className='text-sm font-medium text-gray-700'>Descripción:</span>
                        <textarea
                            required
                            placeholder='Proporcione una breve descripción'
                            className='mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
                            name='descripcion'
                        />
                    </label>
                </div>
                <div className='flex flex-col space-y-2'>
                    <label className='flex flex-col'>
                        <span className='text-sm font-medium text-gray-700'>Categoria:</span>
                        <select required
                            className='mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
                            name='tipo'
                        >
                            <option value="fontaneria">Fontanería</option>
                            <option value="electricidad">Electricidad</option>
                            <option value="limpieza">Limpieza</option>
                            <option value="pintura">Pintura</option>
                            <option value="carpinteria">Carpintería</option>
                            <option value="cerrajeria">Cerrajería</option>
                            <option value="jardineria">Jardinería</option>
                            <option value="albañileria">Albañilería</option>
                            <option value="mantenimiento">Mantenimiento</option>
                            <option value="reparaciones">Reparaciones</option>
                            <option value="otros">Otros</option>
                        </select>

                    </label>
                </div>
                <div className='flex flex-col space-y-2'>
                    <label className='flex flex-col'>
                        <span className='text-sm font-medium text-gray-700'>Define tu presupuesto estimado:</span>
                        <select
                            required
                            className='mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
                            name='complejidad'
                        >
                            <option value="simple">S/. 100 - S/. 500</option>
                            <option value="moderado">S/. 500 - S/. 1,500</option>
                            <option value="complejo">S/. 1,500 - S/. 3,000</option>
                            <option value="muy_complejo">S/. 3,000 - S/. 5,000</option>
                            <option value="especializado">Más de S/. 5,000</option>
                        </select>

                    </label>
                </div>
                <div className='flex flex-col sm:flex-row sm:gap-8  '>


                    <div className='flex flex-col space-y-2'>
                        <label className='flex flex-col'>
                            <span className='text-sm font-medium text-gray-700'>Fecha de preferencia:</span>
                            <input
                                type="date"
                                required
                                className='mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
                                name='fecha_preferencia'
                                min={new Date().toISOString().slice(0, 10)} // Fecha mínima: hoy
                            />
                        </label>
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <label className='flex flex-col'>
                            <span className='text-sm font-medium text-gray-700'>Hora de preferencia:</span>
                            <select
                                required
                                className='mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
                                name='hora_preferencia'
                            >
                                <option value="" disabled selected>Selecciona una hora</option>
                                <option value="08:00 AM">08:00 AM</option>
                                <option value="09:00 AM">09:00 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="12:00 PM">12:00 PM</option>
                                <option value="01:00 PM">01:00 PM</option>
                                <option value="02:00 PM">02:00 PM</option>
                                <option value="03:00 PM">03:00 PM</option>
                                <option value="04:00 PM">04:00 PM</option>
                                <option value="05:00 PM">05:00 PM</option>
                                <option value="06:00 PM">06:00 PM</option>
                                <option value="07:00 PM">07:00 PM</option>
                                <option value="08:00 PM">08:00 PM</option>
                            </select>
                        </label>
                    </div>

                </div>

                <br />
                <span className='text-sm font-medium text-gray-700'>Adjuntar: Envía imágenes que ayuden a entender la incidencia, así podremos ayudarte más eficientemente. </span>
                <br />
                <input className='' id='photo' name='photo' type="file" />
                {error && <p className='text-red-500 text-sm'>{error}</p>}
                <button
                    className='w-full py-2 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    type='submit'
                    disabled={createReport.isLoading}
                >
                    {createReport.isLoading ? 'Enviando...' : 'Enviar Reporte'}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};


