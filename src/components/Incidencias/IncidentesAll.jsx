import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContex';
import dayjs from 'dayjs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const IncidentAll = () => {
    const { reportAll, updateStatus, delReport } = useContext(AdminContext);
    const [expandedId, setExpandedId] = useState(null);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        if (reportAll) setReports(reportAll);
    }, [reportAll]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    };

    const handleRowClick = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleUpdate = async (e, id) => {
        localStorage.setItem('idR', id);
    // cambie 'status' por 'estado', ya que asi lo emvia enel backend
        const data = {
            estado: e.target.value,  // Envía el estado directamente como JSON
        };
    
        try {
            console.log("Enviando datos a la API:", data);
            await updateStatus.mutateAsync(data);  // Axios enviará esto como JSON automáticamente
            toast.success('Estado actualizado correctamente');
    
            // Actualiza el estado local
            setReports(prevReports =>
                prevReports.map(report =>
                    report.id === id ? { ...report, estado: e.target.value } : report
                )
            );
        } catch (error) {
            toast.error('Error al actualizar el estado');
        }
    };

    // const handleUpdate = async (e, id) => {
    //     localStorage.setItem('idR', id);
    
    //     const data = new FormData();
    //     data.append('estado', e.target.value);
    
    //     try {
    //         console.log("Enviando datos a la API:", data);
    //         await updateStatus.mutateAsync(data);
    //         toast.success('Estado actualizado correctamente');
    
    //         // Update local state for reports
    //         setReports(prevReports =>
    //             prevReports.map(report =>
    //                 report.id === id ? { ...report, estado: e.target.value } : report
    //             )
    //         );
    //     } catch (error) {
    //         toast.error('Error al actualizar el estado');
    //     }
    // };
    

    // const handleUpdate = async (e, id) => {
    //     localStorage.setItem('idR', id);

    //     const data = new FormData();
    //     data.append('status', e.target.value);

    //     await updateStatus.mutateAsync(data);
    // };

    const handleDelete = async (id) => {
        try {
            await delReport.mutateAsync(id);
            toast.success('Reporte eliminado correctamente');
        } catch (error) {
            toast.error('Error al eliminar el reporte');
        }
    };

    const statusFilter = (e) => {
        if (e.target.value === '') {
            setReports(reportAll);
        } else {
            const filterArray = reportAll.filter((rp) => rp.estado === e.target.value);
            console.log(filterArray);
            setReports(filterArray);
        }
    };

    const filterDesde = (e) => {
        const fecha = dayjs(e.target.value).format('YYYY-MM-DD');
        const filterArray = reportAll.filter((rp) => dayjs(rp.date).format('YYYY-MM-DD') >= fecha);
        setReports(filterArray);
    };

    const filterHasta = (e) => {
        const fecha = dayjs(e.target.value).format('YYYY-MM-DD');
        const filterArray = reportAll.filter((rp) => dayjs(rp.date).format('YYYY-MM-DD') <= fecha);
        setReports(filterArray);
    };

    return (
        <section className='w-full h-screen flex flex-col gap-4 bg-blue-50 p-4'>
            <section className='w-full flex flex-row items-center justify-between'>
                <h2 className='text-2xl font-bold text-blue-900 mb-4'>Tus Reportes</h2>
                <section className='flex flex-row items-center gap-4'>
                    <label className='text-blue-800'>
                        Filtrar por:
                        <select className='rounded-xl border border-blue-300 p-2 outline-none text-black' onChange={statusFilter}>
                            <option value="">Todos</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="en_progreso">Progreso</option>
                            <option value="resuelto">Resuelto</option>
                        </select>
                    </label>
                    {/* <section>
                        <label className='text-blue-600'>
                            Desde:
                            <input className='text-black px-2 border border-blue-300 rounded-md' onChange={filterDesde} type="date" />
                        </label>
                        <label className='text-blue-600'>
                            Hasta:
                            <input className='text-black px-2 border border-blue-300 rounded-md' onChange={filterHasta} type="date" />
                        </label>
                    </section> */}
                </section>
            </section>
            <section className="overflow-x-auto w-full">
                <table className="min-w-full bg-white bg-opacity-90 border border-purple-200">
                    <thead>
                        <tr className="bg-blue-100 border-b border-blue-300">
                            <th className="py-2 px-4 text-center text-blue-700">Asunto</th>
                            <th className="py-2 px-4 text-center text-yellow-500">Descripción</th>
                            <th className="py-2 px-4 text-center text-orange-600">Tipo</th>
                            <th className="py-2 px-4 text-center text-green-600">Estado</th>
                            <th className="py-2 px-4 text-center text-red-600">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports &&
                            reports.map((item) => (
                                <React.Fragment key={item.id}>
                                    <tr className="relative text-black border-b border-blue-300">
                                        <td className="py-2 px-4 text-center">{item.asunto}</td>
                                        <td className="py-2 px-4 text-center">{item.descripcion}</td>
                                        <td className="py-2 px-4 text-center">{item.tipo}</td>
                                        <td className="py-2 px-4 text-center">
                                            <select
                                                required
                                                className='px-4 outline-none rounded-xl bg-blue-100 w-full h-10 cursor-pointer text-black font-normal'
                                                type="text"
                                                name='estado'
                                                defaultValue={item.estado}
                                                onChange={(e) => handleUpdate(e, item.id)}
                                            >
                                                <option value="pendiente">Pendiente</option>
                                                <option value="en_proceso">Progreso</option>
                                                <option value="resuelto">Resuelto</option>
                                            </select>
                                        </td>
                                        <td className="py-2 px-4 text-center cursor-pointer" colSpan={2}>
                                            <button
                                                className="text-red-500 hover:underline"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                    </tbody>
                </table>
            </section>
        </section>
    );
};
