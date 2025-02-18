import React from 'react';
import { Route, useLocation } from 'wouter';
import { Report } from '../components/Incidencias/SendReport';
import { Incident } from '../components/Incidencias/Incidente';
import { Users } from '../components/User/Usuarios';
import { IncidentAll } from '../components/Incidencias/IncidentesAll';
import { AddUser } from '../components/User/Añadirusuario';
import { EditIncident } from '../components/Incidencias/EditarIncidencias';
import { EditUser } from '../components/User/EditarUsuario';
import { InfoUser } from '../components/User/InformacionUsuario';
import MyCalendar from '../components/Calendar';

export const Dashboard = () => {
    const [location] = useLocation();

    return (
        <main className={`${location === '/dashboard' ? 'sm:h-screen' : 'h-full'} flex flex-col sm:w-full w-screen p-4 sm:p-8 gap-6 sm:gap-8 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 min-h-screen text-white`}> 
            <section className="flex flex-col w-full gap-6 sm:gap-8 px-4 sm:px-8">
                <section className="w-full h-auto py-4 sm:py-6 sm:px-12 bg-white bg-opacity-10 rounded-2xl shadow-xl backdrop-blur-lg border border-blue-400">
                    <Route path="/dashboard" component={InfoUser} />
                    <Route path="/dashboard/report" component={Report} />
                    <Route path="/dashboard/incident" component={Incident} />
                    <Route path="/dashboard/users" component={Users} />
                    <Route path="/dashboard/incidentAll" component={IncidentAll} />
                    <Route path="/dashboard/create" component={AddUser} />
                    <Route path="/dashboard/edit" component={EditIncident} />
                    <Route path="/dashboard/profile" component={EditUser} />
                    <Route path="/dashboard/calendar" component={MyCalendar} />
                </section>
            </section>
        </main>
    );
};
