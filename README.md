# 📅 Calendar App

This is a **React** and **Vite** project, with state management handled by **Redux Toolkit**. It's a calendar application that allows users to create, edit, delete, and track events, featuring a user authentication system for registration and login.

## 🚀 Features

1. **Authentication**: User registration and login functionality.
2. **Calendar**: A full CRUD system to manage events with date, time, and user activity tracking.

### 🛠️ Technologies

- ![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
- ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
- ![Redux](https://img.shields.io/badge/-Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
- ![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
- ![LocalStorage](https://img.shields.io/badge/-LocalStorage-FF6F00?style=for-the-badge&logo=localstorage&logoColor=white)

## 🔧 Installation and Setup

1. Clone the repository:
   \`\`\`
   git clone https://github.com/usuario/repo.git
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Rename the **.env.template** file to **.env** and add the API URL. The file should look like this:
   \`\`\`
   VITE_API_URL=<YOUR_API_URL>
   \`\`\`

4. Run the development server:
   \`\`\`
   npm run dev
   \`\`\`

## 📁 Services

In the \`src/services\` directory, there are two key files:
- \`_authService.ts\`: Handles authentication-related requests (disabled by default).
- \`_calendarService.ts\`: Manages calendar events (disabled by default).

If you want to enable API usage instead of local storage, disable \`authService.ts\` and \`calendarService.ts\`, and enable the ones prefixed with \`_\` by renaming them.

## 🌐 API Reference

If you decide to implement your own backend, these are the expected routes and methods:

### Authentication

- **POST** \`/auth\`: Receives \`{email, password}\`, returns \`{name, uid, email, token}\`.
- **POST** \`/auth/new\`: Receives \`{name, email, password}\`, returns \`{name, uid, email, token}\`.
- **GET** \`/auth/renew\`: Renews the JWT token in the header \`x-token\`.

### Events

- **POST** \`/events\`: Receives an event object like this:

\`\`\`json
{
  "title": "Event Title",
  "start": "2024-01-01T10:00:00Z",
  "end": "2024-01-01T12:00:00Z",
  "resource": {
    "id": "event-id",
    "user": {
      "__id": "user-id",
      "name": "User Name"
    },
    "notes": "Notes for the event"
  }
}
\`\`\`

- **PUT** \`/events/:id\`: Updates an existing event.
- **DELETE** \`/events/:id\`: Deletes an event.
- **GET** \`/events\`: Retrieves all events.

> **Note**: The structure of the event object is the same for **POST**, **PUT**, and **GET** requests.

> **Important**: All requests must include the JWT token in the \`x-token\` header.

## 👨‍💻 Authors

- [@DarwinRuiz](https://github.com/DarwinRuiz)

---

# 📅 Aplicación de Calendario

Este es un proyecto desarrollado con **React** y **Vite**, gestionando el estado con **Redux Toolkit**. Es una aplicación de calendario que permite a los usuarios crear, editar, eliminar y seguir eventos, con un sistema de autenticación para registro e inicio de sesión.

## 🚀 Funcionalidades

1. **Autenticación**: Funcionalidad de registro e inicio de sesión.
2. **Calendario**: Un sistema CRUD completo para gestionar eventos con fecha, hora y seguimiento de actividades de usuarios.

### 🛠️ Tecnologías

- ![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
- ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
- ![Redux](https://img.shields.io/badge/-Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
- ![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
- ![LocalStorage](https://img.shields.io/badge/-LocalStorage-FF6F00?style=for-the-badge&logo=localstorage&logoColor=white)

## 🔧 Instalación y Configuración

1. Clonar el repositorio:
   \`\`\`
   git clone https://github.com/usuario/repo.git
   \`\`\`

2. Instalar dependencias:
   \`\`\`
   npm install
   \`\`\`

3. Renombrar el archivo **.env.template** a **.env** y agregar la URL de la API. El archivo debe verse así:
   \`\`\`
   VITE_API_URL=<URL_DE_TU_API>
   \`\`\`

4. Ejecutar el servidor de desarrollo:
   \`\`\`
   npm run dev
   \`\`\`

## 📁 Servicios

En el directorio \`src/services\` hay dos archivos clave:
- \`_authService.ts\`: Servicios relacionados con la autenticación (deshabilitado por defecto).
- \`_calendarService.ts\`: Gestión de eventos del calendario (deshabilitado por defecto).

Si deseas habilitar el uso de la API en lugar del almacenamiento local, deshabilita \`authService.ts\` y \`calendarService.ts\`, y habilita los que tienen el prefijo \`_\`.

## 🌐 Referencia de la API

Si decides implementar tu propio backend, estas son las rutas y métodos esperados:

### Autenticación

- **POST** \`/auth\`: Recibe \`{email, password}\`, devuelve \`{name, uid, email, token}\`.
- **POST** \`/auth/new\`: Recibe \`{name, email, password}\`, devuelve \`{name, uid, email, token}\`.
- **GET** \`/auth/renew\`: Renueva el token JWT en el header \`x-token\`.

### Eventos

- **POST** \`/events\`: Recibe un objeto de evento como este:

\`\`\`json
{
  "title": "Título del Evento",
  "start": "2024-01-01T10:00:00Z",
  "end": "2024-01-01T12:00:00Z",
  "resource": {
    "id": "id-evento",
    "user": {
      "__id": "id-del-usuario",
      "name": "Nombre del Usuario"
    },
    "notes": "Notas para el evento"
  }
}
\`\`\`

- **PUT** \`/events/:id\`: Actualiza un evento existente.
- **DELETE** \`/events/:id\`: Elimina un evento.
- **GET** \`/events\`: Recupera todos los eventos.

> **Nota**: La estructura del objeto de evento es la misma para las peticiones **POST**, **PUT**, y **GET**.

> **Importante**: Todas las peticiones deben incluir el token JWT en el header \`x-token\`.

## 👨‍💻 Autores

- [@DarwinRuiz](https://github.com/DarwinRuiz)