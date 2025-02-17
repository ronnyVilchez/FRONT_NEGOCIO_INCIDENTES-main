import React, { useContext, useState } from "react";
import { Link } from "wouter";
import { AuthContext } from "../context/AuthContex";
import {
  ChevronDown,
  Users,
  FileText,
  UserPlus,
  Home,
  LogOut,
  User,
  Calendar,
} from "lucide-react";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";

const OpcionesAdm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { to: "/dashboard/users", icon: Users, text: "Usuarios" },
    { to: "/dashboard/incidentAll", icon: FileText, text: "Reportes" },
    { to: "/dashboard/create", icon: UserPlus, text: "Crear Usuario" },
    { to: "/dashboard/calendar", icon: Calendar, text: "Calendario" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row  justify-items-stretch place-items-center w-fit h-fit  bg-orange-600 hover:bg-green-700 text-white font-semibold py-1 px-2 rounded transition duration-300 "
      >
        <span>Admin</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ">
          {options.map((option, index) => (
            <Link
              key={index}
              href={option.to}
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center text-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white transition duration-300"
            >
              <option.icon className="h-4 w-4 mr-2 text-indigo-500" />
              <span>{option.text}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const OpcionesUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { to: "/dashboard/report", text: "Reportar un problema" },
    { to: "/dashboard/incident", text: "Ver mis reportes" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs sm:text-base py-2 sm:py-1  px-2 rounded transition duration-300"
      >
        <span>Opciones</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10">
          {options.map((option, index) => (
            <Link
            onClick={() => setIsOpen(!isOpen)}
              key={index}
              href={option.to}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 transition duration-300"
            >
              {option.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export const Navbar = () => {
  const { infoUser, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md">
      <div className="max-w-7xl px-2 sm:px-6 ">
        <div className="flex justify-between gap-1 h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/dashboard" className="flex items-center ">
              <BuildingOfficeIcon className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold hidden md:block">
                Home
              </span>
            </Link>
          </div>
          <div className="flex flex-row gap-2 items-center ">
            {infoUser?.rol === "administrador" ? <OpcionesAdm /> : <OpcionesUser />}
            <Link
              href="/dashboard/profile"
              className="bg-orange-600 hover:bg-green-700 text-white font-bold text-xs sm:text-base py-2 sm:py-1 px-2 rounded inline-flex items-center transition duration-300"
            >
              Perfil
            </Link>
            <button
              onClick={logout}
              className="bg-orange-600 hover:bg-green-700 text-white font-bold text-xs sm:text-base py-2 sm:py-1 px-2 rounded inline-flex items-center transition duration-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </button>
            {/* Mueve este bloque después del botón de Logout */}
            {infoUser && (
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">
                  {infoUser.rol === "administrador" ? "Admin" : "Resident"}:{" "}
                  {infoUser.nombre}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};






// import React, { useContext, useState } from "react";
// import { Link } from "wouter";
// import { AuthContext } from "../context/AuthContex";
// import {
//   ChevronDown,
//   Users,
//   FileText,
//   UserPlus,
//   Home,
//   LogOut,
//   User,
// } from "lucide-react";
// import { BuildingOfficeIcon } from "@heroicons/react/24/solid";

// const OpcionesAdm = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const options = [
//     { to: "/dashboard/users", icon: Users, text: "Usuarios" },
//     { to: "/dashboard/incidentAll", icon: FileText, text: "Reportes" },
//     { to: "/dashboard/create", icon: UserPlus, text: "Crear Usuario" },
//   ];

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center space-x-1 bg-orange-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
//       >
//         <span>Admin</span>
//         <ChevronDown
//           className={`h-4 w-4 transition-transform duration-300 ${
//             isOpen ? "rotate-180" : ""
//           }`}
//         />
//       </button>
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//           {options.map((option, index) => (
//             <Link
//               key={index}
//               href={option.to}
//               className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 transition duration-300"
//             >
//               <option.icon className="h-4 w-4 mr-2 text-indigo-500" />
//               <span>{option.text}</span>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const OpcionesUser = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const options = [
//     { to: "/dashboard/report", text: "Reportar un problema" },
//     { to: "/dashboard/incident", text: "Ver mis reportes" },
//   ];

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
//       >
//         <span>Opciones</span>
//         <ChevronDown
//           className={`h-4 w-4 transition-transform duration-300 ${
//             isOpen ? "rotate-180" : ""
//           }`}
//         />
//       </button>
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10">
//           {options.map((option, index) => (
//             <Link
//               key={index}
//               href={option.to}
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 transition duration-300"
//             >
//               {option.text}
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export const Navbar = () => {
//   const { infoUser, logout } = useContext(AuthContext);

//   return (
//     <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex-shrink-0 flex items-center">
//             <Link href="/dashboard" className="flex items-center ">
//               <BuildingOfficeIcon className="h-8 w-8" />
//               <span className="ml-2 text-xl font-bold hidden md:block">
//                 Home
//               </span>
//             </Link>
//           </div>
//           <div className="flex items-center space-x-4">
//             {infoUser && (
//               <>
//                 <div className="flex items-center">
//                   <User className="h-5 w-5 mr-2" />
//                   <span className="text-sm font-medium">
//                     {infoUser.rol === "administrador" ? "Admin" : "Resident"}:{" "}
//                     {infoUser.nombre}
//                   </span>
//                 </div>
//                 {infoUser.rol === "administrador" ? (
//                   <OpcionesAdm />
//                 ) : (
//                   <OpcionesUser />
//                 )}
//               </>
//             )}
//             <Link
//               href="/dashboard/profile"
//               className="bg-orange-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300"
//             >
//               Perfil
//             </Link>
//             <button
//               onClick={logout}
//               className="bg-orange-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300"
//             >
//               <LogOut className="h-4 w-4 mr-2" />
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };
