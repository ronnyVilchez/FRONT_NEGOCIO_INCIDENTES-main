import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContex';
import { Link } from 'wouter';
import dayjs from 'dayjs';

export const Incident = () => {
    const { reportFrUs, delReport } = useContext(AdminContext);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        if (reportFrUs) setReports(reportFrUs);
    }, [reportFrUs]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        let filteredReports = [...reportFrUs];

        if (name === 'status') {
            filteredReports = value ? filteredReports.filter(rp => rp.estado === value) : filteredReports;
        } 
       /*  else if (name === 'desde') {
            const fechaDesde = dayjs(value).startOf('day');
            filteredReports = filteredReports.filter(rp => dayjs(rp.date).isSameOrAfter(fechaDesde));
        } else if (name === 'hasta') {
            const fechaHasta = dayjs(value).endOf('day');
            filteredReports = filteredReports.filter(rp => dayjs(rp.date).isSameOrBefore(fechaHasta));
        } */

        setReports(filteredReports);
    };

    const handleUpdate = (id) => {
        localStorage.setItem('idIn', id);
    };

    const handleDelete = async (id) => {
        await delReport.mutateAsync(id);
    };

    return (
        <section className='w-full h-screen flex flex-col gap-4 bg-blue-50 p-4'>
            <header className='w-full flex flex-col gap-4 sm:flex-row items-center justify-between mb-4'>
                <h2 className='text-2xl font-bold text-blue-800'>Mis incidencias </h2>
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                    <label className='text-blue-600 flex items-center gap-2'>
                        Estado:
                        <select
                            name='status'
                            className='rounded-xl border border-blue-300 p-2 outline-none text-black'
                            onChange={handleFilterChange}
                        >
                            <option value="">Todos</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="en_proceso">Progreso</option>
                            <option value="resuelta">Resuelto</option>
                        </select>
                    </label>
                   
                </div>
            </header>
            <section className="overflow-x-auto w-full">
                <table className="min-w-full bg-white bg-opacity-90 border border-purple-200 rounded-md">
                    <thead>
                    <tr className="bg-blue-100 border-b border-blue-300">
                            <th className="py-2 px-4 text-center text-blue-700">Usuario</th>
                            <th className="py-2 px-4 text-center text-blue-700">Asunto</th>
                            <th className="py-2 px-4 text-center text-yellow-500">Descripción</th>
                            <th className="py-2 px-4 text-center text-orange-600">Tipo</th>
                            <th className="py-2 px-4 text-center text-purple-600">Fecha Programada</th>
                            <th className="py-2 px-4 text-center text-purple-600">Hora Programada</th>
                            <th className="py-2 px-4 text-center text-blue-600">Complejidad</th>
                            <th className="py-2 px-4 text-center text-green-600">Estado</th>
                            <th className="py-2 px-4 text-center text-red-600">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((item) => (
                           <tr key={item.id} className="relative text-black border-b border-blue-300 hover:bg-blue-50 transition-colors">
                           <td className="py-2 px-4 text-center">{item.asunto}</td>
                           <td className="py-2 px-4 text-center">{item.descripcion}</td>
                           <td className="py-2 px-4 text-center">{item.tipo}</td>
                           <td className="py-2 px-4 text-center">
                               {new Date(item.fecha_programada).toLocaleDateString("es-ES")}
                           </td>
                           <td className="py-2 px-4 text-center">
                               {new Date(`1970-01-01T${item.hora_programada}`).toLocaleTimeString("es-ES", {
                                   hour: "2-digit",
                                   minute: "2-digit",
                                   hour12: true,
                               })}
                           </td>
                           <td className="py-2 px-4 text-center">
                               <div className="flex flex-col items-center">
                                   <span>{item.presupuesto}</span>
                                   <span className="text-xs text-gray-500">
                                       {item.presupuesto === "simple" && "S/100 a S/500"}
                                       {item.presupuesto === "moderado" && "S/500 a S/1500"}
                                       {item.presupuesto === "complejo" && "S/1500 a S/3000"}
                                       {item.presupuesto === "muy_complejo" && "S/3000 a S/5000"}
                                       {item.presupuesto === "especializado" && "S/5000 a más"}
                                   </span>
                               </div>
                           </td>
                           <td className="py-2 px-4 text-center">{item.estado}</td>
                           <td className="py-2 px-4 text-center cursor-pointer">
                               <button
                                   className="text-red-500 hover:underline"
                                   onClick={() => handleDelete(item.id)}
                               >
                                   Eliminar
                               </button>
                           </td>
                       </tr>
                       
                        ))}
                    </tbody>
                </table>
            </section>
        </section>
    );
};
