// src/utils/axiosConfig.js

import axios from 'axios'

// Crear una instancia de axios con configuración personalizada
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Reemplaza con la URL base de tu API
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptores de solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    // Puedes agregar lógica aquí antes de enviar cada solicitud, como agregar tokens de autenticación
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptores de respuesta
axiosInstance.interceptors.response.use(
  (response) => {
    // Puedes agregar lógica aquí para manejar respuestas exitosas
    return response
  },
  (error) => {
    // Puedes manejar errores globales aquí, como mostrar notificaciones de error
    return Promise.reject(error)
  }
)

export default axiosInstance
