import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AdminContext } from "../context/AdminContex";
import { useContext, useEffect, useState } from "react";
import es from "date-fns/locale/es";


const locales = { es };
const localizer = dateFnsLocalizer({
    format: (date, formatStr) => format(date, formatStr, { locale: es }), // Aplica la localización
    parse,
    startOfWeek: () => startOfWeek(new Date(), { locale: es }), // Define el inicio de la semana en español
    getDay,
    locales,
  });

const MyCalendar = () => {
    
    const { reportAll } = useContext(AdminContext);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        if (Array.isArray(reportAll) && reportAll.length > 0) {
            setReports(reportAll);
        }
        console.log("Datos en reportAll:", reportAll);
    }, [reportAll]);
    

     const events = reports?.map((item) => {
    // Crear un nuevo objeto Date a partir de fecha_programada
    const startDate = new Date(item.fecha_programada);

    // Separar la hora y los minutos de hora_programada
    const [hour, minute] = item.hora_programada.split(":");

    // Ajustar la hora y los minutos
    startDate.setHours(hour, minute);

    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1); 

    return {
      title: item.asunto,
      start: startDate,
      end: endDate, // Se usa la misma fecha para el final si es un evento de una sola instancia
    };
  });

  return (
    <div className="w-full h-full">
      <h2>Calendario de Reportes</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]} // Aseguramos que todas las vistas estén habilitadas
        defaultView="month" // Establecemos la vista predeterminada en "month"
        messages={{
            allDay: 'Todo el día', // Traducción de "all day"
            previous: 'Anterior',  // Traducción del botón "previous"
            next: 'Siguiente',  // Traducción del botón "next"
            today: 'Hoy',  // Traducción de "today"
            month: 'Mes',  // Traducción de "month"
            week: 'Semana',  // Traducción de "week"
            day: 'Día',  // Traducción de "day"
            agenda: 'Agenda',  // Traducción de "agenda"
            date: 'Fecha',  // Traducción de "date"
            time: 'Hora',  // Traducción de "time"
            event: 'Evento',  // Traducción de "event"
        }}
      />
    </div>
  );
};

export default MyCalendar;
