import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContex';
import { User, Phone, Mail, Building, Edit, Check } from 'lucide-react';

export const InfoUser = () => {
    const { infoUser } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedInfo, setEditedInfo] = useState({ ...infoUser });


    const handleChange = (e) => {
        setEditedInfo({ ...editedInfo, [e.target.name]: e.target.value });
    };

    if (!infoUser) return null;

    return (
        <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 rounded-3xl shadow-xl p-6 sm:p-8 max-w-4xl mx-auto w-full">
            <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Datos de Usuario</h2>
            </div>

            <div className="space-y-6 sm:space-y-8">
                {[{
                    icon: <User className="text-indigo-600 mr-4 sm:mr-6" size={24} />,
                    label: "Nombre Completo",
                    name: "nombre",
                    value: `${infoUser.nombre} ${infoUser.apellido}`
                }, {
                    icon: <Phone className="text-indigo-600 mr-4 sm:mr-6" size={24} />,
                    label: "Teléfono",
                    name: "numero_contacto",
                    value: infoUser.numero_contacto
                }, {
                    icon: <Mail className="text-indigo-600 mr-4 sm:mr-6" size={24} />,
                    label: "Correo Electrónico",
                    name: "email",
                    value: infoUser.email,
                    isReadOnly: true
                }, {
                    icon: <Building className="text-indigo-600 mr-4 sm:mr-6" size={24} />,
                    label: "Departamento",
                    name: "departamento",
                    value: infoUser.departamento
                }].map(({ icon, label, name, value, isReadOnly }) => (
                    <div key={name} className="flex items-center bg-white rounded-xl shadow-lg p-4 sm:p-5 hover:bg-indigo-100 transition-all duration-200">
                        {icon}
                        <div className="flex-grow min-w-0">
                            <label className="block text-sm font-medium text-gray-700">{label}</label>

                            <p className="text-base sm:text-lg text-gray-800 font-semibold truncate">{value}</p>

                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};
