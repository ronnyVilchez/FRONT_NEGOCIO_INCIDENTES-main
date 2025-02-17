import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AdminContext } from "../context/AdminContex";
import { useContext, useEffect, useState } from "react";
import es from "date-fns/locale/es";


const locales = { es };
const localizer = dateFnsLocalizer({
    format: (date, formatStr) => format(date, formatStr, { locale: es }),
    parse,
    startOfWeek: () => startOfWeek(new Date(), { locale: es }),
    getDay,
    locales,
});

const MyCalendar = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });


    const { reportAll, userAll } = useContext(AdminContext);
    const [reports, setReports] = useState([]);
     const [users, setUsers] = useState([]);
    

    useEffect(() => {
        if (Array.isArray(reportAll) && reportAll.length > 0) {
            setReports(reportAll);
        }
        if (Array.isArray(userAll) && userAll.length > 0) {
            setUsers(userAll);
        }
    }, [reportAll,userAll]);

    const getUsuarioNombre = (userId) => {
        const usuario = users?.find((user) => user.id === userId);
        return usuario ? usuario.nombre : 'Usuario no encontrado'; // Retorna un nombre por defecto si no se encuentra
    };

    const events = reports?.map((item) => {
        const startDate = new Date(item.fecha_programada);

        const [hour, minute] = item.hora_programada.split(":");

        startDate.setHours(hour, minute);

        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + 1);

        return {
            title: item.asunto,
            start: startDate,
            end: endDate,
            usuario: getUsuarioNombre(item.usuario_id), // Aquí agregas el nombre del usuario
            descripcion: item.descripcion,
            tipo: item.tipo,
            complejidad: item.presupuesto,
            estado: item.estado,
        };
    });

    const handleEventClick = (event, e) => {
        e.stopPropagation(); // Evita que el click se propague y cierre el modal inmediatamente

        const rect = e.target.getBoundingClientRect();
        setModalPosition({
            top: rect.top + window.scrollY + 30, // Posiciona debajo del evento
            left: rect.left + window.scrollX,
        });

        setSelectedEvent(event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };


    return (
        <div className="w-full h-full " onClick={closeModal}>
            <h2>Calendario de Reportes</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={["month", "week", "day"]}
                defaultView="month"
                onSelectEvent={handleEventClick}

                messages={{
                    allDay: 'Todo el día',
                    previous: 'Anterior',
                    next: 'Siguiente',
                    today: 'Hoy',
                    month: 'Mes',
                    week: 'Semana',
                    day: 'Día',
                    agenda: 'Agenda',
                    date: 'Fecha',
                    time: 'Hora',
                    event: 'Evento',
                }}
            />
            {selectedEvent && (
                <div
                    className="absolute z-20 bg-[#4494da] text-white p-2 shadow-md rounded-md border border-gray-300"
                    style={{ top: modalPosition.top, left: modalPosition.left }}
                    onClick={(e) => e.stopPropagation()} // Evita que el modal se cierre al hacer clic dentro
                >
                    <h3 className="text-lg  font-bold mb-3">Detalles del Reporte</h3>
                    <p><strong>Usuario:</strong> {selectedEvent.usuario}</p>
                    <p><strong>Asunto:</strong> {selectedEvent.title}</p>
                    <p><strong>Descripción:</strong> {selectedEvent.descripcion}</p>
                    <p><strong>Tipo:</strong> {selectedEvent.tipo}</p>
                    <p><strong>Complejidad:</strong> {selectedEvent.complejidad}</p>
                    <p><strong>Estado:</strong> {selectedEvent.estado}</p>
                </div>
            )}
        </div>
    );
};

export default MyCalendar;
