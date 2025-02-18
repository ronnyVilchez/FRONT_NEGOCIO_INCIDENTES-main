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
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="w-96 h-96 bg-white opacity-10 blur-3xl rounded-full"></div>
    </div>
    <div className="relative mx-auto w-full max-w-md bg-white/20 backdrop-blur-lg shadow-lg rounded-xl p-8">
      <div className="text-center">
        <figure className="h-24 w-24 mx-auto mb-4">
          <img src="edificio_final.jpg" alt="Logo" className="w-full h-full rounded-full shadow-lg" />
        </figure>
        <h2 className="text-3xl font-bold text-white">Gestor de Incidencias</h2>
        <p className="text-sm text-gray-200 mt-2">¿No tienes una cuenta? 
          <Link to='/dashboard/new' className="font-medium text-yellow-400 hover:text-yellow-300 transition-all">Registrarme Ahora</Link>
        </p>
      </div>
      <form onSubmit={handleLog} className="mt-6 space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">Correo electrónico</label>
          <div className="mt-1">
            <input id="email" name="email" type="text" autoComplete="email" required 
              className="block w-full rounded-lg border border-transparent bg-white/20 px-4 py-3 text-white placeholder-gray-300 shadow-lg outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all" 
              placeholder="Ingresa tu correo"/>
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white">Contraseña</label>
          <div className="mt-1">
            <input id="password" name="password" type="password" autoComplete="current-password" required 
              className="block w-full rounded-lg border border-transparent bg-white/20 px-4 py-3 text-white placeholder-gray-300 shadow-lg outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all" 
              placeholder="Ingresa tu contraseña"/>
          </div>
        </div>
        <div>
          <button type="submit" 
            className="w-full rounded-lg bg-yellow-400 px-4 py-3 text-lg font-medium text-gray-900 shadow-lg hover:bg-yellow-300 transition-all">Iniciar sesión</button>
        </div>
      </form>
    </div>
  </div>
  
  );
};
