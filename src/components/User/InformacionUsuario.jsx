import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContex';
import { User, Phone, Mail, Building, Edit, Check } from 'lucide-react';

export const InfoUser = () => {
    const { infoUser, updateUserInfo } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedInfo, setEditedInfo] = useState({ ...infoUser });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        updateUserInfo(editedInfo);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setEditedInfo({ ...editedInfo, [e.target.name]: e.target.value });
    };

    if (!infoUser) return null;

    return (
        <div className="bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300 rounded-3xl text-center shadow-2xl p-6 sm:p-8 max-w-3xl mx-auto">
        <div className="flex justify-center items-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Datos de Usuario</h2>
        </div>
      
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-center bg-white rounded-xl shadow-lg p-4 sm:p-5 hover:bg-indigo-100 transition-all duration-200">
            <User className="text-green-500 mr-5 sm:mr-7" size={24} />
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
              {isEditing ? (
                <input
                  type="text"
                  name="nombre"
                  value={editedInfo.nombre}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                />
              ) : (
                <p className="text-base sm:text-lg text-gray-800 font-semibold">{`${infoUser.nombre} ${infoUser.apellido}`}</p>
              )}
            </div>
          </div>
      
          <div className="flex items-center bg-white rounded-xl shadow-lg p-4 sm:p-5 hover:bg-indigo-100 transition-all duration-200">
            <Phone className="text-green-500 mr-5 sm:mr-7" size={24} />
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="numero_contacto"
                  value={editedInfo.numero_contacto}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                />
              ) : (
                <p className="text-base sm:text-lg text-indigo-800 font-semibold">{infoUser.numero_contacto}</p>
              )}
            </div>
          </div>
      
          <div className="flex items-center bg-white rounded-xl shadow-lg p-4 sm:p-5 hover:bg-indigo-100 transition-all duration-200">
            <Mail className="text-green-500 mr-5 sm:mr-7" size={24} />
            <div className="flex-grow min-w-0">
              <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <p className="text-base sm:text-lg text-indigo-800 truncate font-semibold">{infoUser.email}</p>
            </div>
          </div>
      
          <div className="flex items-center bg-white rounded-xl shadow-lg p-4 sm:p-5 hover:bg-indigo-100 transition-all duration-200">
            <Building className="text-green-500 mr-5 sm:mr-7" size={24} />
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700">Departamento</label>
              <p className="text-base sm:text-lg text-indigo-800 font-semibold">{infoUser.departamento}</p>
            </div>
          </div>
        </div>
      </div>
      
      
    );
};