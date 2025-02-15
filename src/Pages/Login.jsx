import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContex";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "wouter";

export const Login = () => {
  const { loginUser } = useContext(AuthContext);

  async function handleLog(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    await loginUser.mutateAsync(formData);

    try {
      await loginUser.mutateAsync(formData);
      toast.success("Inicio de sesión exitoso!");
    } catch (error) {
      toast.error(
        "Error al iniciar sesión. Por favor, verifica tus credenciales."
      );
    }
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-50 px-4  py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full  max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight  text-gray-900">
            <figure className="h-[25%] w-[88%] mx-auto  ">
              <img
                src="edificio_final.jpg"
                alt="Logo"
                className="w-full h-full "
              />
            </figure>
            <br />
            Gestor de incidencias
          </h2>
          <div className="flex flex-row justify-center items-center gap-4 pt-2">
          <span className=" text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            
          </span>
          <Link
              to='/dashboard/create'
              className="font-medium text-orange-600 hover:underline"
            >Registrarme Ahora</Link>
          </div>
          
        </div>
        <form
          onSubmit={handleLog}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-orange-600 hover:underline"
                ></a>
              </div>
            </div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
