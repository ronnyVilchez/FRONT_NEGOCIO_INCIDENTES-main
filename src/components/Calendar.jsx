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
  }, [reportAll, userAll]);

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

    const isSelected = selectedEvent && selectedEvent.title === item.asunto;

    return {
      title: item.asunto,
      start: startDate,
      end: endDate,
      usuario: getUsuarioNombre(item.usuario_id),
      descripcion: item.descripcion,
      tipo: item.tipo,
      complejidad: item.presupuesto,
      estado: item.estado,
      className: isSelected
        ? 'bg-yellow-400 text-red-500 border-2 border-orange-500' // Fondo amarillo, texto rojo, borde naranja
        : 'bg-transparent text-black',   // Cuando no está seleccionado, no tiene color de fondo
    };
  });

  const handleEventClick = (event, e) => {
    e.stopPropagation();

    const rect = e.target.getBoundingClientRect();
    const modalWidth = 300;
    const modalHeight = 200;

    let topPosition = rect.top + window.scrollY + 30;
    let leftPosition = rect.left + window.scrollX;

    if (leftPosition + modalWidth > window.innerWidth) {
      leftPosition = window.innerWidth - modalWidth - 20;
    }

    if (topPosition + modalHeight > window.innerHeight) {
      topPosition = window.innerHeight - modalHeight - 20;
    }

    setModalPosition({
      top: topPosition,
      left: leftPosition,
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
        className="w-full h-screen"
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
          onClick={(e) => e.stopPropagation()}
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
