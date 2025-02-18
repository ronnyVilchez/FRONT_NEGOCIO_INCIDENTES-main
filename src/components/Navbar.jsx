import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { AuthContext } from "../context/AuthContex";
import {
  ChevronDown,
  Users,
  FileText,
  UserPlus,
  Calendar,
  LogOut,
  User,
} from "lucide-react";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";

const DropdownMenu = ({ options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Cierra el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold sm:px-2 sm:py-2 px-2 py-1 rounded-lg transition-all duration-300"
        title={label}
        aria-label={label}
      >
        <span>{label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 px-3 text-center bg-white rounded-md shadow-lg py-1 z-10 transition-all duration-300">
          {options.map((option, index) => (
            <Link
              key={index}
              href={option.to}
              onClick={() => setIsOpen(false)}
              className="flex border-b border-blue-400 items-center py-2 text-sm text-gray-700 hover:bg-blue-200 transition-all duration-300 w-full"
              title={option.text}
            >
              {option.icon && <option.icon className="h-4 w-4 mr-2 text-blue-600" />}
              <span>{option.text}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export const Navbar = () => {
  const { infoUser, logout } = useContext(AuthContext);
  const isAdmin = infoUser?.rol === "administrador";

  const adminOptions = [
    { to: "/dashboard/users", icon: Users, text: "Usuarios" },
    { to: "/dashboard/incidentAll", icon: FileText, text: "Reportes" },
    { to: "/dashboard/create", icon: UserPlus, text: "Crear Usuario" },
    { to: "/dashboard/calendar", icon: Calendar, text: "Calendario" },
  ];

  const userOptions = [
    { to: "/dashboard/report", text: "Reportar un problema" },
    { to: "/dashboard/incident", text: "Ver mis reportes" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-row flex-nowrap justify-between items-center h-16">
          <Link href="/dashboard" className="flex items-center text-white font-bold text-lg">
            <BuildingOfficeIcon className="h-8 w-8 text-white" aria-label="Inicio" />
            <span className="ml-2 hidden sm:block">Home</span>
          </Link>

          <div className="flex flex-nowrap items-center gap-2 sm:gap-4">
            <DropdownMenu options={isAdmin ? adminOptions : userOptions} label={isAdmin ? "Admin" : "Opciones"} />

            <Link
              href="/dashboard/profile"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2 py-1 sm:py-2 sm:px-3 rounded-lg transition-all duration-300"
              title="Perfil"
              aria-label="Perfil"
            >
              Perfil
            </Link>

            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-2 py-1 sm:py-2 sm:px-3 rounded-lg transition-all duration-300 flex items-center"
              title="Cerrar sesión"
              aria-label="Cerrar sesión"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>

            {infoUser && (
              <div className="flex items-center gap-2 text-center bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg transition-all duration-300">
                <User className="hidden sm:block h-5 w-5 text-white" aria-label="Usuario" />
                <span className="text-sm font-medium text-white">
                  {isAdmin ? "Admin" : "User"}: {infoUser.nombre}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
