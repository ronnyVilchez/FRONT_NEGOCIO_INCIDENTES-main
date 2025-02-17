import React, { useContext } from "react";
import { AdminContext } from "../../context/AdminContex";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Users = () => {
  const { userAll, delUser } = useContext(AdminContext);

  const handleDelUs = async (id) => {
    console.log(id);
    try {
      await delUser.mutateAsync(id);
      toast.success("Usuario eliminado!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <section className="w-full h-screen flex flex-col gap-4 p-4 bg-blue-50">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">
        Lista de usuarios registrados
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white bg-opacity-90 border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                Nombre
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                Apellido
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                Correo
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                Teléfono
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                Rol
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {userAll?.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-2 px-4 text-gray-800">{item.nombre}</td>
                <td className="py-2 px-4 text-gray-800">{item.apellido}</td>
                <td className="py-2 px-4 text-gray-800">{item.email}</td>
                <td className="py-2 px-4 text-gray-800">
                  {item.numero_contacto}
                </td>
                <td className="py-2 px-4 text-gray-800">{item.rol}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => handleDelUs(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
